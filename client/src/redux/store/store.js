import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../reducers/userAuth.reducer.js'
import qrCodeReducer from "../reducers/qrCode.reducer.js";

const store = configureStore({
    reducer: {
        userAuthReducer,
        qrCodeReducer,
    }
});


export const server = import.meta.env.VITE_SERVER;
export const client_url = import.meta.env.VITE_CLIENT_URL;

export default store;