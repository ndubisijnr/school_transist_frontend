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
        homeScreen: {
            path: "stack/dashboard/home-screen",
            name: "Home Screen"
        },

    }
}