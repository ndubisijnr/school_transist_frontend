import {createSlice} from "@reduxjs/toolkit";
import {CaseAsyncActionHelper} from "@/src/utility/helper/CaseAsyncActionHelper";

export type BaseState = {
    firstTime: boolean,
    loading: boolean,
}
const initialState:BaseState  = {
    firstTime: false,
    loading: false,
}

const actions = {}

const slice = createSlice({
    name: "base",
    initialState,
    reducers:{
        ...CaseAsyncActionHelper.createReducers<BaseState>()({
            setFirstTime: "firstTime",
            setLoading: "loading",
        })
    },
    extraReducers:(builder)=>{}
})

export default {
    reducer: slice.reducer,
    action: actions,
    mutation: slice.actions,
}