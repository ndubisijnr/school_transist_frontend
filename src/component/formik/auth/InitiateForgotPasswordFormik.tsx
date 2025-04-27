import {Image, Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import {SecondEnrollmentValidation} from "@/model/validate/auth/SecondEnrollmentValidation";
import {InitiateEnrollmentRequest, InitiateEnrollmentRequestInit} from "@/model/request/auth/InitiateEnrollmentRequest";
import {useAppSelector} from "@/store";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse";
import {
    InitiatePasswordResetRequest,
    InitiatePasswordResetRequestInit
} from "@/model/request/auth/InitiatePasswordResetRequest";
import {InitiateForgotPasswordValidation} from "@/model/validate/auth/InitiateForgotPasswordValidation";
import {OtpVerificationType} from "@/utility/type/ParamsType";

export const InitiateForgotPasswordFormik = ()=> {
    const authState = useAppSelector((state)=>state.auth )
    const dispatch = useDispatch<any>()


    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    function handleSubmit (values: InitiatePasswordResetRequest){
        dispatch(auth.action.initiatePasswordReset(values)).then((response: PayloadAction<BaseResponse>) => {
            if (response.payload.responseCode == "00"){
                dispatch(auth.mutation.setPayload({
                    ...authState.payload,
                    customerEmail: values.customerEmail
                }))
                RouterUtil.navigate<OtpVerificationType>("auth.otpVerification", {type: "forgot-password"})
                ResponseUtil.toast(response.payload.responseMessage, "Forgot Password", "success")
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Forgot Password", "error")
            }
        })
    }

    const formik = useFormik({
        initialValues: InitiatePasswordResetRequestInit,
        onSubmit: handleSubmit,
        validationSchema: InitiateForgotPasswordValidation
    })

    return (
        <View className={"flex-1 w-full "}>
            {/*<DefaultTypography className={"text-gray-700 text-center mt-3 font-sora_semi_bold text-[18px]"}>Forgot Password</DefaultTypography>*/}
            <DefaultTypography className={"text-gray-400 text-center mt-3 font-sora_medium text-[14px]"}>
                Enter your email address to receive an OTP for password reset verification
            </DefaultTypography>
            <KeyboardAvoidingViewWrapper>
                <DefaultTextInput formik={formik} name={"customerEmail"} containerClassname={"!mt-5"} placeholder={"Enter your Email"} label={"Email Address"} />
                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Send Otp"} />
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-auto font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}