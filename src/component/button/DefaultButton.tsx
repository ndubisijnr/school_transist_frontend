import {ActivityIndicator, TouchableOpacity} from "react-native";
import {ReactNode} from "react";
import {TouchableOpacityProps} from "react-native-gesture-handler";
import {useTheme} from "@/libs/useTheme";
import {DefaultTypography, DefaultTypographyProps} from "@/component/text/DefaultTypography";

interface DefaultButtonProps extends TouchableOpacityProps{
    children?: ReactNode,
    title?: string
    loading?: boolean,
    loadingColor?: "text-white" | "text-black",
    defaultTypography?: DefaultTypographyProps
}
export const DefaultButton = ({children, loadingColor="text-white", defaultTypography, loading, style, className,title, ...props}: DefaultButtonProps)=>{

    const theme = useTheme()

    return (
        <TouchableOpacity activeOpacity={.6} disabled={loading} style={[{backgroundColor: theme.primary},style]} className={`h-[56px]   disabled:opacity-70 items-center rounded-xl justify-center ${className}`} {...props}>
            {
                !loading ?
                children ?
                    children
                    :
                    <DefaultTypography className={"text-white !font-sora_semi_bold text-[14px]"} {...defaultTypography}> {title}</DefaultTypography>:
                    <ActivityIndicator className={`${loadingColor}`} />
            }
        </TouchableOpacity>
    )
}