import {RouteConstant} from "@/utility/constant/RouteConstant";
import {string} from "yup";

export type RouteItem = {
    path: string;
    name: string;
}

// Create a type that flattens the nested structure
type FlattenRouteConstant = {
    [K in keyof typeof RouteConstant]: {
        [P in keyof typeof RouteConstant[K]]: RouteItem
    }
}

// Create a type that gets all possible path combinations
export type RouteKeys = {
    [K in keyof FlattenRouteConstant]: {
        [P in keyof FlattenRouteConstant[K]]: `${K & string}.${P & string}`
    }[keyof FlattenRouteConstant[K]]
}[keyof FlattenRouteConstant]


export type RootStackParamList = Record<RouteKeys | string, any >

