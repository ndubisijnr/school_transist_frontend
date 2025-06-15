// services/WebSocketService.ts
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CreateRequestDto {
    title: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
        address: string;
    };
    category: string;
    priority: 'low' | 'medium' | 'high';
    scheduledFor?: Date;
}

export interface RequestData extends CreateRequestDto {
    id: string;
    userId: string;
    status: 'pending' | 'accepted' | 'cancelled' | 'completed';
    createdAt: Date;
    providerId?: string;
    acceptedAt?: Date;
    cancelledAt?: Date;
}

export type SocketEventHandlers = {
    onRequestBroadcast: (request: RequestData) => void;
    onRequestRemoved: (requestId: string) => void;
    onRequestAccepted: (data: { id: string; acceptedBy?: string; timestamp?: Date }) => void;
    onRequestCreated: (data: { success: boolean; data: RequestData }) => void;
    onRequestCancelled: (data: { success: boolean; id: string }) => void;
    onRequestAcceptConfirmed: (data: { success: boolean; id: string }) => void;
    onRequestError: (error: { message: string; error: string }) => void;
    onCancelError: (error: { message: string; error: string; id: string }) => void;
    onAcceptError: (error: { message: string; error: string; id: string }) => void;
    onConnectionError: (error: Error) => void;
    onDisconnect: (reason: string) => void;
    onReconnect: () => void;
};

class WebSocketService {
    private socket: Socket | null = null;
    private isConnected = false;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private baseUrl: string;
    private eventHandlers: Partial<SocketEventHandlers> = {};

    constructor(baseUrl: string = 'http://localhost:3000') {
        this.baseUrl = baseUrl;
    }

    async connect(): Promise<void> {
        try {
            // Get auth token from AsyncStorage
            const token = await AsyncStorage.getItem('auth_token');

            if (!token) {
                throw new Error('No authentication token found');
            }

            // Initialize socket connection
            this.socket = io(`${this.baseUrl}/requests`, {
                transports: ['websocket', 'polling'],
                auth: {
                    token: token,
                },
                query: {
                    token: token, // Fallback for WsAuthGuard
                },
                reconnection: true,
                reconnectionAttempts: this.maxReconnectAttempts,
                reconnectionDelay: 1000,
                timeout: 10000,
            });

            this.setupEventListeners();

            return new Promise((resolve, reject) => {
                this.socket!.on('connect', () => {
                    console.log('✅ Connected to WebSocket server');
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    resolve();
                });

                this.socket!.on('connect_error', (error) => {
                    console.log('❌ Connection error:', error.message);
                    this.isConnected = false;
                    this.eventHandlers.onConnectionError?.(error);
                    reject(error);
                });
            });
        } catch (error) {
            console.log('❌ Failed to connect:', error);
            throw error;
        }
    }

    private setupEventListeners(): void {
        if (!this.socket) return;

        // Connection events
        this.socket.on('disconnect', (reason) => {
            console.log('🔌 Disconnected:', reason);
            this.isConnected = false;
            this.eventHandlers.onDisconnect?.(reason);
        });

        this.socket.on('reconnect', () => {
            console.log('🔄 Reconnected to server');
            this.isConnected = true;
            this.eventHandlers.onReconnect?.();
        });

        // Request events from server
        this.socket.on('requestBroadcast', (data: RequestData) => {
            console.log('📢 New request broadcast:', data);
            this.eventHandlers.onRequestBroadcast?.(data);
        });

        this.socket.on('requestRemoved', (requestId: string) => {
            console.log('🗑️ Request removed:', requestId);
            this.eventHandlers.onRequestRemoved?.(requestId);
        });

        this.socket.on('requestAccepted', (data) => {
            console.log('✅ Request accepted:', data);
            this.eventHandlers.onRequestAccepted?.(data);
        });

        // Response events for user actions
        this.socket.on('requestCreated', (data) => {
            console.log('✅ Request created:', data);
            this.eventHandlers.onRequestCreated?.(data);
        });

        this.socket.on('requestCancelled', (data) => {
            console.log('❌ Request cancelled:', data);
            this.eventHandlers.onRequestCancelled?.(data);
        });

        this.socket.on('requestAcceptConfirmed', (data) => {
            console.log('✅ Request accept confirmed:', data);
            this.eventHandlers.onRequestAcceptConfirmed?.(data);
        });

        // Error events
        this.socket.on('requestError', (error) => {
            console.log('❌ Request error:', error);
            this.eventHandlers.onRequestError?.(error);
        });

        this.socket.on('cancelError', (error) => {
            console.log('❌ Cancel error:', error);
            this.eventHandlers.onCancelError?.(error);
        });

        this.socket.on('acceptError', (error) => {
            console.log('❌ Accept error:', error);
            this.eventHandlers.onAcceptError?.(error);
        });
    }

    // Public methods for sending events
    createRequest(requestData: CreateRequestDto): void {
        if (!this.isConnected || !this.socket) {
            throw new Error('WebSocket not connected');
        }

        console.log('📤 Sending new request:', requestData);
        this.socket.emit('newRequest', requestData);
    }

    cancelRequest(requestId: string): void {
        if (!this.isConnected || !this.socket) {
            throw new Error('WebSocket not connected');
        }

        console.log('📤 Cancelling request:', requestId);
        this.socket.emit('cancelRequest', { id: requestId });
    }

    acceptRequest(requestId: string): void {
        if (!this.isConnected || !this.socket) {
            throw new Error('WebSocket not connected');
        }

        console.log('📤 Accepting request:', requestId);
        this.socket.emit('acceptRequest', { id: requestId });
    }

    // Event handler management
    setEventHandlers(handlers: Partial<SocketEventHandlers>): void {
        this.eventHandlers = { ...this.eventHandlers, ...handlers };
    }

    removeEventHandlers(): void {
        this.eventHandlers = {};
    }

    // Connection management
    disconnect(): void {
        if (this.socket) {
            console.log('🔌 Manually disconnecting...');
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    getConnectionStatus(): boolean {
        return this.isConnected;
    }

    // Utility method to check if we can perform actions
    isReady(): boolean {
        return this.isConnected && this.socket !== null;
    }
}

// Export singleton instance
export const webSocketService = new WebSocketService();
export default WebSocketService;