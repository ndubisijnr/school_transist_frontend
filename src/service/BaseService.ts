import axios from "axios";
import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {RootState} from "@/store";
import {appConfig} from "../../config/app.config";
import {ThunkApiConfig} from "@/utility/type/StoreType";
import {NetworkHandlerHelper} from "@/utility/helper/NetworkHandlerHelper";

const ApiClient = (others: GetThunkAPI<ThunkApiConfig>, isAuthorization: boolean= true) => {
    const store = (others.getState() as RootState)
    const authState = store.auth

    //todo axiosInstance
    const axiosInstance = axios.create({
        baseURL: appConfig.baseUrlDev,
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    })

    //interceptors request
    axiosInstance.interceptors.request.use(function (config: any) {
        console.log(config.baseURL);
        if (isAuthorization){
            config.headers.Authorization =  `${authState?.token}`
        }

        console.log("Headers ===> ", config.headers)
        console.log("Url ===> ", config.baseURL! + config.url!)
        console.log("Request ===> ", config.data)

        if (config.method === 'post' || config.method === 'put') {
            config.onUploadProgress = (progressEvent: { loaded: number; total: number; }) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload progress: ${percentCompleted}%`);
            };
        }

        if (config.method === 'get' && config.responseType === 'blob') {
            config.onDownloadProgress = (progressEvent: { loaded: number; total: number; }) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Download progress: ${percentCompleted}%`);
            };
        }

        return config;
    }, function (error) {
        console.log("Request Error ===> ",error.response.data)
        return Promise.reject(error);
    });

    //interceptors response
    axiosInstance.interceptors.response.use((response:  any)=>{
        console.log("Response ===> ",response.data)

        if (response.data?.responseMessage?.includes("JWT")){
            return null
        }

        // console.log('response.data', response.data)
        return response
    },(error: { response: { data: any; }; code: any; })=>{
        // console.log("Response Error ===> ",error.response.data)

       const err = NetworkHandlerHelper.handle(error?.code)

        return Promise.reject(err)
    })

    return axiosInstance
}

export const BaseService = {
    apiClient: ApiClient,
}