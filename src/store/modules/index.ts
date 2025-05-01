import {combineReducers} from "@reduxjs/toolkit";
import auth from "@/store/modules/auth";
import base from "@/store/modules/base";
import business from "@/store/modules/business";

export const rootReducer = combineReducers({
    auth: auth.reducer,
    base: base.reducer,
    business: business.reducer,
})
