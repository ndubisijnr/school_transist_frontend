import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes, RouteType } from "@/router/routes";
import { NavigationTypeConstant } from "@/utility/constant/NavigationTypeConstant";
import {Text, StyleSheet, StatusBar} from "react-native";
import { useTheme } from "@/libs/useTheme";
import React from "react";
import {Feather, Ionicons} from '@expo/vector-icons';


export const BottomTabs = () => {
    const BottomTab = createBottomTabNavigator();
    const tabNavigator = routes.filter((it: RouteType) => it.metadata?.type === NavigationTypeConstant.tab);
    const homeTab = tabNavigator.filter(it => it.path.includes('tab/dashboard'));
    const businessTab = tabNavigator.filter(it => it.path.includes('tab/business'));
    const theme = useTheme();
    const isTab = tabNavigator.map(it => it.path).filter(it => it.includes('tab/dashboard'))

    console.log(homeTab)


    return (
        <>
            <BottomTab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: theme.primary,
                    tabBarInactiveTintColor: "rgba(148, 149, 149, 1)",
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabel: ({ color })  => {
                        const screen = tabNavigator.filter((it) => it.path === route.name)[0];
                        return <Text style={{ color: color }}>{screen?.metadata?.title ?? screen?.path}</Text>;
                    },
                    tabBarIcon:({color,focused})  => {
                        const screen = tabNavigator.filter((it) => it.path === route.name)[0];
                        const path = tabNavigator.filter((it) => it.path);
                        const Svg = focused ? screen?.metadata?.activeIcon ?? screen?.metadata?.inactiveIcon : screen?.metadata?.inactiveIcon ?? screen?.metadata?.activeIcon;

                        return Svg ? <Ionicons name={Svg} size={20}  /> : null
                    }
                })}>

                {tabNavigator.map((value, index) => (

                    <BottomTab.Screen
                        key={index}
                        name={value?.path}
                        component={value?.component}
                        options={value?.options}
                    />
                ))}

            </BottomTab.Navigator>

            <StatusBar barStyle="dark-content" />
        </>

    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        elevation: 4,
        height:  100,
        paddingBottom:30,
        paddingTop: 10,
        borderWidth: 0,
        borderTopWidth: 0.5
    },
});