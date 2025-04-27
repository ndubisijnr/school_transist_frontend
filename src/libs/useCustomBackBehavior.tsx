import {useIsFocused, useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import {BackHandler, Platform, Alert} from "react-native";

export const useCustomBackBehavior = (blockBack: boolean = false, shouldConfirmExit: boolean = false) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const handleBackButton = () => {
        if (blockBack) {
            return true; // Prevent default back behavior
        } else if (shouldConfirmExit) {
            Alert.alert(
                "Exit App",
                "Are you sure you want to exit the app?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Yes",
                        onPress: () => BackHandler.exitApp()
                    }
                ],
                { cancelable: true }
            );
            return true; // Prevent default back behavior until user confirms
        }

        // Default behavior (let the system handle the back action)
        return false;
    };

    useEffect(() => {
        if (isFocused) {
            // For iOS gesture handling
            if (Platform.OS === "ios") {
                try {
                    // Check if navigation has setOptions method (it's a screen)
                    if (navigation && navigation.setOptions) {
                        navigation.setOptions({
                            gestureEnabled: !blockBack,
                        });
                    }
                } catch (error) {
                    console.log('Navigation context not available, skipping setOptions', error);
                }
            }

            // For Android back button
            if (Platform.OS === "android") {
                let backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
                return () => backHandler.remove();
            }
        }

        // Cleanup function for non-Android platforms
        return () => {};
    }, [isFocused, blockBack, shouldConfirmExit]);
};