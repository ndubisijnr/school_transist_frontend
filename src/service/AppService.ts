import {BaseService} from "./BaseService";
import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {ThunkApiConfig} from "@/utility/type/StoreType";
import {LoginRequestType} from "@/model/request/auth/LoginRequest";

export class AppService {
    static readUniversity(other: GetThunkAPI<ThunkApiConfig>) {
        return BaseService.apiClient(other).get('/unis/')
    }

    static readLocationByUniversityId(other: GetThunkAPI<ThunkApiConfig>, data?:number) {
        return BaseService.apiClient(other).get(`/locations/${data}/`)
    }

    static createStudent(other: GetThunkAPI<ThunkApiConfig>, data?: LoginRequestType) {
        return BaseService.apiClient(other).post('/students/', data)
    }

    static readStudentById(other: GetThunkAPI<ThunkApiConfig>, data?:number) {
        return BaseService.apiClient(other).get(`/students/${data}`)
    }

    static createHub(other: GetThunkAPI<ThunkApiConfig>, data?: LoginRequestType) {
        return BaseService.apiClient(other).post('/hubs/', data)
    }

    static readHubById(other: GetThunkAPI<ThunkApiConfig>, data?: number) {
        return BaseService.apiClient(other).post(`/hubs/${data}`)
    }

    static createRide(other: GetThunkAPI<ThunkApiConfig>, data?: LoginRequestType) {
        return BaseService.apiClient(other).post('/rides/', data)
    }

    static updateRide(other: GetThunkAPI<ThunkApiConfig>, data?: {id:data.id, payload:data.payload}) {
        return BaseService.apiClient(other).post(`/rides/${data?.id}`, data?.payload)
    }

    static readRidesById(other: GetThunkAPI<ThunkApiConfig>, data?: number) {
        return BaseService.apiClient(other).post(`/rides/${data}`)
    }

    static readRidesByStudentId(other: GetThunkAPI<ThunkApiConfig>, data?: number) {
        return BaseService.apiClient(other).post(`/rides/student/${data}`)
    }

    static readRidesByHubId(other: GetThunkAPI<ThunkApiConfig>, data?: number) {
        return BaseService.apiClient(other).post(`/rides/hub/${data}`)
    }


}
