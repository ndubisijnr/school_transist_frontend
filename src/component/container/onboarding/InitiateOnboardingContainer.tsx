import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import type {SharedValue} from "react-native-reanimated/src/commonTypes";
import {Dimensions, View, StyleSheet} from "react-native";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {RouterUtil} from "@/utility/RouterUtil";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InitiateOnboardingContainerProps {
    item: any,
    index: number,
    scrollX: SharedValue<number>,
}

export interface Slide {
    id: number;
    title: string;
    description: string;
    image: any; // Using 'any' for image require
}

export const InitiateOnboardingContainer = ({index, item, scrollX}: InitiateOnboardingContainerProps)=>{

    const inputRange = [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
    ];

    const imageAnimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.85, 1, 0.85],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    const textAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            scrollX.value,
            inputRange,
            [20, 0, 20],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    function handleSkip(){
        RouterUtil.navigate("onboarding.completeOnboarding")
    }

    return (
        <View style={styles.slide}>
            <View className={"absolute right-10 top-20 z-50"}>
                <DefaultTypography onPress={handleSkip} className={"text-secondary font-sora_semi_bold text-[16px]"}>SKIP</DefaultTypography>
            </View>
            <Animated.Image
                width={SCREEN_WIDTH}
                source={item.image}
                style={[styles.slideImage, imageAnimatedStyle]}
                resizeMode="cover"
            />
            <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
                <DefaultTypography className={"text-black text-[22px] leading-[30px] font-sora_bold"}>{item.title}</DefaultTypography>
                <DefaultTypography className={"text-[#666D80] mt-2 text-[17px] font-sora_medium leading-[24px]"}>{item.description}</DefaultTypography>
            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    slide: {
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    slideImage: {
        width: "100%",
        flex: .8,
        marginBottom: 40,
    },
    textContainer: {
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        flex: .2,
        width: SCREEN_WIDTH
    },
})