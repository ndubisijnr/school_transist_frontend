// import {Image, KeyboardAvoidingView, View} from "react-native";
// import {DefaultHeader} from "@/component/container/header/DefaultHeader";
// import {DefaultTypography} from "@/component/text/DefaultTypography";
// import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
// import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
// import {DefaultButton} from "@/component/button/DefaultButton";
// import {Ionicons} from "@expo/vector-icons";
// import React from "react";
// import {useSelector} from "react-redux";
// import {RootState} from "@/store";
//
// export const MyProfileContainer = ()=> {
//     const pf = require("@/assets/image/profile-image.png")
//     const authState = useSelector((state:RootState) => state.auth);
//     const user = authState?.userDetails
//
//
//     return (
//         <View className={"flex-1 px-4 pb-10"}>
//             <DefaultHeader  />
//
//             <View className={"flex-row justify-center items-center gap-4 mt-5 pb-4 mx-5"}>
//                 <View>
//                     <Ionicons name="person-circle" size={50} color="#999" />
//
//                     {/*<Image width={124} height={124} className={"rounded-full w-[124px] h-[124px]"} source={pf} />*/}
//                 </View>
//             </View>
//             <KeyboardAvoidingViewWrapper>
//                 <DefaultTypography className={"font-sora_medium text-[16px] my-5"}>Basic Detail</DefaultTypography>
//
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Full Name"}  value={"John Mbadiwe"} />
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Date of Birth"}  value={"8th June 1990"} />
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Gender"}  value={"Male"} />
//
//                 <DefaultTypography className={"font-sora_medium text-[16px] my-5"}>Basic Detail</DefaultTypography>
//
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Full Name"}  value={"John Mbadiwe"} />
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Date of Birth"}  value={"8th June 1990"} />
//                 <DefaultTextInput containerClassname={"mt-5"} label={"Gender"}  value={"Male"} />
//             </KeyboardAvoidingViewWrapper>
//             <DefaultButton title={"Save"} />
//         </View>
//     )
// }


import {Image, View} from "react-native";
import {DefaultHeader} from "@/component/container/header/DefaultHeader";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {DefaultTextInput} from "@/component/textInput/DefaultTextInput";
import {KeyboardAvoidingViewWrapper} from "@/component/wrapper/KeyboardAvoidingViewWrapper";
import {DefaultButton} from "@/component/button/DefaultButton";
import {Ionicons} from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "@/store";

export const MyProfileContainer = () => {
    const pf = require("@/assets/image/profile-image.png");
    const authState = useSelector((state: RootState) => state.auth);
    const user = authState?.userDetails;
    const dispatch = useDispatch();

    // State for editable fields
    const [formData, setFormData] = useState({
        userFirstName: "",
        userEmail: "",
        userLastName: "",
    });

    // State to track if editing is enabled
    const [isEditing, setIsEditing] = useState(false);

    // Load user data when component mounts or when user data changes
    useEffect(() => {
        if (user) {
            setFormData({
                userFirstName: user.userFirstName || "",
                userLastName: user.userLastName || "",
                userEmail: user.userEmail || "",
            });
        }
    }, [user]);

    // Handle input changes
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Save changes
    const handleSave = () => {
        // Dispatch action to update user details in Redux store
        // This is where you would implement the action to update user details
        // Example: dispatch(updateUserDetails(formData));

        console.log("Saving user data:", formData);
        setIsEditing(false);
    };

    return (
        <View className={"flex-1 px-4 pb-10"}>
            <DefaultHeader />

            <View className={"flex-row justify-between items-center mt-5 pb-4 mx-5"}>
                <View className={"flex-1"}></View>
                <View className={"flex-1 items-center"}>
                    <Ionicons name="person-circle" size={70} color="#999" />
                    {/* <Image width={124} height={124} className={"rounded-full w-[124px] h-[124px]"} source={pf} /> */}
                </View>
                <View className={"flex-1 items-end"}>
                    <Ionicons
                        name={isEditing ? "close-outline" : "create-outline"}
                        size={28}
                        color="#333"
                        onPress={toggleEdit}
                    />
                </View>
            </View>

            <KeyboardAvoidingViewWrapper>
                <DefaultTypography className={"font-sora_medium text-[16px] my-5"}>Personal Information</DefaultTypography>

                <DefaultTextInput
                    containerClassname={"mt-5"}
                    label={"First Name"}
                    value={formData.userFirstName}
                    onChangeText={(text) => handleChange("userFirstName", text)}
                    editable={isEditing}
                />
                <DefaultTextInput
                    containerClassname={"mt-5"}
                    label={"Last Name"}
                    value={formData.userLastName}
                    onChangeText={(text) => handleChange("userLastName", text)}
                    editable={isEditing}
                />
                <DefaultTypography className={"font-sora_medium text-[16px] my-5"}>Contact Information</DefaultTypography>

                <DefaultTextInput
                    containerClassname={"mt-5"}
                    label={"Email"}
                    value={formData.userEmail}
                    onChangeText={(text) => handleChange("userEmail", text)}
                    editable={isEditing}
                />


                {/*<DefaultTextInput*/}
                {/*    containerClassname={"mt-5"}*/}
                {/*    label={"Email"}*/}
                {/*    value={formData.email}*/}
                {/*    onChangeText={(text) => handleChange("email", text)}*/}
                {/*    editable={isEditing}*/}
                {/*    keyboardType="email-address"*/}
                {/*/>*/}
                {/*<DefaultTextInput*/}
                {/*    containerClassname={"mt-5"}*/}
                {/*    label={"Phone Number"}*/}
                {/*    value={formData.phone}*/}
                {/*    onChangeText={(text) => handleChange("phone", text)}*/}
                {/*    editable={isEditing}*/}
                {/*    keyboardType="phone-pad"*/}
                {/*/>*/}
                {/*<DefaultTextInput*/}
                {/*    containerClassname={"mt-5"}*/}
                {/*    label={"Address"}*/}
                {/*    value={formData.address}*/}
                {/*    onChangeText={(text) => handleChange("address", text)}*/}
                {/*    editable={isEditing}*/}
                {/*    multiline={true}*/}
                {/*    numberOfLines={3}*/}
                {/*/>*/}
            </KeyboardAvoidingViewWrapper>

            {isEditing && (
                <DefaultButton title={"Save Changes"} onPress={handleSave} />
            )}
        </View>
    );
};