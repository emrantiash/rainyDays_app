import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import loginReducer from './slices/loginSlice';
import orderReducer from './slices/orderSlice';
import storeReducer from './slices/storeSlice';
import deliveryReducer from './slices/deliverySlice';



import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage: AsyncStorage
}

const reducer = combineReducers({
    loginReducer: loginReducer,
    orderReducer: orderReducer,
    storeReducer: storeReducer,
    deliveryReducer : deliveryReducer

});

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }),
}); 