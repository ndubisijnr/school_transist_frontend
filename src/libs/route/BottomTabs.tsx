import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes, RouteType } from "@/router/routes";
import { NavigationTypeConstant } from "@/utility/constant/NavigationTypeConstant";
import {Text, StyleSheet, Platform, View, StatusBar} from "react-native";
import { useTheme } from "@/libs/useTheme";
import useCart from "@/utility/hook/useCart";
import React, {useEffect} from "react";

export const BottomTabs = () => {
    const BottomTab = createBottomTabNavigator();
    const tabNavigator = routes.filter((it: RouteType) => it.metadata?.type === NavigationTypeConstant.tab);
    const theme = useTheme();
    const { cartCount, fetchCartData } = useCart();

    useEffect(() => {
        fetchCartData()
    }, [fetchCartData]);


    return (
        <>
            <BottomTab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: theme.primary,
                    tabBarInactiveTintColor: "rgba(148, 149, 149, 1)",
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabel: ({ color }) => {
                        const screen = tabNavigator.filter((it) => it.path === route.name)[0];
                        return <Text style={{ color: color }}>{screen?.metadata?.title ?? screen?.name}</Text>;
                    },
                    tabBarIcon: ({ color, focused }) => {
                        const screen = tabNavigator.filter((it) => it.path === route.name)[0];
                        const Svg = focused ? screen?.metadata?.activeIcon ?? screen?.metadata?.inactiveIcon : screen?.metadata?.inactiveIcon ?? screen?.metadata?.activeIcon;

                        // Check if this is the cart tab
                        const isCartTab = screen.metadata?.title === 'Cart'; // Adjust according to how you identify your cart tab
                        if (isCartTab) {
                            // Return the icon with a badge for cart
                            return (
                                <View style={{ width: 30, height: 30 }}>
                                    {Svg ? <Svg width={30} color={color} /> : null}
                                    <View style={[styles.badge, { backgroundColor: theme.primary }]}>
                                        <Text style={styles.badgeText}>
                                            {cartCount < 1 ? '0' : cartCount > 99 ? '99+' : cartCount}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }

                        // Return normal icon for other tabs
                        return Svg ? <Svg width={30} color={color} /> : null;
                    },
                })}
            >
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
    badge: {
        position: 'absolute',
        right: -6,
        top: -4,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});