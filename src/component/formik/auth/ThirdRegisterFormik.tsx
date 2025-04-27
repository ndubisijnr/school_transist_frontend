import {Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import {useState} from "react";
import {DefaultOtpTextInput} from "@/component/textInput/DefaultOtpTextInput";
import {CompleteEnrollmentRequest, CompleteEnrollmentRequestInit} from "@/model/request/auth/CompleteEnrollmentRequest";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {BaseResponse} from "@/model/response/BaseResponse";
import {PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "@/store";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {useCountdown} from "@/libs/useCountDown";
import {InitiateEnrollmentRequest, InitiateEnrollmentRequestInit} from "@/model/request/auth/InitiateEnrollmentRequest";

export const ThirdRegisterFormik = ()=> {
    const [otp, setOtp] = useState<string>("")
    const [isOtpError, setIsOtpError] = useState<boolean | undefined>(undefined)
    const authState = useAppSelector((state => state.auth))
    const dispatch = useDispatch<any>()

    function navigateBack(){
        RouterUtil.goBack()
    }

    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    function handleSubmit (values: CompleteEnrollmentRequest){
        values.customerEmail = authState.initiateEnrollment.customerEmail ?? ""
        if (values.otp.length !== 4){
            ResponseUtil.toast("Please enter a valid OTP", "Complete Enrollment", "error")
            return
        }

        dispatch(auth.action.completeEnrollment(values)).then((response: PayloadAction<BaseResponse>) => {
            if (response.payload.responseCode == "00"){
                dispatch(auth.mutation.setEnrollmentStep(0))
                dispatch(auth.mutation.setEnrollment(InitiateEnrollmentRequestInit))
                ResponseUtil.toast(response.payload.responseMessage, "Complete Enrollment", "success")
                RouterUtil.navigate("auth.login")
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Complete Enrollment", "error")
            }
        })
    }

    const formik = useFormik({
        initialValues: CompleteEnrollmentRequestInit,
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
                Enter your OTP which has been sent to {'\n'} {authState?.payload?.customerEmail ?? authState?.initiateEnrollment?.customerEmail} to complete verification
            </DefaultTypography>

            <KeyboardAvoidingViewWrapper>
                <View className={"mt-16 mb-4"}>
                    <DefaultOtpTextInput isError={isOtpError} length={4} value={otp} onChange={handleOnChangeText} />
                </View>

                <DefaultTypography className={"text-gray-400 text-center mt-3 font-sora_medium text-[14px]"}>
                        A code has been sent to your email
                    </DefaultTypography>

                {
                    !isComplete ?
                    <DefaultTypography  className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Resend in {formattedTime.formatted}</DefaultTypography>
                        :
                        <DefaultTypography onPress={handleResend} className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Resend</DefaultTypography>
                }

                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Finish"} />
                <DefaultTypography onPress={navigateBack} className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Back</DefaultTypography>
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-auto font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}