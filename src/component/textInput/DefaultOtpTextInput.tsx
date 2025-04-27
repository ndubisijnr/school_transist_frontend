import { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, Platform, Keyboard } from "react-native";
import { useTheme } from "@/libs/useTheme";

interface DefaultOtpTextInputProps {
    length?: number;
    value?: string;
    isError?: boolean | undefined;
    onChange?: (value: string) => void;
}

export const DefaultOtpTextInput = ({ length = 4, isError, onChange, value = "" }: DefaultOtpTextInputProps) => {
    const inputRef = useRef<TextInput>(null);
    const [localValue, setLocalValue] = useState<string>(value.padEnd(length, ''));
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setLocalValue(value.padEnd(length, ''));
        setActiveIndex(value.length);
    }, [value, length]);

    // Force keyboard to show when the component mounts
    useEffect(() => {
        // Small delay to ensure component is fully mounted
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (text: string) => {
        // Remove non-numeric characters
        const cleanText = text.replace(/\D/g, '').slice(0, length);
        // Handle backspace trimming
        const newValue = cleanText.padEnd(length, '');
        setLocalValue(newValue);
        setActiveIndex(cleanText.length);
        onChange?.(cleanText);
    };

    const theme = useTheme();

    const handlePress = () => {
        if (inputRef.current) {
            // Force show keyboard
            inputRef.current.blur();
            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                    // On Android, sometimes we need an extra push
                    if (Platform.OS === 'android') {
                        Keyboard.dismiss();
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 100);
                    }
                }
            }, 50);
        }
        setIsFocused(true);
    };

    return (
        <View>
            <TextInput
                ref={inputRef}
                value={localValue}
                onChangeText={handleChange}
                maxLength={length}
                keyboardType="numeric"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    opacity: 0,
                }}
                // autoFocus={true}
                caretHidden={true}
                contextMenuHidden={true}
                selectTextOnFocus={false}
                showSoftInputOnFocus={true}  // Make sure keyboard shows
            />

            <TouchableOpacity
                activeOpacity={1}
                onPress={handlePress}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                }}
            >
                {[...Array(length)].map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: 60,
                            height: 60,
                            paddingHorizontal: 8,
                            paddingVertical: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 1,
                            borderColor: index === activeIndex && isFocused ? theme.primary : isError == true ? "#ff0000" : isError == false ? "#5cb85c" : '#9CA3AF',
                            borderRadius: 4,
                        }}
                    >
                        <TextInput
                            editable={false}
                            value={localValue[index]}
                            returnKeyType={'default'}
                            style={{
                                fontSize: 28,
                                color: '#000000',
                                textAlign: 'center',
                                flex: 1,
                            }}
                        />
                        {index === activeIndex && isFocused && (
                            <View
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: theme.primary,
                                    width: '80%',
                                    marginTop: 'auto',
                                }}
                            />
                        )}
                    </View>
                ))}
            </TouchableOpacity>
        </View>
    );
};