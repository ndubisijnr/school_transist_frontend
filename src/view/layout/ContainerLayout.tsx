// import {ReactNode} from "react";
// import {Platform, SafeAreaView, StyleSheet, View, ViewProps} from "react-native";
// import {StatusBar, StatusBarStyle} from "expo-status-bar";
// import {useSafeAreaInsets} from "react-native-safe-area-context";
//
// export interface ContainerLayoutProps extends ViewProps{
//     children: ReactNode,
//     backgroundColor?: string,
//     barColor?: string,
//     barStyle?: StatusBarStyle | undefined,
// }
//
// export const ContainerLayout = ({children, className, backgroundColor="#fff", barColor="transparent", barStyle="dark", ...props}: ContainerLayoutProps)=>{
//     const insets = useSafeAreaInsets();
//
//     return (
//         <SafeAreaView style={[styles.container, {paddingTop: insets.top, backgroundColor: backgroundColor}]}>
//             <StatusBar translucent  backgroundColor={barColor} animated={true} style={barStyle}/>
//             <View className={`flex-1 ${className || ''}`}
//                   style={[Platform.OS == 'ios' && {marginBottom: -insets.bottom, paddingBottom: insets.bottom}]}
//                   {...props}
//             >
//                 {children}
//             </View>
//         </SafeAreaView>
//     )
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     }
// })

import {ReactNode} from "react";
import {Platform, SafeAreaView, StyleSheet, View, ViewProps} from "react-native";
import {StatusBar, StatusBarStyle} from "expo-status-bar";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export interface ContainerLayoutProps extends ViewProps{
    children: ReactNode,
    backgroundColor?: string,
    barColor?: string,
    barStyle?: StatusBarStyle | undefined,
    fullscreenMode?: boolean, // Add this prop to handle fullscreen cases
}

export const ContainerLayout = ({
                                    children,
                                    className,
                                    backgroundColor="#fff",
                                    barColor="transparent",
                                    barStyle="dark",
                                    fullscreenMode=false, // Default to false
                                    ...props
                                }: ContainerLayoutProps) => {
    const insets = useSafeAreaInsets();

    const containerStyle = [
        styles.container,
        {
            backgroundColor: backgroundColor,
            paddingTop: fullscreenMode ? 0 : insets.top
        }
    ];

    return (
        <View style={containerStyle}>
            <StatusBar translucent backgroundColor={barColor} animated={true} style={barStyle}/>
            <View
                className={`flex-1 ${className || ''}`}
                style={[
                    Platform.OS == 'ios' && {
                        marginBottom: -insets.bottom,
                        paddingBottom: insets.bottom
                    },
                    // Apply any other styles from props
                    props.style
                ]}
            >
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});