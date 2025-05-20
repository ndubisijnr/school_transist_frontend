import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CaseAsyncActionHelper} from "@/utility/helper/CaseAsyncActionHelper";
import {LoginResponse} from "@/model/response/auth/LoginResponse";
import {AppService} from "@/service/AppService";
import {CreateStudentRequestType, CreateHubRequestType, CreateRideRequestType, ReadLocationsRequestType} from "@/model/request/app/AppRequest";

export type AppState = {
    unis: []|null,
    loading: boolean,
    appTypeUserData:[]|null,
    locations:[]|null,

}

const initialState: AppState  = {
    unis: null,
    loading: false,
    appTypeUserData:null,
    locations:null

}

const actions = {
    readUnis: CaseAsyncActionHelper.createThunk<any>("app/unis", AppService.readUniversity),
    createStudent: CaseAsyncActionHelper.createThunk<CreateStudentRequestType>("app/create-student", AppService.createStudent),
    createHub: CaseAsyncActionHelper.createThunk<CreateHubRequestType>("app/create-hub", AppService.createHub),
    readLocations: CaseAsyncActionHelper.createThunk<ReadLocationsRequestType>("app/locations", AppService.readLocationByUniversityId),
    createRide: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/create-ride", AppService.createRide),
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers:{

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

    },
    extraReducers:(builder)=>{

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readUnis, {
            stateProps: [
                {stateProp: "unis", responseKey:"data"},
            ]
        })(builder)
        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.createStudent, {
            stateProps: [
                {stateProp: "appTypeUserData", responseKey:"data"},
            ]
        })(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.createHub, {
            stateProps: [
                {stateProp: "appTypeUserData", responseKey:"data"},
            ]
        })(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readLocations, {
            stateProps: [
                {stateProp: "locations", responseKey:"data"},
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

