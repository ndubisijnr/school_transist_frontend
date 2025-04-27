import {ReactNode} from "react";
import {Text, TextProps} from "react-native";

export interface DefaultTypographyProps extends TextProps{
    children?: ReactNode
}

export const DefaultTypography = ({children, className, ...props}:DefaultTypographyProps ) =>{

    return (
        <Text className={`font-body ${className}`} {...props}>
            {children}
        </Text>
    )
}