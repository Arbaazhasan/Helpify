import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    qrCode: null,
    qrCodeArray: [],
    ownerInformation: {},

};

export const qrCodeReducer = createSlice({
    name: "qrCodeReducer",
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
        },

        getAllQrCodeInformationRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        getAllQrCodeInformationSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.qrCodeArray = action.payload;
        },
        getAllQrCodeInformationFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },


        verifyOwnerwithKeyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        verifyOwnerwithKeySuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.ownerInformation = action.payload;
        },
        verifyOwnerwithKeyFailed: (state, action) => {
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

    getAllQrCodeInformationRequest,
    getAllQrCodeInformationSuccess,
    getAllQrCodeInformationFailed,

    verifyOwnerwithKeyRequest,
    verifyOwnerwithKeySuccess,
    verifyOwnerwithKeyFailed,

} = qrCodeReducer.actions;


export default qrCodeReducer.reducer;