import {ContainerScrollViewLayout} from "@/view/layout/ContainerScrollViewLayout";
import {View, Text} from "react-native";
import { Audio } from 'expo-av';
import {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons"


const RideSearch = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

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

    useEffect(() => {
        setTimeout(() => {
            playSound().then();
        }, 500)
    }, []);

    return (

        <ContainerScrollViewLayout>
            <View className="flex-1 justify-center items-center">
                <View className="animate-spin w-[24px] h-[24px] items-center justify-center">
                    <Ionicons name="compass" size={24} />
                </View>
                <Text>Searching Available Rides....</Text>
            </View>
        </ContainerScrollViewLayout>
    )
}

export default RideSearch;