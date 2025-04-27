import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {useTheme} from "@/libs/useTheme";
import {DefaultTypography} from "@/component/text/DefaultTypography";


interface NumberKeyPadInputProps {
    onUpdateValue: (values: string[]) => void,
    containerClassName?: string,
    length?: number,
    loading?: boolean
}

const NumberKeypadInput = ({onUpdateValue, loading=false, length = 4, containerClassName}: NumberKeyPadInputProps) => {
    const [values, setValues] = useState(Array(length).fill(''));

    const handleKeyPress = (key: number | string) => {
        if (key == 'x') {
            popValue()
            return null
        }
        const keyString = key.toString();
        if (keyString.length === 1) {
            const focusedIndex = values.findIndex((value) => value === '');
            if (focusedIndex !== -1) {
                const updatedValues = [...values];
                updatedValues[focusedIndex] = keyString;
                setValues(updatedValues);

            }
        }
    }

    const popValue = () => {
        const lastIndex = values.length - 1;
        const lastNonEmptyIndex = values.map((value, index) => (value !== '' ? index : -1)).filter(index => index !== -1).pop();
        if (lastNonEmptyIndex !== undefined) {
            const updatedValues = [...values];
            updatedValues[lastNonEmptyIndex] = '';
            setValues(updatedValues);
        }
    };

    const handleCancel = () => {
        setValues(Array(length).fill(''));
    };

    useEffect(() => {
        onUpdateValue && onUpdateValue(values)
        if (values.every((value) => value != '')) {
            setValues(Array(length).fill(''));
        }
    }, [values]);

    const theme = useTheme()

    //   {
    //                     authState.loading && (
    //                         <View className={'flex-row w-full items-center gap-3 mt-5 justify-center'}>
    //                             <ActivityIndicator color={theme.primary} size={'small'}/>
    //                         </View>
    //                     )
    //                 }
    return (
        <View className={`${containerClassName}`}>
            <View className={'flex-row items-center justify-center gap-4 mb-10'}>
                {
                    loading ? <ActivityIndicator color={theme.primary} size={'small'}/> :
                    values.map((value, index) => {
                        return (
                            <View key={index}
                                  style={{backgroundColor: value != '' ? theme.primary : "lightgray"}}
                                  className={`w-3 h-3 rounded-full`}/>
                        )
                    })
                }
            </View>

            <View className={`gap-5 `}>
                <View className={'flex-row justify-around gap-16 items-center'}>
                    {['1', 2, 3].map((num, index) => (
                        <TouchableOpacity disabled={loading} key={index} style={{borderColor: theme.primary}} className={"text-black rounded-full border justify-center items-center w-[51px] h-[51px]"} activeOpacity={.5} onPress={() => handleKeyPress(num)}>
                            <DefaultTypography style={{color: theme.primary}} className={"font-sora_semi_bold text-[18px]"}>{num}</DefaultTypography>
                        </TouchableOpacity>

                    ))}
                </View>
                <View className={'flex-row justify-around gap-16 items-center'}>
                    {['4', 5, 6].map((num, index) => (
                        <TouchableOpacity disabled={loading} key={index}style={{borderColor: theme.primary}} className={"text-black rounded-full border justify-center items-center w-[51px] h-[51px]"} activeOpacity={.5} onPress={() => handleKeyPress(num)}>
                            <DefaultTypography style={{color: theme.primary}} className={"font-sora_semi_bold text-[18px]"}>{num}</DefaultTypography>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className={'flex-row justify-around gap-16 items-center'}>
                    {['7', 8, 9].map((num, index) => (
                        <TouchableOpacity disabled={loading} key={index}style={{borderColor: theme.primary}} className={"text-black rounded-full border justify-center items-center w-[51px] h-[51px]"} activeOpacity={.5} onPress={() => handleKeyPress(num)}>
                            <DefaultTypography style={{color: theme.primary}} className={"font-sora_semi_bold text-[18px]"}>{num}</DefaultTypography>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className={'flex-row justify-around gap-16 items-center'}>
                    {['', '0', 'x'].map((num, index) => (
                        num != "" ?
                        <TouchableOpacity disabled={loading} key={index}style={{borderColor: theme.primary}} className={"text-black rounded-full border justify-center items-center w-[51px] h-[51px]"} activeOpacity={.5} onPress={() => handleKeyPress(num)}>
                            <DefaultTypography style={{color: theme.primary}} className={"font-sora_semi_bold text-[18px]"}>{num}</DefaultTypography>
                        </TouchableOpacity> :
                            <TouchableOpacity disabled={loading} key={index} className={"text-black rounded-full  justify-center items-center w-[51px] h-[51px]"} activeOpacity={.5} onPress={() => handleKeyPress(num)}>
                                {/*<DefaultTypography style={{color: theme.primary}} className={"font-sora_semi_bold text-[18px]"}>{num}</DefaultTypography>*/}
                            </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default NumberKeypadInput;
