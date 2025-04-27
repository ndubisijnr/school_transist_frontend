import {Image, Platform, Text, View} from "react-native";
import {DefaultButton} from "@/component/button/DefaultButton";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {useFormik} from "formik";
import {RouterUtil} from "@/utility/RouterUtil";
import {useAppSelector} from "@/store";
import {InitiateEnrollmentRequest, InitiateEnrollmentRequestInit} from "@/model/request/auth/InitiateEnrollmentRequest";
import auth from "@/store/modules/auth";
import {useDispatch} from "react-redux";
import {FirstEnrollmentValidation} from "@/model/validate/auth/FirstEnrollmentValidation";

export const FirstRegisterFormik = ()=> {
    const GoogleIcon = require("@/assets/image/google-icon.png")
    const authState = useAppSelector((state)=>state.auth )
    const dispatch = useDispatch<any>()

    function handleGoogleSignIn(){}

    function navigateToSignUp(){
        RouterUtil.navigate("auth.login")
    }

    async function handleSubmit (values: InitiateEnrollmentRequest){
        dispatch(auth.mutation.setEnrollment(values))
        dispatch(auth.mutation.setEnrollmentStep(1))
    }

    const formik = useFormik({
        initialValues: {...InitiateEnrollmentRequestInit, ...authState.initiateEnrollment},
        onSubmit: handleSubmit,
        validationSchema: FirstEnrollmentValidation
    })

    return (
        <View className={"flex-1 w-full "}>
            <DefaultButton onPress={handleGoogleSignIn} className={'!bg-white  border border-gray-300'} >
                <View className={"w-full flex-row items-center justify-center gap-2"}>
                    <Image width={28} height={28} style={{width: 28, height: 28}} source={GoogleIcon}  />
                    <DefaultTypography className={"text-gray-700 font-sora_semi_bold text-[16px]"}>Sign up with Google</DefaultTypography>
                </View>
            </DefaultButton>

            <KeyboardAvoidingViewWrapper>
                <DefaultTextInput formik={formik} name={"customerEmail"} containerClassname={"!mt-8"} placeholder={"Enter your email"} label={"Email"} />
                <DefaultTextInput secureTextEntry formik={formik} name={"customerPassword"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Password"} />
                <DefaultTextInput secureTextEntry formik={formik} name={"customerConfirmationPassword"} containerClassname={"!mt-5"} placeholder={"••••••••"} label={"Confirm Password"} />
                <DefaultButton loading={authState.loading} style={{height: 50, marginTop: 20}} onPress={()=> formik.handleSubmit()} defaultTypography={{className:"text-white text-[15px] font-sora_semi_bold"}} title={"Sign up"} />
                <DefaultTypography  onPress={navigateToSignUp} className={"text-gray-700 text-center mt-10 font-sora_regular text-[15px]"}>Already have an account? <Text className={"text-primary-base font-sora_semi_bold"}>Login</Text></DefaultTypography>
            </KeyboardAvoidingViewWrapper>
        </View>
    )
}