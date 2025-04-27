import {Platform, ToastAndroid, Alert} from "react-native";

export const showMessage = (message:string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (Platform.OS === 'ios') {
        // Use Alert for iOS
        Alert.alert('Message', message);
    }
};