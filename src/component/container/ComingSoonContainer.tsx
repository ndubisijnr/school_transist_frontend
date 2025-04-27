import {View} from "react-native";
import {DefaultTypography} from "@/component/text/DefaultTypography";
import ComingSoonIcon from "@/assets/icon/coming-soon.svg"
import {useTheme} from "@/libs/useTheme";

interface ComingSoonContainerProps {
    name: string
}
export const ComingSoonContainer = ({name}: ComingSoonContainerProps)=>{
    const theme = useTheme()

    return (
        <View className={"items-center grow gap-4 justify-center "}>
            <ComingSoonIcon color={theme.primary} />
            <DefaultTypography className={"text-center font-sora_semi_bold !text-[16px]"}>
                Coming Soon
            </DefaultTypography>

            <DefaultTypography className={"text-center text-gray-500"}>
                Our {name} module is designed to meet {"\n"} your Business needs
            </DefaultTypography>
        </View>
    )
}