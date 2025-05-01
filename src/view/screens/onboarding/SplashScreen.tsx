import useLocation from "@/utility/hook/useLocation"
import { RootState } from "@/store"
import { useEffect, useState } from "react"
import auth from "@/store/modules/auth"
import {RouterUtil} from "@/utility/RouterUtil";
import {useSelector} from "react-redux";
import {PixelRatio} from "react-native";

export const SplashScreen = () => {
    const {token} = useSelector((state: RootState) => state.auth)
    const [isInitialized, setIsInitialized] = useState(false)
    const {location} = useLocation()

    const [textScaleFactor, setTextScaleFactor] = useState(1);

    useEffect(() => {
        // Get the text scale factor from PixelRatio
        const scale = PixelRatio.getFontScale();
        setTextScaleFactor(scale);

        // You can consider anything above 1 as "zoomed in"
        const isZoomedIn = scale > 1;

        console.log(`Text scale factor: ${scale}`);
        console.log(`Is text zoomed in: ${isZoomedIn}`);

        // Handle zoom detection
        if (isZoomedIn) {
            // Do something if user has larger text enabled
        }
    }, []);

    useEffect(() => {


    }, [location])

    useEffect(() => {
        // This will run on component mount and when token changes
        if (!isInitialized || token !== undefined) {
            if (!token) {
                RouterUtil.replace('auth.login')
            } else {
                RouterUtil.replace('dashboard.homeScreen', {screen:"Home Screen"})
            }
            setIsInitialized(true)
        }
    }, [token, isInitialized]);

    return (
        <></>
    )
}