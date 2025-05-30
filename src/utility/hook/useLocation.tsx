// import { useState, useEffect } from "react"
// import * as Location from 'expo-location';
// import {useDispatch} from "react-redux";
// import auth from "@/store/modules/auth";
// const useLocation = () => {
//
//     const [location, setLocation] = useState<Location.LocationObject | null>(null);
//     const [errorMsg, setErrorMsg] = useState<string | null>(null);
//     const [currentAddress, setCurrentAddress] = useState("")
//     const dispatch = useDispatch();
//
//     const GOOGLE_PLACES_API_KEY = 'AIzaSyA0G3e9Zwswp9Lr1jzA_VA8xJU10iiAIZs';
//
//     async function getCurrentLocation() {
//
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             setErrorMsg('Permission to access location was denied');
//             return;
//         }
//
//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//         try {
//             if(location){
//
//               // Reverse geocode to get address information
//               const response = await fetch(
//                 `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_PLACES_API_KEY}`
//               );
//               const result = await response.json();
//               console.log(result.results[0].formatted_address);
//
//               if (result.results && result.results.length > 0) {
//                 const address = {
//                   id: 'current',
//                   name: 'Current Location',
//                   address: result.results[0].formatted_address,
//                   latitude: location.coords.latitude,
//                   longitude: location.coords.longitude,
//                 };
//                 dispatch(auth.mutation.setUserLocation(address.address));
//                 setCurrentAddress(address.address);
//               }
//             }
//
//           } catch (error) {
//             console.error('Error getting current location:', error);
//             alert('Could not get your current location');
//           } finally {
//
//           }
//     }
//
//     let text = 'Waiting...';
//     if (errorMsg) {
//         text = errorMsg;
//     } else if (location) {
//         text = JSON.stringify(location);
//     }
//
//     useEffect(() => {
//         getCurrentLocation()
//     }, [])
//
//
//     return {currentAddress, setCurrentAddress, location, errorMsg }
// }
//
//
// export default useLocation

import { useState, useEffect } from "react"
import * as Location from 'expo-location';
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {ToastAndroid} from "react-native";
import {showMessage} from "@/utility/hook/useToast";
const useLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [currentAddress, setCurrentAddress] = useState("");
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const dispatch = useDispatch();

    const GOOGLE_PLACES_API_KEY = '**********';
    const MAX_RETRIES = 1;
    const RETRY_DELAY = 200; // 2 seconds

    async function getCurrentLocation() {
        setIsLoadingLocation(true);

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            if(location) {
                // Reverse geocode to get address information
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_PLACES_API_KEY}`
                );
                const result = await response.json();

                if (result.results && result.results.length > 0) {
                    const address:any = {
                        id: 'current',
                        name: 'Current Location',
                        address: result.results[0].formatted_address,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    dispatch(auth.mutation.setUserLocation(address));
                    setCurrentAddress(address.address);
                    // Reset retry count on success
                    // setRetryCount(0);
                } else {
                    showMessage('No address found')
                }
            } else {
                showMessage('Location not available')

            }
        } catch (error) {
            showMessage(`Error getting current location:', ${error}`)
        } finally {
            setIsLoadingLocation(false);
        }
    }

    // Function to manually retry getting location
    const retryGetLocation = () => {
        setRetryCount(0);
        setErrorMsg(null);
        getCurrentLocation().finally(() => setIsLoadingLocation(false));
    };

    useEffect(() => {
        getCurrentLocation().finally(() => setIsLoadingLocation(false));
    }, []);

    return {
        currentAddress,
        setCurrentAddress,
        location,
        errorMsg,
        isLoadingLocation,
        retryGetLocation // Expose function to manually retry
    };
};

export default useLocation;