import {Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import {useState} from "react";
import {DefaultOtpTextInput} from "@/component/textInput/DefaultOtpTextInput";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {BaseResponse} from "@/model/response/BaseResponse";
import {PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "@/store";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {useCountdown} from "@/libs/useCountDown";
import {useRoute} from "@react-navigation/native";
import { OtpVerificationTypeProps} from "@/utility/type/ParamsType";

export const OtpVerificationFormik = ()=> {
    const [otp, setOtp] = useState<string>("")
    const [isOtpError, setIsOtpError] = useState<boolean | undefined>(undefined)
    const authState = useAppSelector((state => state.auth))
    const dispatch = useDispatch<any>()

    const {params} = useRoute<OtpVerificationTypeProps>()


    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    function handleSubmit (values: {otp: string}){

        if (values.otp.length !== 4){
            ResponseUtil.toast("Please enter a valid OTP", "Complete Enrollment", "error")
            return
        }
        dispatch(auth.mutation.setPayload({
            ...authState.payload,
            otp: values.otp
        }))

        if (params.type == "forgot-password"){
            RouterUtil.navigate("auth.completePasswordReset")
        }else {
            ResponseUtil.toast("Not Routed", "Otp verification", "error")
        }
    }

    const formik = useFormik({
        initialValues: {otp: ""},
        onSubmit: handleSubmit
    })


    function handleOnChangeText(text: string){
        setOtp(text)
        if (text.length == 4){
            formik.setFieldValue("otp", text)
        }
    }


    const { isComplete, resetCountdown, formattedTime } = useCountdown(
        60,
        null,
        true
    );

    function handleResend(): void {
        dispatch(auth.action.resendOtp({customerEmail: authState.payload.customerEmail ?? authState.initiateEnrollment.customerEmail })).then((response: PayloadAction<BaseResponse>) => {
            console.log(response.payload)
            if (response.payload.responseCode == "00"){
                ResponseUtil.toast(response.payload.responseMessage, "Resend Otp", "success")
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Resend Otp", "error")
            }
        })
        resetCountdown();
    }

    return (
        <View className={"flex-1 w-full "}>
            <DefaultTypography className={"text-gray-400 text-center mt-3 font-sora_medium text-[14px]"}>
                Enter your OTP which has been sent to your {'\n'} phone number to complete verification
            </DefaultTypography>

            <KeyboardAvoidingViewWrapper>
                <View className={"mt-16 mb-4"}>
                    <DefaultOtpTextInput isError={isOtpError} length={4} value={otp} onChange={handleOnChangeText} />
                </View>

                <DefaultTypography className={"text-gray-400 text-center mt-3 font-sora_medium text-[14px]"}>
                        A code has been sent to your phone
                    </DefaultTypography>

                {
                    !isComplete ?
                    <DefaultTypography  className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Resend in {formattedTime.formatted}</DefaultTypography>
                        :
                        <DefaultTypography onPress={handleResend} className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Resend</DefaultTypography>
                }

                <DefaultButton disabled={isOtpError || otp.length !== 4 || authState.loading} loading={ authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Next"} />
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-auto font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}