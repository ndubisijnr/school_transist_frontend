import {RouteType} from "@/router/routes/index";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import Dashboard from "@/view/screens/business_tabs/dashboard";
import Business from "@/view/screens/dashboard/business";
import Send  from "@/view/screens/dashboard/send";
export const dashboardRoutes: RouteType[] = [

    {
        path: RouteConstant.dashboard.homeScreen.path,
        name: RouteConstant.dashboard.homeScreen.name,
        // component: MyProfileScreen,
        metadata: {type: NavigationTypeConstant.stack}
    },


]