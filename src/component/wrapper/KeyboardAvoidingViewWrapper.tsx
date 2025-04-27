import { KeyboardAvoidingView, Platform, ScrollView, ScrollViewProps, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface KeyboardAvoidingViewWrapperProps extends ScrollViewProps {
    children: ReactNode;
    androidOffset?: number;
}

export const KeyboardAvoidingViewWrapper = ({
                                                children,
                                                androidOffset = 0,
                                                ...props
                                            }: KeyboardAvoidingViewWrapperProps) => {
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : androidOffset;

    return (
        <KeyboardAvoidingView
            behavior={behavior}
            keyboardVerticalOffset={keyboardVerticalOffset}
            style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
                {...props}>
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    scrollViewContent: {
        flexGrow: 1,
        // paddingBottom: 50
        paddingBottom: 120
    }
});