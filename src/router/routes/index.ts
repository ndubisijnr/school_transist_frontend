import React from "react";
import {authRoutes} from "@/router/routes/auth-routes";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import {SvgProps} from "react-native-svg";
import {dashboardRoutes} from "@/router/routes/dashboard-routes";
export type RouteType = {
    path: string,
    name: string,
    options?: object,
    component: React.ComponentType,
    metadata?: Options,
}

type Options = {
    isAuthenticated?: [boolean, boolean] | boolean,
    redirectTo?: string,
    title?: string,
    activeIcon?: any
    inactiveIcon?: any,
    type?: NavigationTypeConstant,
}

const initRoute  = ([] as RouteType[]);

export const routes = initRoute.concat(dashboardRoutes,authRoutes)
