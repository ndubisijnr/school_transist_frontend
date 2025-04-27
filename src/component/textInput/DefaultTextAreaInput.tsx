import {
    TextInputProps,
    View,
    TextInput,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    Pressable
} from "react-native";
import EyePasswordShow from '@/assets/icon/eye-show.svg'
import EyePasswordUnShow from '@/assets/icon/eye-off.svg'
import ChevronLeft from '@/assets/icon/chevron-left.svg'
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {useState} from "react";

interface DefaultTextAreaInputProps extends TextInputProps{
   formik?: any,
    label?: string,
    select?: boolean,
    name?: string,
    secureTextEntry?: boolean,
    containerClassname?: string,
    onClick?: ()=>void
}
export const DefaultTextAreaInput = ({className, onClick, select, editable, secureTextEntry, name, containerClassname,label, formik, ...props}: DefaultTextAreaInputProps)=>{
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [secure, setSecure] = useState<boolean>(true)
    const textInput = name != undefined ? name : ''


    function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(true)
    }

    function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
        setIsFocused(false)
        formik?.handleBlur(textInput)(e)
    }

    const isError = formik?.touched[textInput] && formik?.errors[textInput]


    return (
        <Pressable onPress={onClick}  className={`gap-1 my-2 ${containerClassname}`}>
            <DefaultTypography>{label}</DefaultTypography>
            <View className={"border border-gray-400 rounded flex-row flex-1 min-h-[50px] px-4 "}>
                <TextInput
                    editable={select ? false : editable}
                    returnKeyType={"done"}
                    value={formik?.values?.[textInput]}
                    onChangeText={formik?.handleChange(textInput)}
                    secureTextEntry={secureTextEntry && secure}
                    placeholderTextColor={'rgba(42, 44, 43, 0.4)'}
                    className={`grow  text-[14px] ${className}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                    onPress={onClick}
                />
                {
                    select &&
                    <View className={' h-full justify-center px-1'}>
                        <ChevronLeft style={{transform: [{ rotate: '90deg' }]}} />
                    </View>
                }
                {
                    secureTextEntry && (
                        <Pressable className={' h-full justify-center px-1'} onPress={() => setSecure(!secure)}>
                            {
                                secure ? <EyePasswordShow width={20} height={20}/> :
                                    <EyePasswordUnShow width={20} height={20}/>
                            }
                        </Pressable>
                    )
                }
            </View>
            {
                isError && (
                    <DefaultTypography className={'text-red-600 text-[11px]'}>{formik?.errors[textInput]}</DefaultTypography>
                )
            }
        </Pressable>
    )
}