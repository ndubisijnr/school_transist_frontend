import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import {useCallback, useEffect, useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons"
import {RouterUtil} from "@/utility/RouterUtil";
import {RootState, useAppDispatch, useAppSelector} from "@/store";
import app from "@/store/modules/app";
import {ResponseUtil} from "@/utility/ResponseUtil";

const RideSearch = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [showRiders, setShowRiders] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {currentRide} = useAppSelector((state: RootState) => state.app);

    // Simplified polling state
    const [isPolling, setIsPolling] = useState(false);
    const intervalRef = useRef<any>();
    const timeoutRef = useRef<any>();
    const isMountedRef = useRef(true);

    const dispatch = useAppDispatch();

    // Determine if we should be polling based on ride status
    const shouldPoll = currentRide?.transit_status === 'requested' || currentRide?.transit_status === 'accepted';

    const playSound = async () => {
        try {
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
                require('@/assets/notification-9-158194.mp3')
            );
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const stopSound = async () => {
        if (sound) {
            console.log("Stopping Sound");
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }
    };

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    // Audio cleanup effect
    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    // Component mount/unmount tracking
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Mock driver data
    const driverData = {
        name: "SchoolTransit TestDriver",
        rating: 4.8,
        totalRides: 1247,
        phone: "+2349049929256",
        vehicleModel: "Toyota Camry",
        vehicleColor: "Silver",
        licensePlate: "ABC 123",
        estimatedArrival: "3 mins",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    };

    const rideData = {
        pickup: "Faculty of law",
        destination: "Faculty of Science",
        fareEstimate: "₦350.00",
        distance: "1.3 miles",
        duration: "3 mins"
    };

    // Stable poll function with useCallback
    const poll = useCallback(async () => {
        if (!isMountedRef.current || !currentRide?.id) return;

        console.log("📡 Polling for ride status...");
        try {
            await dispatch(app.action.readRideById(currentRide.id)).unwrap();
            console.log("✅ Polling successful");
        } catch (err) {
            console.log("❌ Polling error:", err);
        }
    }, [dispatch, currentRide?.id]);

    // Main polling effect - simplified to avoid infinite loops
    useEffect(() => {
        // Only poll if status is 'requested'
        if (!shouldPoll) {
            // Clean up if we shouldn't be polling
            if (intervalRef.current) {
                console.log("🛑 Stopping polling - status changed");
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setIsPolling(false);
            return;
        }

        // Don't start polling if already polling
        if (isPolling || intervalRef.current) {
            return;
        }

        console.log("✅ Starting polling...");
        setIsPolling(true);

        // Start interval polling
        intervalRef.current = setInterval(() => {
            if (isMountedRef.current) {
                poll();
            }
        }, 5000);

        // Set timeout to stop polling after 2 minutes
        timeoutRef.current = setTimeout(() => {
            console.log("⏱️ Polling timeout reached");
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            if (isMountedRef.current) {
                setIsPolling(false);
            }
        }, 30000); // 2 minutes

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setIsPolling(false);
        };
    }, [shouldPoll, poll]); // Only depend on shouldPoll and poll

    const cancelRide = async () => {
        const payload = {
            id: currentRide.id,
            payload: {
                hub: null,
                transit_status: 'cancelled'
            }
        };

        try {
            setIsLoading(true);
            await dispatch(app.action.updateRide(payload)).unwrap();
            console.log("✅ Ride cancelled successfully");
            RouterUtil.goBack();
        } catch (err) {
            console.log("❌ Cancel ride error:", err);
            ResponseUtil.toast(err, '', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const endRide = async () => {
        const payload = {
            id: currentRide.id,
            payload: {
                hub: null,
                transit_status: 'completed'
            }
        };

        try {
            setIsLoading(true);
            await dispatch(app.action.updateRide(payload)).unwrap();
            RouterUtil.goBack();
        } catch (err) {
            console.log("❌ Cancel ride error:", err);
            ResponseUtil.toast(err, '', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    const handleCancelRide = () => {
        Alert.alert(
            "Cancel Ride",
            "Are you sure you want to cancel this ride? You may be charged a cancellation fee.",
            [
                {
                    text: "Keep Ride",
                    style: "cancel"
                },
                {
                    text: "Cancel Ride",
                    style: "destructive",
                    onPress: cancelRide
                }
            ]
        );
    };

    const handleCallDriver = () => {
        Alert.alert("Calling Driver", `Calling ${currentRide?.hub?.name || driverData.name}...`);
    };

    const handleMessageDriver = () => {
        Alert.alert("Message Driver", "Opening chat with driver...");
    };

    const handleSearchAgain = () => {
        // Manually trigger polling restart
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsPolling(false);

        // Trigger re-poll by toggling state
        setTimeout(() => {
            if (isMountedRef.current && shouldPoll) {
                setIsPolling(true);
            }
        }, 100);
    };

    // Render different states based on ride status
    const renderRideStatus = () => {
        const status = currentRide?.transit_status;

        if (status === 'requested' && isPolling) {
            return (
                <View className="flex-1 justify-center items-center py-20">
                    <View className="animate-spin w-[40px] h-[40px] items-center justify-center mb-4">
                        <Ionicons name="compass" size={40} color="#3B82F6" />
                    </View>
                    <Text className="text-lg font-semibold text-gray-800 mb-2">
                        Searching for Available Drivers
                    </Text>
                    <Text className="text-sm text-gray-600 text-center px-8">
                        We're matching you with the best driver nearby
                    </Text>
                </View>
            );
        }

        if (status === 'requested' && !isPolling) {
            return (
                <View className="flex-1 justify-center items-center py-20">
                    <View className="w-[40px] h-[40px] items-center justify-center mb-4">
                        <Ionicons name="car" size={40} color="#6B7280" />
                    </View>
                    <Text className="text-lg font-semibold text-gray-800 mb-2">
                        No Drivers Available
                    </Text>
                    <Text className="text-sm text-gray-600 text-center px-8 mb-6">
                        All drivers are currently busy. Try searching again.
                    </Text>
                    {/*<TouchableOpacity*/}
                    {/*    className="px-8 py-3 bg-blue-600 rounded-full"*/}
                    {/*    onPress={handleSearchAgain}*/}
                    {/*>*/}
                    {/*    <Text className="text-white font-semibold">Search Again</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            );
        }

        if (status === 'accepted' || status === 'arrived' || status === 'in_progress') {
            return (
                <ScrollView className="flex-1 bg-gray-50">
                    <View className="px-5 pt-6 pb-6">
                        {/* Header */}
                        <View className="items-center mb-8">
                            <Text className="text-2xl font-bold text-gray-900 mb-1">
                                {status === 'accepted' && 'Driver Assigned'}
                                {status === 'arrived' && 'Driver Has Arrived'}
                                {status === 'in_progress' && 'Trip in Progress'}
                            </Text>
                            <Text className="text-base text-gray-600">
                                {status === 'accepted' && 'Your driver is on the way'}
                                {status === 'arrived' && 'Your driver is waiting for you'}
                                {status === 'in_progress' && 'Enjoy your ride'}
                            </Text>
                        </View>

                        {/* Status Card */}
                        <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
                            <View className="flex-row items-center justify-center">
                                <Ionicons name="timer" size={20} color="#3B82F6" />
                                <Text className="text-lg font-semibold text-blue-800 ml-2">
                                    {status === 'accepted' && `Arriving in ${driverData.estimatedArrival}`}
                                    {status === 'arrived' && 'Driver is here!'}
                                    {status === 'in_progress' && 'Trip in progress'}
                                </Text>
                            </View>
                        </View>

                        {/* Driver Card */}
                        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <Image
                                        source={{ uri: driverData.profileImage }}
                                        className="w-16 h-16 rounded-full mr-4"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-xl font-bold text-gray-900 mb-1">
                                            {currentRide?.hub?.name || "Driver"}
                                        </Text>
                                        <View className="flex-row items-center mb-2">
                                            <Ionicons name="star" size={16} color="#FFD700" />
                                            <Text className="text-sm text-gray-600 ml-1">
                                                {driverData.rating} ({driverData.totalRides} rides)
                                            </Text>
                                        </View>
                                        <Text className="text-sm text-gray-600">
                                            {currentRide?.hub?.vehicle_name} {currentRide?.hub?.vehicle_type}
                                        </Text>
                                        <Text className="text-sm font-medium text-gray-800">
                                            {currentRide?.hub?.vehicle_color}
                                        </Text>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View className="flex-row space-x-3">
                                    <TouchableOpacity
                                        className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"
                                        onPress={handleCallDriver}
                                    >
                                        <Ionicons name="call" size={20} color="#3B82F6" />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"
                                        onPress={handleMessageDriver}
                                    >
                                        <Ionicons name="chatbox" size={20} color="#3B82F6" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Trip Details Card */}
                        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
                            <Text className="text-lg font-bold text-gray-900 mb-4">
                                Trip Details
                            </Text>

                            {/* Pickup Location */}
                            <View className="flex-row items-start mb-3">
                                <View className="w-5 items-center mr-3 mt-1">
                                    <View className="w-3 h-3 bg-green-500 rounded-full" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-500 mb-1">Pickup</Text>
                                    <Text className="text-base text-gray-900">
                                        {currentRide?.where_from}
                                    </Text>
                                </View>
                            </View>

                            {/* Connector Line */}
                            <View className="flex-row mb-3">
                                <View className="w-5 items-center mr-3">
                                    <View className="w-0.5 h-6 bg-gray-300" />
                                </View>
                            </View>

                            {/* Destination */}
                            <View className="flex-row items-start mb-4">
                                <View className="w-5 items-center mr-3 mt-1">
                                    <Ionicons name="location" size={12} color="#EF4444" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-gray-500 mb-1">Destination</Text>
                                    <Text className="text-base text-gray-900">
                                        {currentRide?.where_to}
                                    </Text>
                                </View>
                            </View>

                            {/* Trip Info */}
                            <View className="border-t border-gray-200 pt-4">
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-sm text-gray-600">Distance</Text>
                                    <Text className="text-sm font-medium text-gray-900">
                                        {rideData.distance}
                                    </Text>
                                </View>
                                <View className="flex-row justify-between items-center mb-2">
                                    <Text className="text-sm text-gray-600">Duration</Text>
                                    <Text className="text-sm font-medium text-gray-900">
                                        {rideData.duration}
                                    </Text>
                                </View>
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-base text-gray-900">Estimated Fare</Text>
                                    <Text className="text-lg font-bold text-gray-900">
                                        {rideData.fareEstimate}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Cancel Button - only show if ride can still be cancelled */}
                        {status === 'accepted' && (
                            <>
                                <TouchableOpacity
                                    className={`bg-black rounded-2xl p-4 flex-row items-center justify-center mb-6 ${
                                        isLoading ? 'opacity-60' : ''
                                    }`}
                                    onPress={() => endRide()}
                                    disabled={isLoading}
                                >
                                    <Text className="text-white font-semibold text-base ml-2">
                                        {isLoading ? "Completing..." : "End Ride"}
                                    </Text>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    className={`bg-white border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center mb-6 ${
                                        isLoading ? 'opacity-60' : ''
                                    }`}
                                    onPress={() => handleCancelRide()}
                                    disabled={isLoading}
                                >
                                    <Ionicons name="close" size={20} color="#EF4444" />
                                    <Text className="text-red-500 font-semibold text-base ml-2">
                                        {isLoading ? "Cancelling..." : "Cancel Ride"}
                                    </Text>
                                </TouchableOpacity>

                            </>

                        )}

                        {/* Footer */}
                        <Text className="text-center text-sm text-gray-500">
                            Need help? Contact support at any time.
                        </Text>
                    </View>
                </ScrollView>
            );
        }

        // Default state for completed/cancelled rides
        return (
            <View className="flex-1 justify-center items-center py-20">
                <Ionicons name="checkmark-circle" size={60} color="#10B981" />
                <Text className="text-xl font-bold text-gray-900 mt-4">
                    Ride {status === 'completed' ? 'Completed' : 'Cancelled'}
                </Text>
            </View>
        );
    };

    return (
        <ContainerScrollViewLayout>
            {/* Debug info - remove in production */}
            {/*{__DEV__ && (*/}
            {/*    <View className="bg-yellow-100 p-2 m-2 rounded">*/}
            {/*        <Text className="text-xs">Status: {currentRide?.transit_status}</Text>*/}
            {/*        <Text className="text-xs">Polling: {isPolling ? 'Active' : 'Inactive'}</Text>*/}
            {/*        <Text className="text-xs">Should Poll: {shouldPoll ? 'Yes' : 'No'}</Text>*/}
            {/*    </View>*/}
            {/*)}*/}

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-2">
                <TouchableOpacity
                    onPress={() => {
                        cancelRide(),
                        RouterUtil.goBack()
                    }}
                    className="p-2"
                >
                    <Ionicons name="chevron-back" size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-lg font-semibold text-gray-900">
                    Your Ride
                </Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Main Content */}
            {renderRideStatus()}
        </ContainerScrollViewLayout>
    );
};

export default RideSearch;