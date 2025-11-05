import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    success: false,
    qrCode: null,
    qrCodeArray: [],
    verifiedOwnerInformation: {},
    getOwnerDetails: {}

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
            state.verifiedOwnerInformation = action.payload;
        },
        verifyOwnerwithKeyFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },

        getOwnerDetailsRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        getOwnerDetailsSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.getOwnerDetails = action.payload;
        },
        getOwnerDetailsFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        },


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

    getOwnerDetailsRequest,
    getOwnerDetailsSuccess,
    getOwnerDetailsFailed,

} = qrCodeReducer.actions;


export default qrCodeReducer.reducer;