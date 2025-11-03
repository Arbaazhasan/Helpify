import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../reducers/userAuth.reducer.js'
import generateQrCodeReducer from "../reducers/generateQrCode.reducer.js";

const store = configureStore({
    reducer: {
        userAuthReducer,
        generateQrCodeReducer,
    }
});


export const server = import.meta.env.VITE_SERVER;

export default store;