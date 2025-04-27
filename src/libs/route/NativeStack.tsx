import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routes, RouteType} from "@/router/routes";
import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
import {NativeDrawer} from "@/libs/route/NativeDrawer";
import {RouterUtil} from "@/utility/RouterUtil";

// import {createDrawerNavigator} from "@react-navigation/drawer";
// import {routes, RouteType} from "@/router/routes";
// import {NavigationTypeConstant} from "@/utility/constant/NavigationTypeConstant";
// import {BottomTabs} from "@/libs/route/BottomTabs";
// import {DrawerLayout} from "@/view/layout/DrawerLayout";
// import {createNativeStackNavigator} from "@react-navigation/native-stack";
// import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
// import { NativeStack } from "./NativeDrawer";

export interface NativeStackProps {
    initialRouteName?: string
}
export const NativeStack = ({initialRouteName}: NativeStackProps) => {
    const Stack = createNativeStackNavigator();
    // const isAuthenticated = (store.getState() as RootState).auth?.token
    const isAuthenticated = false

    const drawer: RouteType[] =[
        {
            name: NavigationTypeConstant.drawer,
            path: NavigationTypeConstant.drawer,
            options: {},
            metadata:{
                isAuthenticated: false,
                type:  NavigationTypeConstant.drawer
            },
            component: NativeDrawer
        }
    ]
    const stackNavigator = routes?.filter((it: RouteType)=> it.metadata?.type === NavigationTypeConstant.stack)?.concat(drawer)

    const validatedNavigations = stackNavigator.filter((it)=> {
        if ( isAuthenticated && it.metadata?.isAuthenticated)
            return true
        else if (!isAuthenticated && !it.metadata?.isAuthenticated)
            return true
        else
            return false;
    })


    console.log("validatedNavigations", RouterUtil.getCurrentRoute())



    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={initialRouteName}
        >
            {
                validatedNavigations.map((value, index)=>{
                    return(
                        <Stack.Screen key={index} name={value?.path} component={value?.component} options={value?.options} />
                    )
                })
            }
        </Stack.Navigator>
    )
}


// export const NativeDrawer = ({initialRouteName}: NativeStackProps) => {
//     const BottomTab = createBottomTabNavigator();

//     const stack: RouteType[] =[
//         {
//             path: NavigationTypeConstant.stack,
//             name: NavigationTypeConstant.stack,
//             options: {
//                 title: "Home"
//             },
//             metadata:{
//                 type: NavigationTypeConstant.stack
//             },
//             component: NativeStack
//         }
//     ]

//     const drawerNavigator = routes.filter((it: RouteType)=> it.metadata?.type === NavigationTypeConstant.tab)?.concat(stack)



//     // const initialRouteName = ""
//     return(
//         <BottomTab.Navigator
//             screenOptions={({route})=>(
//                 {
//                     headerShown: false,
//                     drawerStyle:{
//                         zIndex: 999,
//                         width: "80%",
//                     },
//                     drawerActiveBackgroundColor: "",
//                     drawerInactiveTintColor: "",
//                     drawerInactiveBackgroundColor: "white",
//                     drawerLabelStyle:{
//                         fontSize: 15,
//                         lineHeight: 18,
//                         fontFamily: "",
//                         marginLeft: -20,
//                     },
//                     drawerItemStyle:{
//                         height: 45,
//                         justifyContent:"center",
//                         width:"100%"
//                     },
//                     drawerIcon: ({focused, color, size})=>{
//                         const screen = drawerNavigator.filter((it)=> it.name === route.name)[0]
//                         const Svg = focused? screen.metadata?.activeIcon : screen.metadata?.inactiveIcon
//                         return Svg ? <Svg width={24}  /> : <></>
//                     }

//                 }
//             )}
//             drawerContent={props => <DrawerLayout {...props} />}
//             initialRouteName={initialRouteName}
//         >
//             {
//                 drawerNavigator.map((value, index)=>{
//                     return(
//                         <BottomTab.Screen  key={index} name={value?.path}   component={value?.component} options={value?.options} />
//                     )
//                 })
//             }
//         </BottomTab.Navigator>
//     )
// }
