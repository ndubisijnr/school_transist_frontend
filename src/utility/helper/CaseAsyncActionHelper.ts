// import {createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
// import {ThunkApiConfig} from "@/utility/type/StoreType";
//
// type BaseResponse = {
//     responseCode: string;
//     token?: string;
//     [key: string]: any;
// };
//
// type StatePropertyMapping<TState, TResponse> = {
//     stateProp: keyof TState;
//     responseKey?: keyof TResponse | undefined; // Made optional
// };
//
// type LoadingState = {
//     loading?: boolean;
//     [key: string]: any;
// };
//
// export class CaseAsyncActionHelper {
//     static createReducer = <TState extends LoadingState, TPayload = any>(
//         stateProp: keyof TState
//     ) => {
//         return (state: TState, action: PayloadAction<TPayload>) => {
//             state[stateProp] = action.payload as any;
//         };
//     };
//
//     static createReducers = <TState extends LoadingState>() => {
//         return <T extends Record<string, keyof TState>>(reducers: T) => {
//             const result: Record<keyof T, (state: TState, action: PayloadAction<any>) => void> = {} as any;
//
//             Object.entries(reducers).forEach(([key, stateProp]) => {
//                 result[key as keyof T] = CaseAsyncActionHelper.createReducer<TState>(stateProp as keyof TState);
//             });
//
//             return result;
//         };
//     };
//
//     static createAsyncReducer = <TState extends { loading?: boolean }, TResponse extends BaseResponse>(
//         actionCreator: any,
//         options?: {
//             pending?: (state: TState, action: PayloadAction<undefined>) => void;
//             fulfilled?: (state: TState, action: PayloadAction<TResponse>) => void;
//             rejected?: (state: TState, action: PayloadAction<any>) => void;
//             stateProps?: StatePropertyMapping<TState, TResponse>[];
//             // customHandler?: (state: TState, response: TResponse) => void;
//             loadingProps?: Array<keyof Pick<TState, { [K in keyof TState]: TState[K] extends boolean | undefined ? K : never }[keyof TState]>>;
//         }
//     ) => {
//         return (builder: any) => {
//             builder
//                 .addCase(actionCreator.pending, (state: TState, action: PayloadAction<undefined>) => {
//                     if (options?.loadingProps && options?.loadingProps.length > 0) {
//                         options.loadingProps.forEach(loadingProp => {
//                             (state[loadingProp] as boolean) = true;
//                         });
//                     } else {
//                         (state.loading as boolean) = true;
//                     }
//
//                     if (options?.pending) {
//                         options.pending(state, action);
//                     }
//                 })
//                 .addCase(actionCreator.fulfilled, (state: TState, action: PayloadAction<TResponse>) => {
//                     state.loading = false;
//                     const response = action.payload;
//
//                     ////console.log("lllllllll")
//
//                     if (options?.loadingProps && options?.loadingProps.length > 0) {
//                         options.loadingProps.forEach(loadingProp => {
//                             (state[loadingProp] as boolean) = false;
//                         });
//                     }
//
//                     if (response?.responseCode && response.responseCode === "00") {
//                         if (options?.stateProps) {
//                             options.stateProps.forEach(mapping => {
//                                 (state[mapping.stateProp] as any) = mapping.responseKey
//                                     ? response[mapping.responseKey]
//                                     : response;
//                             });
//                         }
//                     }
//
//                     if (options?.fulfilled) {
//                         options?.fulfilled(state, action);
//                     }
//                 })
//                 .addCase(actionCreator.rejected, (state: TState, action: PayloadAction<any>) => {
//                     if (options?.loadingProps && options?.loadingProps.length > 0) {
//                         options.loadingProps.forEach(loadingProp => {
//                             (state[loadingProp] as boolean) = false;
//                         });
//                     } else {
//                         (state.loading as boolean) = false;
//                     }
//
//                     if (options?.rejected) {
//                         options.rejected(state, action);
//                     }
//                 });
//         };
//     };
//
//     static createThunk = <PayloadType = void, ResponseType = any>(
//         key: string,
//         serviceMethod: (thunkAPI: ThunkApiConfig | any, payload?: PayloadType | any) => Promise<{ data: ResponseType }>,
//         customErrorHandler?: (error: any, thunkAPI: any) => any
//     ) => {
//         return createAsyncThunk(
//             `${key}`,
//             async (payload: PayloadType, thunkAPI) => {
//                 try {
//                     const response = await serviceMethod(thunkAPI, payload)
//                     return response.data
//                 } catch (error: any) {
//                     if (customErrorHandler) {
//                         return customErrorHandler(error, thunkAPI)
//                     }
//                     return thunkAPI.rejectWithValue(error.message)
//                 }
//             }
//         )
//     }
// }

import {createAsyncThunk, PayloadAction, ActionReducerMapBuilder, AsyncThunk} from "@reduxjs/toolkit";
import {ThunkApiConfig} from "@/utility/type/StoreType";

type BaseResponse = {
    responseCode?: string;
    token?: string;
    [key: string]: any;
};

type StatePropertyMapping<TState, TResponse> = {
    stateProp: keyof TState;
    responseKey?: keyof TResponse | undefined;
    transform?: (value: any) => any; // Added transformer function
};

type LoadingState = {
    loading?: boolean;
    [key: string]: any;
};

export class CaseAsyncActionHelper {
    static createReducer = <TState extends LoadingState, TPayload = any>(
        stateProp: keyof TState
    ) => {
        return (state: TState, action: PayloadAction<TPayload>) => {
            state[stateProp] = action.payload as any;
        };
    };

    static createReducers = <TState extends LoadingState>() => {
        return <T extends Record<string, keyof TState>>(reducers: T) => {
            const result: Record<keyof T, (state: TState, action: PayloadAction<any>) => void> = {} as any;

            Object.entries(reducers).forEach(([key, stateProp]) => {
                result[key as keyof T] = CaseAsyncActionHelper.createReducer<TState>(stateProp as keyof TState);
            });

            return result;
        };
    };

    static createAsyncReducer = <TState extends LoadingState, TResponse extends BaseResponse>(
        actionCreator: AsyncThunk<TResponse, any, {}> | any,
        options?: {
            pending?: (state: TState, action: PayloadAction<undefined>) => void;
            fulfilled?: (state: TState, action: PayloadAction<TResponse>) => void;
            rejected?: (state: TState, action: PayloadAction<any>) => void;
            stateProps?: StatePropertyMapping<TState, TResponse>[];
            loadingProps?: Array<keyof TState>;

            // New flexibility options
            isSuccess?: (response: TResponse) => boolean;
            getResponseData?: (response: TResponse) => any;
        }
    ) => {
        return (builder: ActionReducerMapBuilder<TState> | any) => {
            builder
                .addCase(actionCreator.pending, (state: TState, action: PayloadAction<undefined>) => {
                    if (options?.loadingProps && options?.loadingProps.length > 0) {
                        options.loadingProps.forEach(loadingProp => {
                            (state[loadingProp] as boolean) = true;
                        });
                    } else if ('loading' in state) {
                        state.loading = true;
                    }

                    if (options?.pending) {
                        options.pending(state, action);
                    }
                })
                .addCase(actionCreator.fulfilled, (state: TState, action: PayloadAction<TResponse>) => {

                    if (options?.loadingProps && options?.loadingProps.length > 0) {
                        options.loadingProps.forEach(loadingProp => {
                            (state[loadingProp] as boolean) = false;
                        });
                    } else if ('loading' in state) {
                        state.loading = false;
                    }

                    const response = action.payload;

                    // Default success check is for responseCode === "00" (for backward compatibility)
                    // But can be overridden with custom isSuccess function
                    const isSuccess = options?.isSuccess
                        ? options.isSuccess(response)
                        : (response?.responseCode === "00");

                    if (isSuccess && options?.stateProps) {
                        // Get response data - either through custom extractor or use whole response
                        const responseData = options?.getResponseData
                            ? options.getResponseData(response)
                            : response;

                        options.stateProps.forEach(mapping => {
                            let value;

                            if (mapping.responseKey) {
                                value = responseData[mapping.responseKey];
                            } else {
                                value = responseData;
                            }

                            // Apply transformation if provided
                            if (mapping.transform && typeof mapping.transform === 'function') {
                                value = mapping.transform(value);
                            }

                            state[mapping.stateProp] = value;
                        });
                    }

                    if (options?.fulfilled) {
                        options.fulfilled(state, action);
                    }
                })
                .addCase(actionCreator.rejected, (state: TState, action: PayloadAction<any>) => {
                    if (options?.loadingProps && options?.loadingProps.length > 0) {
                        options.loadingProps.forEach(loadingProp => {
                            (state[loadingProp] as boolean) = false;
                        });
                    } else if ('loading' in state) {
                        state.loading = false;
                    }

                    if (options?.rejected) {
                        options.rejected(state, action);
                    }
                });
        };
    };

    static createThunk = <PayloadType = void, ResponseType = any>(
        key: string,
        serviceMethod: (thunkAPI: ThunkApiConfig | any, payload?: PayloadType | any) => Promise<{ data: ResponseType }>,
        customErrorHandler?: (error: any, thunkAPI: any) => any
    ) => {
        return createAsyncThunk(
            `${key}`,
            async (payload: PayloadType, thunkAPI) => {
                try {
                    const response = await serviceMethod(thunkAPI, payload);
                    console.log('serviceMethod',response)
                    return response.data;
                } catch (error: any) {
                    if (customErrorHandler) {
                        return customErrorHandler(error, thunkAPI);
                    }
                    return thunkAPI.rejectWithValue(error.message);
                }
            }
        );
    };
}