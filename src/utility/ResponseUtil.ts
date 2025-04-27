import {Dispatch} from "redux";
import base from "@/store/modules/base";
import {BottomSheetConstant} from "@/utility/constant/BottomSheetConstant";
import Toast from "react-native-toast-message";
import {RouterUtil} from "@/utility/RouterUtil";
import auth from "@/store/modules/auth";

export class ResponseUtil {
  static customResponse(dispatch: Dispatch, message:string="successful", type: 'warning'|'error'|'success'= 'success', callback?:()=>void, title: string="Proceed"){
    dispatch(base.mutation.setBottomSheetConfig({
      component: BottomSheetConstant.NotificationBottomSheet,
      open: true,
      metadata: {
        notificationOptions: {
          title: type == 'error' ? "Error" : type == 'success' ? 'Success' :  'Warning',
          message: message,
          type: type,
          buttons:[
            {title: title, action:()=>{
              dispatch(base.mutation.setBottomSheetConfig({}))
              callback && callback();
            }}
          ]
        }
      }
    }))
  }

  static toast(message: string,title:string, type?: "success"|"info"|"error"){
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      swipeable: true,
      text1Style:{fontSize: 18},
      text2Style:{fontSize: 14},
      topOffset: 80,
    });
  }
  static apiResponse(dispatch: Dispatch, response: any, type: 'warning'|'error'|'success'= 'error', callback?:()=>void, buttons?: {title: string, action?: ()=> void}[]){

    // Create the default "Ok" button
    const defaultButtons = [
      {
        title: "Proceed",
        action: () => {
          dispatch(base.mutation.setBottomSheetConfig({}))
          callback && callback();
        }
      }
    ];

    // Add additional buttons if provided
    const allButtons = buttons && buttons.length > 0
        ? [...defaultButtons, ...buttons]
        : defaultButtons;
    if (response.payload.responseCode){

      if (response.payload.responseMessage?.includes("JWT")){
        dispatch(base.mutation.setBottomSheetConfig({
          open: true,
          component: BottomSheetConstant.NotificationBottomSheet,
          metadata:{
            notificationOptions:{
              title: "Session ",
              message: "Your session has timed out. \n Click to login again",
              type: "error",
              buttons: [
                {title: "Login again", action: ()=>{
                    dispatch(auth.mutation.setToken(""))
                    dispatch(base.mutation.setBottomSheetConfig({}))
                    RouterUtil.navigate("auth.login")
                  }}
              ]
            }
          }

        }))
        return null
      }
      else if (response.payload.responseCode == "117"){
        dispatch(base.mutation.setBottomSheetConfig({
          open: true,
          component: BottomSheetConstant.NotificationBottomSheet,
          metadata:{
            notificationOptions:{
              title: "Security Alert: Multiple Sessions Detected",
              message: "For your account security, this session has been deactivated as your credentials are currently being used on another device. \n\nPlease login again to secure your account and verify your identity.",
              type: "error",
              buttons: [
                {title: "Login again", action: ()=>{
                    dispatch(auth.mutation.setToken(""))
                    dispatch(base.mutation.setBottomSheetConfig({}))
                    RouterUtil.navigate("auth.login")
                  }}
              ]
            }
          }

        }))
        return null
      }

      dispatch(base.mutation.setBottomSheetConfig({
        component: BottomSheetConstant.NotificationBottomSheet,
        open: true,
        metadata: {
          notificationOptions: {
            title: type == 'error' ? "Error" : type == 'success' ? 'Success' :  'Warning',
            message: response?.payload?.responseMessage ?? response?.responseMessage,
            type: type,
            buttons: allButtons
          }
        }
      }))

    }else {
      dispatch(base.mutation.setBottomSheetConfig({
        component: BottomSheetConstant.NotificationBottomSheet,
        open: true,
        metadata: {
          notificationOptions: {
            title: 'Error',
            message: "Something went wrong.",
            type: "error",
            buttons:[
              {title: "Proceed", action:()=>{
                  dispatch(base.mutation.setBottomSheetConfig({}))
                  callback && callback();
                }}
            ]
          }
        }
      }))
    }
  }
}