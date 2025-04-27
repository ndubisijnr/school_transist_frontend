import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CaseAsyncActionHelper} from "@/src/utility/helper/CaseAsyncActionHelper";
import {LoginResponse} from "@/src/model/response/auth/LoginResponse";
import {AuthService} from "@/src/service/AuthService";
import {LoginRequestType} from "@/src/model/request/auth/LoginRequest";

export type AuthState = {
    token: string|null,
    deviceId: string|null,
    loading: boolean,
    userDetails?: null,
    location:{} |null
}

const initialState: AuthState  = {
    token: null,
    deviceId: null,
    loading: false,
    userDetails: null,
    location:null
}

const actions = {
    login: CaseAsyncActionHelper.createThunk<LoginRequestType>("auth/login", AuthService.login),
}

const slice = createSlice({
    name: "auth",
    initialState,
    reducers:{
      setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
      },
      setUserLocation:(state, action:any) => {
            state.location = action.payload
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
    },
    },
    extraReducers:(builder)=>{

        CaseAsyncActionHelper.createAsyncReducer<AuthState, LoginResponse>(actions.login, {
            stateProps: [
                {stateProp: "token", responseKey:"token"},
                {stateProp: "userDetails", responseKey:'data'},
            ]
        })(builder)

    }
})

export default {
    reducer: slice.reducer,
    action: actions,
    mutation: slice.actions,
}

export type AuthActions = typeof actions

