import { useCallback, useState, useEffect } from "react";
import { Platform } from 'react-native';
import * as Application from "expo-application";
import { v4 as uuidv4 } from "uuid";

const useDeviceId = () => {
    const [deviceId, setDeviceId] = useState<any>()
    // Get device ID
    const getDeviceId = useCallback(async () => {
        try {
            return (Platform.OS === "ios" ?
                await Application.getIosIdForVendorAsync() :
                Application.getAndroidId()) ??
                uuidv4();
        } catch (error) {
            console.error('Error getting device ID:', error);
            return uuidv4(); // Fallback
        }
    }, []);

    useEffect(() => {
        const getId = async () => {await getDeviceId()}
        setDeviceId(getId)

    }, [])

    return {deviceId}

}


export default useDeviceId