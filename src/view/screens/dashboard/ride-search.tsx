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
        playSound().then();
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

    useEffect(() => {
        activatePolling()
    }, []);


    const handleMessageDriver = () => {
        Alert.alert("Message Driver", "Opening chat with driver...");
    };


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



        </ContainerScrollViewLayout>
    )
}

export default RideSearch;
