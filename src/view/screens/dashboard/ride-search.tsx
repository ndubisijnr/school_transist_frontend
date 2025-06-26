import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import {useEffect, useRef, useState} from "react";
import {Ionicons} from "@expo/vector-icons"
import {RouterUtil} from "@/utility/RouterUtil";
import {RootState, useAppDispatch, useAppSelector} from "@/store";
import app from "@/store/modules/app";


const RideSearch = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [showRiders, setShowRiders] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {currentRide, } = useAppSelector((state:RootState) => state.app)
    const [isPolling, setIsPolling] = useState(false);
    const pollingTimeoutRef = useRef(null);
    const stopPollingTimeoutRef = useRef(null);
    const dispatch = useAppDispatch()

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

    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

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
                    onPress: () => {
                        setIsLoading(true);
                        // Simulate API call
                        setTimeout(() => {
                            setIsLoading(false);
                            Alert.alert("Ride Cancelled", "Your ride has been cancelled successfully.");
                            RouterUtil.goBack()
                        }, 1500);
                    }
                }
            ]
        );
    };

    const handleCallDriver = () => {
        Alert.alert("Calling Driver", `Calling ${driverData.name}...`);
    };

    const poll = () => {
        console.log('Polling...');
        // 👉 Add your polling logic here (e.g., fetch data)
        dispatch(app.action.readRideById(currentRide.id))

        // Schedule the next poll
        pollingTimeoutRef.current = setTimeout(() => {
            if (isPolling) poll();
        }, 5000);
    };

    const activatePolling = () => {
        setIsPolling(true);

        poll(); // Start polling

        // Automatically stop polling after 15 seconds
        stopPollingTimeoutRef.current = setTimeout(() => {
            setIsPolling(false);
        }, 15000);
    };

    useEffect(() => {
        // Cleanup when component unmounts or polling stops
        return () => {
            clearTimeout(pollingTimeoutRef?.current);
            clearTimeout(stopPollingTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (!isPolling) {
            // Stop any pending polls if polling is turned off
            clearTimeout(pollingTimeoutRef.current);
        }
    }, [isPolling]);


    const handleMessageDriver = () => {
        Alert.alert("Message Driver", "Opening chat with driver...");
    };

    useEffect(() => {
        setTimeout(() => {
            playSound().then();
        }, 500)
    }, []);

    useEffect(() => {

    }, []);

    return (

        <ContainerScrollViewLayout>
            <Text>{JSON.stringify(currentRide, null, 2)}</Text>
            {isPolling && (
                <View className="flex-1 justify-center items-center">
                    <View className="animate-spin w-[24px] h-[24px] items-center justify-center">
                        <Ionicons name="compass" size={24} />
                    </View>
                    <Text>Searching Available Rides....</Text>
            </View>)}


            {/*{showRiders && (*/}

            {/*        <ScrollView className="flex-1 bg-gray-50">*/}
            {/*            <View className="px-5 pt-12 pb-6">*/}
            {/*                /!* Header *!/*/}
            {/*                <View className="items-center mb-8">*/}
            {/*                    <Text className="text-2xl font-bold text-gray-900 mb-1">*/}
            {/*                        Driver Assigned*/}
            {/*                    </Text>*/}
            {/*                    <Text className="text-base text-gray-600">*/}
            {/*                        Your driver is on the way*/}
            {/*                    </Text>*/}
            {/*                </View>*/}

            {/*                /!* Status Card *!/*/}
            {/*                <View className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">*/}
            {/*                    <View className="flex-row items-center justify-center">*/}
            {/*                        <Ionicons name="timer" size={20} color="#3B82F6" />*/}
            {/*                        <Text className="text-lg font-semibold text-blue-800 ml-2">*/}
            {/*                            Arriving in {driverData.estimatedArrival}*/}
            {/*                        </Text>*/}
            {/*                    </View>*/}
            {/*                </View>*/}

            {/*                /!* Driver Card *!/*/}
            {/*                <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">*/}
            {/*                    <View className="flex-row items-center justify-between">*/}
            {/*                        <View className="flex-row items-center flex-1">*/}
            {/*                            <Image*/}
            {/*                                source={{ uri: driverData.profileImage }}*/}
            {/*                                className="w-16 h-16 rounded-full mr-4"*/}
            {/*                            />*/}
            {/*                            <View className="flex-1">*/}
            {/*                                <Text className="text-xl font-bold text-gray-900 mb-1">*/}
            {/*                                    {driverData.name}*/}
            {/*                                </Text>*/}
            {/*                                <View className="flex-row items-center mb-2">*/}
            {/*                                    <Ionicons name="star" size={16} color="#FFD700" fill="#FFD700" />*/}
            {/*                                    <Text className="text-sm text-gray-600 ml-1">*/}
            {/*                                        {driverData.rating} ({driverData.totalRides} rides)*/}
            {/*                                    </Text>*/}
            {/*                                </View>*/}
            {/*                                <Text className="text-sm text-gray-600">*/}
            {/*                                    {driverData.vehicleColor} {driverData.vehicleModel}*/}
            {/*                                </Text>*/}
            {/*                                <Text className="text-sm font-medium text-gray-800">*/}
            {/*                                    {driverData.licensePlate}*/}
            {/*                                </Text>*/}
            {/*                            </View>*/}
            {/*                        </View>*/}

            {/*                        /!* Action Buttons *!/*/}
            {/*                        <View className="flex-row space-x-3">*/}
            {/*                            <TouchableOpacity*/}
            {/*                                className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"*/}
            {/*                                onPress={handleCallDriver}*/}
            {/*                            >*/}
            {/*                                <Ionicons name="phone-portrait" size={20} color="#3B82F6" />*/}

            {/*                            </TouchableOpacity>*/}
            {/*                            <TouchableOpacity*/}
            {/*                                    className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center"*/}
            {/*                                    onPress={handleMessageDriver}*/}
            {/*                                >*/}
            {/*                                    <Ionicons name="chatbox" size={20} color="#3B82F6" />*/}
            {/*                            </TouchableOpacity>*/}
            {/*                        </View>*/}
            {/*                    </View>*/}
            {/*                </View>*/}

            {/*                /!* Trip Details Card *!/*/}
            {/*                <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">*/}
            {/*                    <Text className="text-lg font-bold text-gray-900 mb-4">*/}
            {/*                        Trip Details*/}
            {/*                    </Text>*/}

            {/*                    /!* Pickup Location *!/*/}
            {/*                    <View className="flex-row items-start mb-3">*/}
            {/*                        <View className="w-5 items-center mr-3 mt-1">*/}
            {/*                            <View className="w-3 h-3 bg-green-500 rounded-full" />*/}
            {/*                        </View>*/}
            {/*                        <View className="flex-1">*/}
            {/*                            <Text className="text-sm text-gray-500 mb-1">Pickup</Text>*/}
            {/*                            <Text className="text-base text-gray-900">*/}
            {/*                                {rideData.pickup}*/}
            {/*                            </Text>*/}
            {/*                        </View>*/}
            {/*                    </View>*/}

            {/*                    /!* Connector Line *!/*/}
            {/*                    <View className="flex-row mb-3">*/}
            {/*                        <View className="w-5 items-center mr-3">*/}
            {/*                            <View className="w-0.5 h-6 bg-gray-300" />*/}
            {/*                        </View>*/}
            {/*                    </View>*/}

            {/*                    /!* Destination *!/*/}
            {/*                    <View className="flex-row items-start mb-4">*/}
            {/*                        <View className="w-5 items-center mr-3 mt-1">*/}
            {/*                            <Ionicons name="map" size={12} color="#EF4444" fill="#EF4444" />*/}
            {/*                        </View>*/}
            {/*                        <View className="flex-1">*/}
            {/*                            <Text className="text-sm text-gray-500 mb-1">Destination</Text>*/}
            {/*                            <Text className="text-base text-gray-900">*/}
            {/*                                {rideData.destination}*/}
            {/*                            </Text>*/}
            {/*                        </View>*/}
            {/*                    </View>*/}

            {/*                    /!* Trip Info *!/*/}
            {/*                    <View className="border-t border-gray-200 pt-4">*/}
            {/*                        <View className="flex-row justify-between items-center mb-2">*/}
            {/*                            <Text className="text-sm text-gray-600">Distance</Text>*/}
            {/*                            <Text className="text-sm font-medium text-gray-900">*/}
            {/*                                {rideData.distance}*/}
            {/*                            </Text>*/}
            {/*                        </View>*/}
            {/*                        <View className="flex-row justify-between items-center mb-2">*/}
            {/*                            <Text className="text-sm text-gray-600">Duration</Text>*/}
            {/*                            <Text className="text-sm font-medium text-gray-900">*/}
            {/*                                {rideData.duration}*/}
            {/*                            </Text>*/}
            {/*                        </View>*/}
            {/*                        <View className="flex-row justify-between items-center">*/}
            {/*                            <Text className="text-base text-gray-900">Estimated Fare</Text>*/}
            {/*                            <Text className="text-lg font-bold text-gray-900">*/}
            {/*                                {rideData.fareEstimate}*/}
            {/*                            </Text>*/}
            {/*                        </View>*/}
            {/*                    </View>*/}
            {/*                </View>*/}

            {/*                /!* Cancel Button *!/*/}
            {/*                <TouchableOpacity*/}
            {/*                    className={`bg-white border-2 border-red-500 rounded-2xl p-4 flex-row items-center justify-center mb-6 ${*/}
            {/*                        isLoading ? 'opacity-60' : ''*/}
            {/*                    }`}*/}
            {/*                    onPress={handleCancelRide}*/}
            {/*                    disabled={isLoading}*/}
            {/*                >*/}
            {/*                    <Ionicons name="close" size={20} color="#EF4444" />*/}
            {/*                    <Text className="text-red-500 font-semibold text-base ml-2">*/}
            {/*                        {isLoading ? "Cancelling..." : "Cancel Ride"}*/}
            {/*                    </Text>*/}
            {/*                </TouchableOpacity>*/}

            {/*                /!* Footer *!/*/}
            {/*                <Text className="text-center text-sm text-gray-500">*/}
            {/*                    Need help? Contact support at any time.*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*        </ScrollView>*/}

            {/*)}*/}

        </ContainerScrollViewLayout>
    )
}

export default RideSearch;