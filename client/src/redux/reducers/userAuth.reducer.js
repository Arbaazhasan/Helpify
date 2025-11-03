import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    ownerDetails: null,

}

const userAuthReducer = createSlice({
    name: "userAuthReducer",
    initialState,
    reducers: {

        userLoginRequest: (state, action) => {
            state.status = false;
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
        },
        userLoginSuccess: (state, action) => {
            state.status = true;
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        userLoginFailed: (state, action) => {
            state.status = false;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },


        userLogoutRequest: (state, action) => {
            state.status = false;
            state.loading = true;
            state.error = null;
        },
        userLogoutSuccess: (state, action) => {
            state.status = true;
            state.loading = false;
            state.isAuthenticated = false;
        },
        userLogoutFailed: (state, action) => {
            state.status = false;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },


        userRegisterRequest: (state, action) => {
            state.status = false;
            state.loading = true;
            state.isAuthenticated = false;
            state.error = null;
        },
        userRegisterSuccess: (state, action) => {
            state.status = true;
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        userRegisterFailed: (state, action) => {
            state.status = false;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },


        getUserProfileRequest: (state, action) => {
            state.status = false;
            state.loading = true;
            state.isAuthenticated = false;
        },
        getUserProfileSuccess: (state, action) => {
            state.status = true;
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        getUserProfileFailed: (state, action) => {
            state.status = false;
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        verifyUserWithKeyRequest: (state, action) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        verifyUserWithKeySuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.ownerDetails = action.payload;
        },
        verifyUserWithKeyFailed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }

    }
});

export const {
    userLoginRequest,
    userLoginSuccess,
    userLoginFailed,

    userLogoutRequest,
    userLogoutSuccess,
    userLogoutFailed,

    userRegisterRequest,
    userRegisterSuccess,
    userRegisterFailed,

    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileFailed,

    verifyUserWithKeyRequest,
    verifyUserWithKeySuccess,
    verifyUserWithKeyFailed,

} = userAuthReducer.actions;

export default userAuthReducer.reducer;