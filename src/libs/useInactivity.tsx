import ReactNativeInactivity from "react-native-inactivity";
import {ReactNode, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

interface ViewComponentProps {
    children?: ReactNode
}

interface InactivityProps {
    callbackFn?: ()=> void,
    timeout?: number,
    loop?: boolean,
    restart?: boolean,
}
export const useInactivity=({timeout=60000, loop=false, restart=false,callbackFn}: InactivityProps)=> {



    const ViewComponent = ({children}: ViewComponentProps)=> {
        const authState = useSelector((state: RootState)=> state.auth)
        const isActive = false

        return (
            <>
                <ReactNativeInactivity
                    isActive={isActive}
                    onInactive={() => callbackFn && callbackFn()}
                    timeForInactivity={timeout}
                    restartTimerOnActivityAfterExpiration={restart}
                    loop={loop} >
                    {children}
                </ReactNativeInactivity>
            </>
        )
    }

    return {
        ViewComponent
    }
}