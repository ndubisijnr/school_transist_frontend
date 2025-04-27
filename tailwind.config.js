/** @type {import('tailwindcss').Config} */
import {platformSelect} from "nativewind/theme";

export const content = [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
];
export const presets = [require("nativewind/preset")];
export const theme = {
    extend: {
        fontFamily: {
            'body': platformSelect({
                android: ['sora_regular', 'sans-serif'],
                ios: ['sora_regular', 'sans-serif']
            }),
            'sora_regular': 'sora_regular',
            'sora_medium': 'sora_medium',
            'sora_variable': 'sora_variable',
            'sora_bold': 'sora_bold',
            'sora_semi_bold': 'sora_semi_bold',
        },
        colors:{
            'primary': platformSelect({
                android: 'rgba(0, 0, 102, 1)',
                ios: 'rgba(0, 0, 102, 1)'
            }),
            'primary-base': platformSelect({
                android: 'rgba(53, 63, 181, 1)',
                ios: 'rgba(53, 63, 181, 1)'
            }),
            'secondary': platformSelect({
                android: 'rgba(229, 49, 14, 1)',
                ios: 'rgba(229, 49, 14, 1)'
            }),
            'tertiary': platformSelect({
                android: 'rgba(28, 19, 16, 1)',
                ios: 'rgba(28, 19, 16, 1)'
            }),
        }
    },
};
export const plugins = [];

