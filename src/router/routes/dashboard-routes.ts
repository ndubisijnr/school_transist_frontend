import {RouteType} from "@/router/routes/index";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import Home from "@/view/screens/tabs/home";
import Business from "@/view/screens/dashboard/business";
import WalletScreen from "@/view/screens/tabs/wallet";
import ProfileScreen from "@/view/screens/tabs/profile";
import {SplashScreen} from "@/view/screens/onboarding/SplashScreen";
import Dashboard from "@/view/screens/business_tabs/dashboard";
import Analytics from "@/view/screens/business_tabs/analytics";
import Dispatch from "@/view/screens/business_tabs/dispatch";
import ReelsScreen from "@/view/screens/tabs/market_reels_screen";
import CooperativeScreen from "@/view/screens/dashboard/cooperative";
import SearchScreen from "@/view/screens/tabs/search";

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
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'home', inactiveIcon:'home-outline', title:'Home'}
    },

    {
        path: RouteConstant.dashboard.MarketReelsScreen.path,
        name: RouteConstant.dashboard.MarketReelsScreen.name,
        component:ReelsScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'play', inactiveIcon:'play-outline', title:'Market Reels'}
    },
    {
        path: RouteConstant.dashboard.walletScreen.path,
        name: RouteConstant.dashboard.walletScreen.name,
        component:WalletScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'wallet', inactiveIcon:'wallet-outline', title:'Wallet'}
    },

    {
        path: RouteConstant.dashboard.cooperativeScreen.path,
        name: RouteConstant.dashboard.cooperativeScreen.name,
        component:CooperativeScreen,
        metadata: {type: NavigationTypeConstant.stack}
    },
    {
        path: RouteConstant.dashboard.searchScreen.path,
        name: RouteConstant.dashboard.searchScreen.name,
        component: SearchScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'search', inactiveIcon:'search-outline', title:'Explore'}
    },
    {
        path: RouteConstant.dashboard.settingsScreen.path,
        name: RouteConstant.dashboard.settingsScreen.name,
        component: ProfileScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'person', inactiveIcon:'person-outline', title:'Profile'}
    },


    {
        path: RouteConstant.dashboard.createBusinessScreen.path,
        name: RouteConstant.dashboard.createBusinessScreen.name,
        component: Business,
        metadata: {type: NavigationTypeConstant.stack}
    },
    {
        path: RouteConstant.dashboard.businessDashboardScreen.path,
        name: RouteConstant.dashboard.businessDashboardScreen.name,
        component: Dashboard,
        metadata: {type: NavigationTypeConstant.stack}
    },
    {
        path: RouteConstant.dashboard.analyticsScreen.path,
        name: RouteConstant.dashboard.analyticsScreen.name,
        component: Analytics,
        metadata: {type: NavigationTypeConstant.stack}
    },
    {
        path: RouteConstant.dashboard.logisticsScreen.path,
        name: RouteConstant.dashboard.logisticsScreen.name,
        component:Dispatch ,
        metadata: {type: NavigationTypeConstant.stack}
    },


]