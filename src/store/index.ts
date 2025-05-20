import {configureStore, ThunkMiddleware} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rootReducer } from "@/store/modules";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// Change to AsyncStorage instead of MMKV
const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Using AsyncStorage directly
    blacklist: ["temp"],
    debug: false,
};

type RootReducerState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducerState>(
    persistConfig,
    rootReducer
);

// Only use middleware checks in production
const isProduction = process.env.NODE_ENV === 'production';

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            // Disable serializable check in development to improve performance
            serializableCheck: isProduction,
            // Disable immutable check in development to improve performance
            immutableCheck: isProduction,
        }).concat(thunk as ThunkMiddleware<RootState>),
    devTools: !isProduction,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

persistor.subscribe(() => {
    const { bootstrapped } = persistor.getState();
    if (bootstrapped) {
        //console.log("Redux store rehydration complete");
    }
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;