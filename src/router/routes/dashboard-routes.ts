import {RouteType} from "@/router/routes/index";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import Home from "@/view/screens/tabs/Home";
import Business from "@/view/screens/dashboard/business";
import Send  from "@/view/screens/dashboard/send";
import WalletScreen from "@/view/screens/tabs/wallet";
import Settings from "@/view/screens/tabs/settings";
import {SplashScreen} from "@/view/screens/onboarding/SplashScreen";
import HomeIcon from "@/assets/icon/home.svg"
import HomeIcon2 from "@/assets/icon/active-home.svg"
import WalletActive from "@/assets/icon/active-wallet.svg"
import Dashboard from "@/view/screens/business_tabs/dashboard";
import Analytics from "@/view/screens/business_tabs/analytics";
import Dispatch from "@/view/screens/business_tabs/dispatch";
import ReelsScreen from "@/view/screens/tabs/market_reels_screen";

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
        path: RouteConstant.dashboard.walletScreen.path,
        name: RouteConstant.dashboard.walletScreen.name,
        component:WalletScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'wallet', inactiveIcon:'wallet-outline', title:'Wallet'}
    },
    {
        path: RouteConstant.dashboard.MarketReelsScreen.path,
        name: RouteConstant.dashboard.MarketReelsScreen.name,
        component:ReelsScreen,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'wallet', inactiveIcon:'wallet-outline', title:'Market Reels'}
    },
    {
        path: RouteConstant.dashboard.settingsScreen.path,
        name: RouteConstant.dashboard.settingsScreen.name,
        component: Settings,
        metadata: {type: NavigationTypeConstant.tab, activeIcon:'settings', inactiveIcon:'settings-outline', title:'Settings'}
    },

    {
        path: RouteConstant.dashboard.sendMoneyScreen.path,
        name: RouteConstant.dashboard.sendMoneyScreen.name,
        component: Send,
        metadata: {type: NavigationTypeConstant.stack}
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