import {BaseService} from "./BaseService";
import {GetThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {ThunkApiConfig} from "@/utility/type/StoreType";
import {LoginRequestType} from "@/model/request/auth/LoginRequest";

export class AuthService {
    static login(other: GetThunkAPI<ThunkApiConfig>, data?: LoginRequestType) {
        return BaseService.apiClient(other).post('authenticate-user', data)
    }

}
