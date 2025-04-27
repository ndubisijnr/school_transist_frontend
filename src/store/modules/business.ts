import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CaseAsyncActionHelper} from "@/src/utility/helper/CaseAsyncActionHelper";
import {BusinessService} from "@/src/service/BusinessService";
import {businessLookupRequestType} from "@/src/model/request/business/BusinessRequest";

export type BusinessState = {
    loading: boolean,
    paymentDetails?: null,

}

const initialState: BusinessState  = {
    loading: false,
    paymentDetails: null,
}

const actions = {
    lookup: CaseAsyncActionHelper.createThunk<businessLookupRequestType>("payment/lookup", BusinessService.businessLookup),
}

const slice = createSlice({
    name: "business",
    initialState,
    reducers:{
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload
    },

        setPaymentDetails: (state,action: PayloadAction<null>) => {
            state.paymentDetails = action.payload
        },
    },
    extraReducers:(builder)=>{

        CaseAsyncActionHelper.createAsyncReducer<BusinessState, any>(actions.lookup, {
            stateProps: [
                {stateProp: "paymentDetails", responseKey:'data'},
            ]
        })(builder)

    }
})

export default {
    reducer: slice.reducer,
    action: actions,
    mutation: slice.actions,
}

export type BusinessActions = typeof actions

