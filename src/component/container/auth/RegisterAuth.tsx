import {ProgressIndicatorUtil, ProgressIndicatorUtilItemType} from "@/component/util/ProgressIndicatorUtil";
import {View} from "react-native";
import {FirstRegisterFormik} from "@/component/formik/auth/FirstRegisterFormik";
import {SecondRegisterFormik} from "@/component/formik/auth/SecondRegisterFormik";
import {ThirdRegisterFormik} from "@/component/formik/auth/ThirdRegisterFormik";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import auth from "@/store/modules/auth";
import {useAppSelector} from "@/store";
import {InitiateEnrollmentRequestInit} from "@/model/request/auth/InitiateEnrollmentRequest";

export const RegisterAuth = ()=> {
    const authState = useAppSelector((state => state.auth))
    const dispatch = useDispatch<any>()
    const items: ProgressIndicatorUtilItemType[] =[
        {title: "First", component: <FirstRegisterFormik />},
        {title: "Second", component: <SecondRegisterFormik />},
        {title: "Third", component: <ThirdRegisterFormik />},
    ]


    useEffect(() => {
        dispatch(auth.mutation.setEnrollmentStep(0))
        dispatch(auth.mutation.setEnrollment(InitiateEnrollmentRequestInit))
    }, []);

    return (
        <View className={"flex-1 w-full "}>
            <ProgressIndicatorUtil items={items} currentItemIndex={authState?.enrollmentStep ?? 0}  />
        </View>
    )
}