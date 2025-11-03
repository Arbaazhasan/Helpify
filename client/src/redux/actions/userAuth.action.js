import axios from "axios";
import { ErrorHandler } from "../../utils/errorHandler";
import { server } from "../store/store";
import toast from "react-hot-toast";
import { getUserProfileFailed, getUserProfileRequest, getUserProfileSuccess, userLoginFailed, userLoginRequest, userLoginSuccess, userLogoutFailed, userLogoutRequest, userLogoutSuccess, userRegisterFailed, userRegisterRequest, userRegisterSuccess, verifyUserWithKeyFailed, verifyUserWithKeyRequest, verifyUserWithKeySuccess } from "../reducers/userAuth.reducer";


export const userLoginAction = async (dispatch, email, password) => {

    try {

        dispatch(userLoginRequest());

        if (!email || !password) throw new ErrorHandler("All fields are required", 400);

        const { data } = await axios.post(`${server}/user/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        dispatch(userLoginSuccess());
        toast.success(data.message)

    } catch (error) {
        dispatch(userLoginFailed(error?.response?.data?.message || "Something went wrong!"))
    }
};


export const userLogoutAction = async (dispatch) => {
    try {
        dispatch(userLogoutRequest());

        const { data } = await axios.get(`${server}/user/logout`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch(userLogoutSuccess());
        toast.success(data?.message);

    } catch (error) {
        dispatch(userLogoutFailed(error?.response?.data?.message));
    }

};


export const userRegisterAction = async (dispatch, name, email, password, confirmPassword) => {

    try {
        dispatch(userRegisterRequest);

        const { data } = await axios.post(`${server}/user/register`, {
            name,
            email,
            password,
            confirmPassword
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch(userRegisterSuccess(data?.message));

    } catch (error) {
        dispatch(userRegisterFailed(error?.response?.data?.message));
    };
};


export const getUserProfileAction = async (dispatch) => {

    try {
        dispatch(getUserProfileRequest());

        const { data } = await axios.get(`${server}/user/profile`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        dispatch(getUserProfileSuccess(data.message));
    } catch (error) {
        dispatch(getUserProfileFailed(error?.response?.data?.message))

    };
};


export const verifyUserWithKey = async (dispatch, key, id) => {

    try {
        dispatch(verifyUserWithKeyRequest())

        const { data } = await axios.post(`${server}/qr/verfiyownerwithkey/${id}`, {
            key
        }, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        dispatch(verifyUserWithKeySuccess(data?.message));

    } catch (error) {
        dispatch(verifyUserWithKeyFailed(error?.response?.data?.message))
    }

}