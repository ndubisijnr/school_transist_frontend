import {RouteType} from "@/router/routes/index";
import {RouteConstant} from "@/utility/constant/RouteConstant";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import Login from "@/view/screens/auth/login";
import Signup from "@/view/screens/auth/signup";

export const authRoutes: RouteType[] = [
    {
        path: RouteConstant.auth.login.path,
        name: RouteConstant.auth.login.name,
        component: Login,
        metadata: {type: NavigationTypeConstant.stack}
    },

    {
        path: RouteConstant.auth.register.path,
        name: RouteConstant.auth.register.name,
        component: Signup,
        metadata: {type: NavigationTypeConstant.stack}
    },



]