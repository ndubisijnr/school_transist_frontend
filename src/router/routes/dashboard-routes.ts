import {RouteType} from "@/router/routes/index";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import Home from "@/view/screens/tabs/home";
import WalletScreen from "@/view/screens/tabs/wallet";
import ProfileScreen from "@/view/screens/tabs/profile";
import {SplashScreen} from "@/view/screens/onboarding/SplashScreen";
import RideSearch from "@/view/screens/dashboard/ride-search";
import Business from "@/view/screens/dashboard/business";


export const dashboardRoutes: RouteType[] = [
    {
        path: RouteConstant.dashboard.splashScreen.path,
        name: RouteConstant.dashboard.splashScreen.name,
        component: SplashScreen,
        metadata: {type: NavigationTypeConstant.stack}
    },

    {
        path: RouteConstant.dashboard.homeScreen.path,
        name: RouteConstant.dashboard.homeScreen.name,
        component:Home,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'car', inactiveIcon:'car-outline', title:'Ride'}
    },

    {
        path: RouteConstant.dashboard.rideSearchScreen.path,
        name: RouteConstant.dashboard.rideSearchScreen.name,
        component:RideSearch,
        metadata: {type: NavigationTypeConstant.stack}
    },
    {
        path: RouteConstant.dashboard.createBusinessScreen.path,
        name: RouteConstant.dashboard.createBusinessScreen.name,
        component: Business,
        metadata: {type: NavigationTypeConstant.stack}
    },

    {
        path: RouteConstant.dashboard.walletScreen.path,
        name: RouteConstant.dashboard.walletScreen.name,
        component:WalletScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'wallet', inactiveIcon:'wallet-outline', title:'Activity'}
    },

    {
        path: RouteConstant.dashboard.settingsScreen.path,
        name: RouteConstant.dashboard.settingsScreen.name,
        component: ProfileScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'person', inactiveIcon:'person-outline', title:'Profile'}
    },


]