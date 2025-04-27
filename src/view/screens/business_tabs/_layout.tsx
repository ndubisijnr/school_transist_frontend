import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function BusinessLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#F2F2F7',
                },
                headerStyle: {
                    backgroundColor: '#F2F2F7',
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"

                options={{
                    title: 'Dashboard',
                    headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="clipboard" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="dispatch"
                options={{
                    title: 'Dispatch',
                    headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="truck" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen

                name="analytics"
                options={{
                    title: 'Analytics',
                    headerShown:false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" color={color} size={size} />
                    ),
                }}
            />


        </Tabs>
    );
}