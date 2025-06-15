// hooks/useWebSocket.ts
import { useEffect, useState, useCallback, useRef } from 'react';
import { webSocketService, RequestData, CreateRequestDto, SocketEventHandlers } from '@/view/ws/websk-service';
import { Alert } from 'react-native';

export interface WebSocketState {
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
    requests: RequestData[];
}

export const useWebSocket = () => {
    const [state, setState] = useState<WebSocketState>({
        isConnected: false,
        isConnecting: false,
        error: null,
        requests: [],
    });

    const handlersRef = useRef<Partial<SocketEventHandlers>>({});

    // Initialize WebSocket connection
    const connect = useCallback(async () => {
        setState(prev => ({ ...prev, isConnecting: true, error: null }));

        try {
            await webSocketService.connect();
            setState(prev => ({ ...prev, isConnected: true, isConnecting: false }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                isConnected: false,
                isConnecting: false,
                error: error instanceof Error ? error.message : 'Connection failed'
            }));
        }
    }, []);

    // Disconnect WebSocket
    const disconnect = useCallback(() => {
        webSocketService.disconnect();
        setState(prev => ({ ...prev, isConnected: false, isConnecting: false }));
    }, []);

    // Setup event handlers
    useEffect(() => {
        const handlers: Partial<SocketEventHandlers> = {
            onRequestBroadcast: (request: RequestData) => {
                setState(prev => ({
                    ...prev,
                    requests: [request, ...prev.requests.filter(r => r.id !== request.id)]
                }));
            },

            onRequestRemoved: (requestId: string) => {
                setState(prev => ({
                    ...prev,
                    requests: prev.requests.filter(r => r.id !== requestId)
                }));
            },

            onRequestAccepted: (data) => {
                setState(prev => ({
                    ...prev,
                    requests: prev.requests.map(r =>
                        r.id === data.id
                            ? { ...r, status: 'accepted' as const, acceptedAt: data.timestamp }
                            : r
                    )
                }));
            },

            onRequestCreated: (data) => {
                if (data.success) {
                    Alert.alert('Success', 'Your request has been created successfully!');
                }
            },

            onRequestCancelled: (data) => {
                if (data.success) {
                    Alert.alert('Success', 'Request cancelled successfully!');
                    setState(prev => ({
                        ...prev,
                        requests: prev.requests.filter(r => r.id !== data.id)
                    }));
                }
            },

            onRequestAcceptConfirmed: (data) => {
                if (data.success) {
                    Alert.alert('Success', 'Request accepted successfully!');
                }
            },

            onRequestError: (error) => {
                Alert.alert('Error', `Failed to create request: ${error.message}`);
            },

            onCancelError: (error) => {
                Alert.alert('Error', `Failed to cancel request: ${error.message}`);
            },

            onAcceptError: (error) => {
                Alert.alert('Error', `Failed to accept request: ${error.message}`);
            },

            onConnectionError: (error) => {
                setState(prev => ({
                    ...prev,
                    error: error.message,
                    isConnected: false,
                    isConnecting: false
                }));
            },

            onDisconnect: (reason) => {
                setState(prev => ({ ...prev, isConnected: false }));
                if (reason === 'io server disconnect') {
                    // Server disconnected us, show alert
                    Alert.alert('Connection Lost', 'You have been disconnected from the server.');
                }
            },

            onReconnect: () => {
                setState(prev => ({ ...prev, isConnected: true, error: null }));
                Alert.alert('Reconnected', 'Connection restored!');
            },
        };

        handlersRef.current = handlers;
        webSocketService.setEventHandlers(handlers);

        return () => {
            webSocketService.removeEventHandlers();
        };
    }, []);

    // Create request
    const createRequest = useCallback((requestData: CreateRequestDto) => {
        try {
            webSocketService.createRequest(requestData);
        } catch (error) {
            Alert.alert('Error', 'Failed to send request. Please check your connection.');
        }
    }, []);

    // Cancel request
    const cancelRequest = useCallback((requestId: string) => {
        try {
            webSocketService.cancelRequest(requestId);
        } catch (error) {
            Alert.alert('Error', 'Failed to cancel request. Please check your connection.');
        }
    }, []);

    // Accept request
    const acceptRequest = useCallback((requestId: string) => {
        try {
            webSocketService.acceptRequest(requestId);
        } catch (error) {
            Alert.alert('Error', 'Failed to accept request. Please check your connection.');
        }
    }, []);

    return {
        ...state,
        connect,
        disconnect,
        createRequest,
        cancelRequest,
        acceptRequest,
    };
};

// Hook for managing request lists with filtering
export const useRequests = () => {
    const { requests, ...webSocketState } = useWebSocket();
    const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'cancelled'>('all');

    const filteredRequests = requests.filter(request => {
        if (filter === 'all') return true;
        return request.status === filter;
    });

    const pendingRequests = requests.filter(r => r.status === 'pending');
    const acceptedRequests = requests.filter(r => r.status === 'accepted');
    const cancelledRequests = requests.filter(r => r.status === 'cancelled');

    return {
        ...webSocketState,
        requests: filteredRequests,
        allRequests: requests,
        pendingRequests,
        acceptedRequests,
        cancelledRequests,
        filter,
        setFilter,
        stats: {
            total: requests.length,
            pending: pendingRequests.length,
            accepted: acceptedRequests.length,
            cancelled: cancelledRequests.length,
        }
    };
};