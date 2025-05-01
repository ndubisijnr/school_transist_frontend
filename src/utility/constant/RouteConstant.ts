import { RouteItem } from "@/utility/type/RouteType";

export type RouteConstantType = {
    [key: string]: {
        [key: string]: RouteItem
    }
}

export const RouteConstant = {
    auth: {
        login: {
            path: "stack/auth/login",
            name: "Login"
        },
        register: {
            path: "stack/auth/register",
            name: "Register"
        },

    },
    onboarding: {

    },
    dashboard: {
        splashScreen: {
            path: "stack/splash-screen",
            name: "Splash Screen"
        },
        sendMoneyScreen: {
            path: "stack/send-money-screen",
            name: "Send Money Screen"
        },

        createBusinessScreen: {
            path: "stack/create-business-screen",
            name: "Create Business Screen"
        },
        homeScreen: {
            path: "tab/dashboard/home-screen",
            name: "Home Screen"
        },

        walletScreen: {
            path: "tab/dashboard/wallet-screen",
            name: "Wallet Screen"
        },
        MarketReelsScreen: {
            path: "tab/dashboard/market-reels-screen",
            name: "Market Reels Screen"
        },

        businessScreen: {
            path: "tab/dashboard/business-screen",
            name: "Business Screen"
        },

        settingsScreen: {
            path: "tab/dashboard/settings-screen",
            name: "Settings Screen"
        },
        businessDashboardScreen: {
            path: "stack/dashboard/business-screen",
            name: "Business Dashboard Screen"
        },

        logisticsScreen: {
            path: "stack/dashboard/logistics-screen",
            name: "Logistics Screen"
        },

        analyticsScreen: {
            path: "stack/dashboard/analytics-screen",
            name: "Analytics Screen"
        },


    },

}