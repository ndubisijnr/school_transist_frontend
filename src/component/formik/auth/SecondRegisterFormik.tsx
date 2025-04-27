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

export const SecondRegisterFormik = ()=> {
    const authState = useAppSelector((state)=>state.auth )
    const dispatch = useDispatch<any>()

    function navigateBack(){
        dispatch(auth.mutation.setEnrollmentStep(0))
    }

    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    function handleSubmit (values: InitiateEnrollmentRequest){
        const request: InitiateEnrollmentRequest = {
            ...authState.initiateEnrollment,
            customerFirstName: values.customerFirstName,
            customerLastName: values.customerLastName,
            customerPhoneNumber: values.customerPhoneNumber,
            customerRoleId: 101,
            customerState: "Lagos",
            customerTitle: "MR",
            customerStatus: "ACTIVE",
        }

        dispatch(auth.action.initiateEnrollment(request)).then((response: PayloadAction<BaseResponse>) => {
            if (response.payload.responseCode == "00"){
                dispatch(auth.mutation.setEnrollmentStep(2))
                ResponseUtil.toast(response.payload.responseMessage, "Enrollment", "success")
            }else {
                ResponseUtil.toast(response.payload.responseMessage, "Enrollment", "error")
            }
        })
    }

    const formik = useFormik({
        initialValues: {...InitiateEnrollmentRequestInit, ...authState.initiateEnrollment},
        onSubmit: handleSubmit,
        validationSchema: SecondEnrollmentValidation
    })

    return (
        <View className={"flex-1 w-full "}>
            <DefaultTypography onPress={navigateBack} className={"text-gray-700 text-center mt-3 font-sora_semi_bold text-[18px]"}>Personal Details</DefaultTypography>
            <KeyboardAvoidingViewWrapper>
                <DefaultTextInput formik={formik} name={"customerFirstName"} containerClassname={"!mt-5"} placeholder={"Enter your first name"} label={"First Name"} />
                <DefaultTextInput formik={formik} name={"customerLastName"} containerClassname={"!mt-5"} placeholder={"Enter your last name"} label={"Last Name"} />
                <DefaultTextInput formik={formik} name={"customerPhoneNumber"} containerClassname={"!mt-5"}  placeholder={"Enter your phone number"} label={"Phone Number"} />
                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Next"} />
                <DefaultTypography onPress={navigateBack} className={"text-gray-700 text-center mt-7 font-sora_semi_bold text-[16px]"}>Back</DefaultTypography>
                <DefaultTypography onPress={navigateToSignUp} className={"text-gray-700 text-center mt-auto font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}