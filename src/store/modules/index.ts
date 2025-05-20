import {combineReducers} from "@reduxjs/toolkit";
import auth from "@/store/modules/auth";
import base from "@/store/modules/base";
import app from "@/store/modules/app";

export const rootReducer = combineReducers({
    auth: auth.reducer,
    base: base.reducer,
    app: app.reducer,
})
