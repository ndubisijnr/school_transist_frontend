import {Image, Platform, Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import auth from "@/store/modules/auth";
import {LoginRequest, LoginRequestInit} from "@/model/request/auth/LoginRequest";
import {LoginValidation} from "@/model/validate/auth/LoginValidation";
import {PayloadAction} from "@reduxjs/toolkit";
import {LoginResponse} from "@/model/response/auth/LoginResponse";
import {useDispatch} from "react-redux";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {useAppSelector} from "@/store";
import * as Application from "expo-application";
import {v4 as uuidv4} from "uuid";
import { RedirectFromType } from "@/utility/type/ParamsType";
import { useRoute } from '@react-navigation/native';
import { useRef } from "react";
import useLocation from "@/utility/hook/useLocation";

export const LoginFormik = ()=> {
    const GoogleIcon = require("@/assets/image/google-icon.png")
    const dispatch = useDispatch<any>()
    const authState = useAppSelector((state)=>state.auth )
    const {params} = useRoute<RedirectFromType>()
    const redirectFromTypeRef = useRef(params?.route);
    const {location} = useLocation()

    function handleGoogleSignIn(){}

    function navigateToSignUp(){
        RouterUtil.navigate("auth.register")
    }

    function navigateToForgotPassword(){
        RouterUtil.navigate("auth.initiatePasswordReset")
    }

    async function handleSubmit (values: LoginRequest){
        const deviceId = authState.deviceId ?? (Platform.OS == "ios" ? await Application.getIosIdForVendorAsync() : Application.getAndroidId()) ?? uuidv4()

        console.log("Device ID: ", deviceId)
        values.deviceId = deviceId
        if(location){
            values.latitude = location?.coords?.latitude
            values.longitude = location?.coords?.longitude
        }
     

        console.log("response==========", values)

        dispatch(auth.action.login(values)).then((response: PayloadAction<LoginResponse>)=> {
            console.log(response.payload)
            if (response.payload.responseCode === "00"){
                ResponseUtil.toast(response.payload.responseMessage, "Login", "success")
                if(redirectFromTypeRef.current){
                    RouterUtil.navigate(redirectFromTypeRef.current)
                }else{
                    RouterUtil.navigate("dashboard.homeDashboard")

                }
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Login", "error")
            }
        })
    }

    const formik = useFormik({
        initialValues: LoginRequestInit,
        onSubmit: handleSubmit,
        validationSchema: LoginValidation

    })

    return (<View className={"flex-1 w-full "}>
            <DefaultButton onPress={handleGoogleSignIn} className={'!bg-white  border border-gray-300'} >
                <View className={"w-full flex-row items-center justify-center gap-2"}>
                    <Image width={28} height={28} style={{width: 28, height: 28}} source={GoogleIcon}  />
                    <DefaultTypography className={"text-gray-700 font-sora_semi_bold text-[16px]"}>Sign in with Google</DefaultTypography>
                </View>
            </DefaultButton>

            <KeyboardAvoidingViewWrapper>
                <DefaultTextInput formik={formik} name={"customerEmail"} containerClassname={"!mt-8"} placeholder={"Enter your email"} label={"Email"} />
                <DefaultTextInput secureTextEntry formik={formik} name={"customerPassword"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Password"} />
                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 30}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Login"} />
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-10 font-sora_regular text-[15px]"}>Don’t have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Sign Up</Text></DefaultTypography>
                <DefaultTypography onPress={navigateToForgotPassword} className={"text-secondary text-center mt-10 font-sora_semi_bold text-[15px]"}>Forgot Password? </DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>)
}