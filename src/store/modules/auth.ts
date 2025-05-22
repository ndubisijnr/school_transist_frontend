import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CaseAsyncActionHelper} from "@/utility/helper/CaseAsyncActionHelper";
import {LoginResponse} from "@/model/response/auth/LoginResponse";
import {AuthService} from "@/service/AuthService";
import {LoginRequestType, RegisterRequestType} from "@/model/request/auth/LoginRequest";

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
    register: CaseAsyncActionHelper.createThunk<RegisterRequestType>("auth/register", AuthService.register),
    logout: CaseAsyncActionHelper.createThunk("auth/logout", async () => {
        // You can add API calls here if needed (like token invalidation on server)
        return { success: true };
    }),
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
    logout: (state) => {
            return initialState;
        },
    },
    extraReducers:(builder)=>{

        CaseAsyncActionHelper.createAsyncReducer<AuthState, LoginResponse>(actions.login, {
            stateProps: [
                {stateProp: "token", responseKey:"token"},
                {stateProp: "userDetails", responseKey:'data'},
            ]
        })(builder)
        CaseAsyncActionHelper.createAsyncReducer<AuthState>(actions.register, {})(builder)
        // Handle the logout action if you're using the thunk version
        builder.addCase(actions.logout.fulfilled, (state) => {
            return initialState;
        });
    }
})

export default {
    reducer: slice.reducer,
    action: actions,
    mutation: slice.actions,
}

export type AuthActions = typeof actions

