import useLocation from "@/utility/hook/useLocation"
import { RootState } from "@/store"
import { useEffect } from "react"
import auth from "@/store/modules/auth"
import {useDispatch} from "react-redux";

export const SplashScreen = ()=>{
    const {location, errorMsg} = useLocation()
    const dispatch = useDispatch<any>()


    useEffect(() => {
        // if(location){
        //     dispatch(auth.mutation.setUserLocation(location))
        // }

    }, [location])


    return (
        <></>
    )
}