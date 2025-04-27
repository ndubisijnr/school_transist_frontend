import {Image, TouchableOpacity, View, Alert} from "react-native";
import {DefaultHeader} from "@/component/container/header/DefaultHeader";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import ProfileIcon from "@/assets/icon/profile-circle.svg"
import SettingIcon from "@/assets/icon/setting-2.svg"
import OrderIcon from "@/assets/icon/box-order.svg"
import HeartIcon from "@/assets/icon/heart-icon.svg"
import WalletMoneyIcon from "@/assets/icon/empty-walletMoney.svg"
import MessageQuestionIcon from "@/assets/icon/message-question.svg"
import ProfileDeleteIcon from "@/assets/icon/profile-delete.svg"
import {RouterUtil} from "@/utility/RouterUtil";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {RootState} from "@/store";
import {useSelector, useDispatch, useStore} from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore } from 'redux-persist';
import auth from "@/store/modules/auth";
import useLocation from "@/utility/hook/useLocation"; // Make sure this path points to your auth slice file

export const IndexProfileContainer = () => {
    const authState = useSelector((state: RootState) => state.auth);
    const user = authState?.userDetails;
    const store = useStore();
    const dispatch = useDispatch();
    const persistor = persistStore(store);
    const {retryGetLocation} = useLocation()

    const handleLogout = async () => {
        try {
            // Show confirmation dialog
            Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "Logout",
                        onPress: async () => {
                            // 1. Dispatch logout action
                            dispatch(auth.mutation.logout());

                            // 2. Purge the persistor to clear persisted Redux state
                            await persistor.purge();

                            // 3. Clear any auth-related items from AsyncStorage
                            await AsyncStorage.multiRemove(['authToken', 'userId', 'userCredentials']);
                            retryGetLocation()
                            // 4. Navigate user back to login screen
                            RouterUtil.navigate('dashboard.homeDashboard'); // Adjust to your actual login route name
                        }
                    }
                ]
            );
        } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
        }
    };

    const items = [
        {
            title: "My Profile",
            icon: ProfileIcon,
            action: () => {
                RouterUtil.navigate("dashboard.profileScreen")
            }
        },
        {
            title: "Settings",
            icon: SettingIcon,
            action: () => {}
        },
        {
            title: "Wallet",
            icon: WalletMoneyIcon,
            action: () => {}
        },
        {
            title: "Wishlist",
            icon: HeartIcon,
            action: () => {}
        },
        {
            title: "Orders",
            icon: OrderIcon,
            action: () => {}
        },
        {
            title: "Help and Support",
            icon: MessageQuestionIcon,
            action: () => {}
        },
    ]

    return (
        <View className={"flex-1 pl-3"}>
            <DefaultHeader />
            <View className={"flex-row items-center border-b border-b-[#E3E3E3] gap-4 mt-5 pb-4 mx-5"}>
                <Ionicons name="person-circle" size={60} color="#999" />
                <View className={"gap-2"}>
                    <DefaultTypography className={"text-[19px] font-sora_semi_bold"}>{user?.userFirstName} {user?.userLastName}</DefaultTypography>
                    <DefaultTypography className={"text-[14px] font-sora_regular text-gray-600"}>{user?.userEmail}</DefaultTypography>
                </View>
            </View>

            <View className={"flex-1 pt-10 gap-2"}>
                {
                    items.map((it, id) => {
                        return (
                            <TouchableOpacity onPress={() => it.action()} className={"flex-row items-center gap-4 px-5 py-4"} key={id}>
                                <it.icon width={30} height={30}></it.icon>
                                <DefaultTypography className={"font-sora_regular text-[16px]"}>{it.title}</DefaultTypography>
                            </TouchableOpacity>
                        )
                    })
                }
                <TouchableOpacity className={"flex-row items-center gap-4 px-5 py-4 mt-4"} onPress={handleLogout}>
                    <ProfileDeleteIcon width={30} height={30}></ProfileDeleteIcon>
                    <DefaultTypography className={"font-sora_regular text-[16px]"}>Logout</DefaultTypography>
                </TouchableOpacity>
            </View>
        </View>
    )
}