import {Image, Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import {useAppSelector} from "@/store";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {ResponseUtil} from "@/utility/ResponseUtil";
import {PayloadAction} from "@reduxjs/toolkit";
import {BaseResponse} from "@/model/response/BaseResponse";
import {CompleteForgotPasswordValidation} from "@/model/validate/auth/CompleteForgotPasswordValidation";
import {
    CompletePasswordResetRequest,
    CompletePasswordResetRequestInit
} from "@/model/request/auth/CompletePasswordResetRequest";

export const CompleteForgotPasswordFormik = ()=> {
    const authState = useAppSelector((state)=>state.auth )
    const dispatch = useDispatch<any>()

    function navigateBack(){
        dispatch(auth.mutation.setEnrollmentStep(0))
    }

    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    function handleSubmit (values: CompletePasswordResetRequest){
        const request: CompletePasswordResetRequest = {
            ...values,
            customerEmail: authState.payload?.customerEmail,
            otp: authState.payload?.otp,
        }
        dispatch(auth.action.completePasswordReset(request)).then((response: PayloadAction<BaseResponse>) => {
            console.log(response.payload)
            if (response.payload.responseCode == "00"){
                ResponseUtil.toast(response.payload.responseMessage, "Complete Enrollment", "success")
                RouterUtil.navigate("auth.login")
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Complete Enrollment", "error")
            }
        })
    }

    const formik = useFormik({
        initialValues: CompletePasswordResetRequestInit,
        onSubmit: handleSubmit,
        validationSchema: CompleteForgotPasswordValidation
    })
    return (
        <View className={"flex-1 w-full "}>
            {/*<DefaultTypography onPress={navigateBack} className={"text-gray-700 text-center mt-3 font-sora_semi_bold text-[18px]"}>Personal Details</DefaultTypography>*/}
            <KeyboardAvoidingViewWrapper>
                <DefaultTextInput secureTextEntry formik={formik} name={"customerPassword"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Password"} />
                <DefaultTextInput secureTextEntry formik={formik} name={"customerConfirmationPassword"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Confirm Password"} />
                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Proceed"} />
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-auto font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}