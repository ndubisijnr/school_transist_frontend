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
import Calender from '@/assets/icon/calender.svg'
import {DefaultTypography} from "@/component/text/DefaultTypography";
import {useState} from "react";

interface DefaultTextInputProps extends TextInputProps{
   formik?: any,
    label?: string,
    inputType?: "date"|"dropdown"|"text",
    name?: string,
    secureTextEntry?: boolean,
    containerClassname?: string,
    minContainerClassname?: string,
    onClick?: ()=>void
}
export const DefaultTextInput = ({className, inputType="text", minContainerClassname, onClick, editable, secureTextEntry, name, containerClassname,label, formik, ...props}: DefaultTextInputProps)=>{
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
        <Pressable onPress={onClick}  className={`gap-1 my-1 ${containerClassname}`}>
            { label ? <DefaultTypography>{label}</DefaultTypography> : <></>}
            <View className={`flex-row h-[50px] px-4  border border-[#D0D5DD] rounded-[8px] ${minContainerClassname}`}>
                <TextInput
                    editable={inputType == "text" ? editable : false}
                    returnKeyType={"done"}
                    value={formik?.values?.[textInput]}
                    onChangeText={formik?.handleChange(textInput)}
                    secureTextEntry={secureTextEntry && secure}
                    placeholderTextColor={'rgba(102, 112, 133, 1)'}
                    className={`grow  text-[16px] ${className}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoCapitalize="none"
                    {...props}
                    onPress={onClick}
                />
                {
                    inputType == "dropdown" &&
                    <View className={' h-full justify-center px-1'}>
                        <ChevronLeft style={{transform: [{ rotate: '90deg' }]}} />
                    </View>
                }
                {
                    inputType == "date" &&
                    <View className={' h-full justify-center px-1'}>
                        <Calender  />
                    </View>
                }
                {
                    secureTextEntry && (
                        <Pressable className={' h-full justify-center px-1'} onPress={() => setSecure(!secure)}>
                            {
                                !secure ? <EyePasswordShow color={"black"} width={20} height={20}/> :
                                    <EyePasswordUnShow color={"black"} width={20} height={20}/>
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