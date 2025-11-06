import axios from "axios";
import { client_url, server } from "../store/store";
import toast from "react-hot-toast";
import { generateQrCodeFailed, generateQrCodeRequest, generateQrCodeSuccess, getAllQrCodeInformationFailed, getAllQrCodeInformationRequest, getAllQrCodeInformationSuccess, getOwnerDetailsFailed, getOwnerDetailsRequest, getOwnerDetailsSuccess, verifyOwnerwithKeyFailed, verifyOwnerwithKeyRequest, verifyOwnerwithKeySuccess } from "../reducers/qrCode.reducer";


export const generateQrCodeAction = async (dispatch, QRCode,
    name,
    message,
    phoneNo,
    secondNo,
    socialMedia,
    otherLink,
) => {

    try {
        dispatch(generateQrCodeRequest);

        const { data } = await axios.post(`${server}/qr/generateQrCode`, {
            name,
            message,
            primaryContactNumber: phoneNo,
            secondaryContactNumber: secondNo,
            socialMediaLink: socialMedia,
            otherLink,
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        const url = await QRCode.toDataURL(`${client_url}/verify/${data?.message?._id}`)

        const qrCodeData = { ...data?.message, url }

        dispatch(generateQrCodeSuccess(qrCodeData))

        toast.success("Successfully Generate.")

    } catch (error) {
        dispatch(generateQrCodeFailed(error?.response?.data?.message))
    }

}


export const getAllQrCodeInformationAction = async (dispatch, QRCode) => {

    try {
        dispatch(getAllQrCodeInformationRequest());

        const { data } = await axios.get(`${server}/qr/getallqrcodes`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        if (!Array.isArray(data.message)) {
            throw new Error("Invalid response from server");
        }
        const newArray = await Promise.all(
            data.message.map(async (value) => {
                const url = await QRCode.toDataURL(`${client_url}/verify/${value._id}`);
                return { ...value, url };
            })
        );

        dispatch(getAllQrCodeInformationSuccess(newArray));

    } catch (error) {
        dispatch(getAllQrCodeInformationFailed(error?.response?.data?.message))
    }
};



export const verifyOwnerwithKeyAction = async (dispatch, id, key) => {

    try {

        dispatch(verifyOwnerwithKeyRequest())

        const { data } = await axios.post(`${server}/qr/verfiyownerwithkey/${id}`, {
            key
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch(verifyOwnerwithKeySuccess(data.message));
        if (data.success)
            toast.success(data.message.message);

    } catch (error) {
        dispatch(verifyOwnerwithKeyFailed(error?.response?.data?.message))
    }

};



export const getOwnDetails = async (dispatch, id) => {

    try {

        dispatch(getOwnerDetailsRequest());

        const { data } = await axios.get(`${server}/qr/getownerdetails/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        dispatch(getOwnerDetailsSuccess(data.message));


    } catch (error) {
        dispatch(getOwnerDetailsFailed(error?.response?.data?.message))
    }
}


