import {TouchableOpacity, View} from "react-native";
import ArrowLeft from "@/assets/icon/arrow-Left.svg";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import MenuIcon from "@/assets/icon/menu-01.svg";


export interface AuthHeaderProps{
    title?: string,
    goBack?: () => void,
}
export const AuthHeader = ({goBack,...props}: AuthHeaderProps)=> {

    return (
        <View className={"bg-primary  px-4 pb-5 justify-end  w-full h-[120px]"}>
            <View className={" flex-row justify-between items-center"}>

                <View className={"w-[32px] h-[32px]"}>
                    {
                        goBack &&
                        <TouchableOpacity onPress={goBack}>
                            <ArrowLeft width={32} color={"white"} height={32} />
                        </TouchableOpacity>
                    }
                </View>
                <DefaultTypography className={"text-white font-medium  !text-[18px]"}>{props?.title}</DefaultTypography>
                <MenuIcon width={32} color={"white"} height={32} />
            </View>
        </View>
    )
}