import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {ThunkApiConfig} from "@/utility/type/StoreType";
import { BaseService } from "./BaseService"
import { businessLookupRequestType } from "@/model/request/business/BusinessRequest";


export class BusinessService {
    static businessLookup(other: GetThunkAPI<ThunkApiConfig>, data?:businessLookupRequestType) {
        return BaseService.businessClient(other).post('lookup', data)
    }

    static initializePayment(other: GetThunkAPI<ThunkApiConfig>, data?:businessLookupRequestType) {
        return BaseService.businessClient(other).post('initialize_payment', data)
    }

    static verifyPayment(other: GetThunkAPI<ThunkApiConfig>, data?:businessLookupRequestType) {
        return BaseService.businessClient(other).post('verify_payment', data)
    }

    static updatePayment(other: GetThunkAPI<ThunkApiConfig>, data?:businessLookupRequestType) {
        return BaseService.businessClient(other).post(`update_payment?session_code=${data}`)
    }

    static getInitializePayment(other: GetThunkAPI<ThunkApiConfig>) {
        return BaseService.businessClient(other).get('initialize_payment')
    }

}
