import React from 'react';
import {Switch} from 'react-native';
import {useTheme} from "@/libs/useTheme";


export interface CustomSwitchProps {
    isEnabled?: boolean,
    setIsEnabled?: (value: boolean) => void,
}

export const CustomSwitch = ({
                                 isEnabled = false,
                                 setIsEnabled = () => {
                                 }
                             }: CustomSwitchProps) => {

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    };

    const theme = useTheme()
    return (
        <>
            <Switch
                trackColor={{
                    false: "rgba(218, 218, 218, 0.8)",
                    true: theme.primary
                }}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </>
    )
}