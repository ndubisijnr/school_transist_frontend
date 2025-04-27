import {ReactNode, useEffect} from "react";
import {ContainerLayout} from "@/view/layout/ContainerLayout";
import {TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
// import ArrowLeft from "@/assets/icon/arrowLeft.svg";
import ArrowLeft from "@/assets/icon/arrow-Left.svg";
import MenuIcon from "@/assets/icon/menu-01.svg";
import {useIsFocused} from "@react-navigation/native";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {AuthHeader} from "@/component/container/header/AuthHeader";

export interface AuthLayoutProps{
    children: ReactNode,
    clearToken?: boolean,
    title?: string,
    goBack?: () => void,
}
export const AuthLayout = ({children, clearToken=false, goBack, ...props}: AuthLayoutProps)=>{
    const dispatch = useDispatch<any>()
    const isFocus = useIsFocused()

    useEffect(() => {
        if (clearToken && isFocus){
            dispatch(auth.mutation.setToken(""))
        }
    }, [isFocus]);

    return (
        <ContainerLayout barStyle={"light"} fullscreenMode={true}>
            <View className={"flex-1 items-center"}>
                <AuthHeader />
                <View className={"flex-1 w-full px-5 pt-5"}>
                    {children}
                </View>
            </View>
        </ContainerLayout>
    )
}