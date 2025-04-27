import Animated, {Extrapolate, interpolate, useAnimatedStyle} from "react-native-reanimated";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import type {SharedValue} from "react-native-reanimated/src/commonTypes";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InitiateOnboardingDotContainerProps {
    index: number;
    currentIndex: number;
    scrollX: SharedValue<number>,
}

export const InitiateOnboardingDotContainer: React.FC<InitiateOnboardingDotContainerProps> = ({ index, scrollX, currentIndex }) => {
    const dotAnimatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
        ];

        const width = interpolate(
            scrollX.value,
            inputRange,
            [15, 30, 15],
            Extrapolate.CLAMP
        );

        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );

        const backgroundColor = currentIndex === index ? '#000080' : '#D3D3D3';

        return {
            width,
            opacity,
            backgroundColor,
        };
    });

    return <Animated.View style={[styles.dot, dotAnimatedStyle]} />;
};

const styles = StyleSheet.create({
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
})
