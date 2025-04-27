import {createNavigationContainerRef, StackActions} from "@react-navigation/native";
import {RootStackParamList, RouteItem, RouteKeys} from "@/utility/type/RouteType";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();


export class RouterUtil {
    static getRouteInfo(path: string): RouteItem {
        const keys = path.split('.');
        let current: any = RouteConstant;

        for (const key of keys) {
            if (current[key] === undefined) {
                throw new Error(`Invalid route path: ${path}`);
            }
            current = current[key];
        }

        if (!this.isRouteInfo(current)) {
            throw new Error(`Path ${path} does not point to a valid route`);
        }

        return current;
    }

   static getCurrentRoute() {
        return navigationRef.current?.getCurrentRoute();
    }

    static goBack() {
        navigationRef?.goBack();
    }

    static canGoBack() {
        if (navigationRef?.isReady()){
            navigationRef?.canGoBack();
        }
    }

    // static navigate<T>(name: RouteKeys, params?: T  ) {
    //     if (navigationRef.isReady()) {
    //         const routeItem = this.getRouteInfo(name)
    //         const navigationType = routeItem?.path?.split("/")?.[0]
    //
    //         if (navigationType?.toLowerCase()?.includes(NavigationType.stack?.toLowerCase())){
    //             navigationRef.navigate(routeItem.path, params);
    //         }else if (navigationType?.toLowerCase()?.includes(NavigationType.tab?.toLowerCase())){
    //             if (params == null)
    //                 params={screen:NavigationType.tab, params:{screen: routeItem.path}} as any
    //             else{
    //                 (params as any).screen = NavigationType.tab
    //                 (params as any).params.screen = routeItem.path
    //             }
    //             navigationRef.navigate(NavigationType.drawer, params);
    //         }else if (navigationType?.toLowerCase()?.includes(NavigationType.drawer?.toLowerCase())){
    //             if (params == null)
    //                 params={screen:routeItem.path} as any
    //             else{
    //                 (params as any).screen = routeItem.path
    //             }
    //             navigationRef.navigate(NavigationType.drawer, params)
    //         }else {
    //             console.log("invalid routing")
    //         }
    //     }
    //
    // }

    static navigate<T extends object>(name: RouteKeys, params?: T) {
        if (!navigationRef.isReady()) {
            return;
        }

        const routeItem = this.getRouteInfo(name);
        if (!routeItem?.path) {
            console.warn('Invalid route path');
            return;
        }

        const [navigationType = ''] = routeItem.path.split('/');
        const normalizedType = navigationType.toLowerCase();

        switch (normalizedType) {
            case NavigationTypeConstant.stack.toLowerCase():
                navigationRef.navigate(routeItem.path, params);
                break;

            case NavigationTypeConstant.tab.toLowerCase(): {
                const navigationParams = {
                    screen: NavigationTypeConstant.tab,
                    params: {
                        screen: routeItem.path,
                        params
                    }
                };
                navigationRef.navigate(NavigationTypeConstant.drawer, navigationParams);
                break;
            }

            case NavigationTypeConstant.drawer.toLowerCase(): {
                const navigationParams = {
                    screen: routeItem.path,
                    params
                };
                navigationRef.navigate(NavigationTypeConstant.drawer, navigationParams);
                break;
            }

            default:
                console.warn('Invalid navigation type:', navigationType);
        }
    }

    static replace<T extends object>(name: RouteKeys, params?: T) {
        if (!navigationRef.isReady()) {
            return;
        }

        const routeItem = this.getRouteInfo(name);
        if (!routeItem?.path) {
            console.warn('Invalid route path');
            return;
        }

        const [navigationType = ''] = routeItem.path.split('/');
        const normalizedType = navigationType.toLowerCase();

        switch (normalizedType) {
            case NavigationTypeConstant.stack.toLowerCase():
                navigationRef.dispatch(
                    StackActions.replace(routeItem.path, params)
                );
                break;

            case NavigationTypeConstant.tab.toLowerCase(): {
                const navigationParams = {
                    screen: NavigationTypeConstant.tab,
                    params: {
                        screen: routeItem.path,
                        params
                    }
                };
                navigationRef.dispatch(
                    StackActions.replace(NavigationTypeConstant.drawer, navigationParams)
                );
                break;
            }

            case NavigationTypeConstant.drawer.toLowerCase(): {
                const navigationParams = {
                    screen: routeItem.path,
                    params
                };
                navigationRef.dispatch(
                    StackActions.replace(NavigationTypeConstant.drawer, navigationParams)
                );
                break;
            }

            default:
                console.warn('Invalid navigation type:', navigationType);
        }
    }

    static push<T extends RouteKeys>(name: T, params?: RootStackParamList[T]) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(
                StackActions.push(name, params)
            );
        }
    }

    private static isRouteInfo(obj: any): obj is RouteItem {
        return obj
            && typeof obj === 'object'
            && typeof obj.path === 'string'
            && typeof obj.name === 'string';
    }
}
