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
    currentRide:null,
    studentActivities:null,
    hubActivities:null

}

const initialState: AppState  = {
    unis: null,
    loading: false,
    appTypeUserData:null,
    locations:null,
    currentRide:null,
    studentActivities:null,
    hubActivities:null

}

const actions = {
    readUnis: CaseAsyncActionHelper.createThunk<any>("app/unis", AppService.readUniversity),
    createStudent: CaseAsyncActionHelper.createThunk<CreateStudentRequestType>("app/create-student", AppService.createStudent),
    createHub: CaseAsyncActionHelper.createThunk<CreateHubRequestType>("app/create-hub", AppService.createHub),
    readLocations: CaseAsyncActionHelper.createThunk<ReadLocationsRequestType>("app/locations", AppService.readLocationByUniversityId),
    createRide: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/create-ride", AppService.createRide),
    updateRide: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/update-ride", AppService.updateRide),
    readRideByStudent: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/read-student-ride", AppService.readRidesByStudentId),
    readRideById: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/read-by-id", AppService.readRidesById),
    readRideByHub: CaseAsyncActionHelper.createThunk<CreateRideRequestType>("app/read-hub-ride", AppService.readRidesByHubId),
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers:{

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },

        setCurrentRide:(state, action:PayloadAction<any>) => {
            state.currentRide = action.payload
        }
    },
    extraReducers:(builder)=>{

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readUnis, {
            stateProps: [
                {stateProp: "unis", responseKey:"data"},
            ]
        })(builder)


        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readLocations, {
            stateProps: [
                {stateProp: "locations", responseKey:"data"},
            ]
        })(builder)


        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.createRide, {
            stateProps: [
                {stateProp: "currentRide", responseKey:"data"},
            ]
        })(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readRideById, {
            stateProps: [
                {stateProp: "currentRide", responseKey:"data"},
            ]
        })(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.updateRide, {})(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readRideByStudent, {
            stateProps:[
                {stateProp:"studentActivities", responseKey:"data"}
            ]
        })(builder)

        CaseAsyncActionHelper.createAsyncReducer<AppState, any>(actions.readRideByHub, {
            stateProps:[
                {stateProp:"hubActivities", responseKey:"data"}
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

