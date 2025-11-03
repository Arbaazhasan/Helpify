import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    qrCode: null,

};

export const generateQrCodeReducer = createSlice({
    name: "generateQrCodeReducer",
    initialState,
    reducers: {

        generateQrCodeRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        generateQrCodeSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.qrCode = action.payload;
        },
        generateQrCodeFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }

});

export const {
    generateQrCodeRequest,
    generateQrCodeSuccess,
    generateQrCodeFailed,
} = generateQrCodeReducer.actions;


export default generateQrCodeReducer.reducer;