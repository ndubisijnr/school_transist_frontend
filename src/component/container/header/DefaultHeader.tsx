import {TouchableOpacity, View} from "react-native";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import ChevronRightIcon from "@/assets/icon/chevron-right-icon.svg"
import {RouterUtil} from "@/utility/RouterUtil";


export const DefaultHeader = ()=> {

    function handleBack(){
        RouterUtil.goBack()
    }
    return (
        <View className={"w-full"}>
            <View className={"flex-row items-center gap-2 py-3"}>
                <TouchableOpacity onPress={handleBack}>
                    <ChevronRightIcon width={24} height={24}  />
                </TouchableOpacity>
                <DefaultTypography className={"text-[20px]"}>Profile</DefaultTypography>
            </View>
        </View>
    )
}