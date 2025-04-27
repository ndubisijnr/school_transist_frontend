import {combineReducers} from "@reduxjs/toolkit";
import auth from "@/src/store/modules/auth";
import base from "@/src/store/modules/base";
import business from "@/src/store/modules/business";

export const rootReducer = combineReducers({
    auth: auth.reducer,
    base: base.reducer,
    business: business.reducer,
})
