import {NavigationContainer} from "@react-navigation/native";
import * as Linking from 'expo-linking';
import * as SplashScreen from "expo-splash-screen";
import {navigationRef, RouterUtil} from "@/utility/RouterUtil";
import {NativeStack} from "@/libs/route/NativeStack";
import {useCallback} from "react";
import {Fonts} from "@/assets/fonts";
import {useFonts} from "expo-font";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {FallbackLoader} from "@/component/loader/FallbackLoader";
import Toast from "react-native-toast-message";
import {useInactivity} from "@/libs/useInactivity";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";

SplashScreen.preventAutoHideAsync().then();
export const Router = ()=>{
    const prefix = Linking.createURL('/stack/auth/login');
    const linking = { prefixes: [prefix] };
    const [fontsLoaded] = useFonts(Fonts);
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            setTimeout(() => {
                SplashScreen.hideAsync();
            }, 2000)
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    function handleSessionExpired() {
    }

    const {ViewComponent} = useInactivity({callbackFn: handleSessionExpired})

    const initR = RouteConstant.dashboard.splashScreen.path
    // const initR = NavigationTypeConstant.drawer

    return (
        <NavigationContainer onReady={onLayoutRootView} linking={linking}  ref={navigationRef}   fallback={<FallbackLoader />}>
            <ViewComponent >
                <NativeStack initialRouteName={initR} />
                <Toast />
            </ViewComponent>
        </NavigationContainer>
    )
}