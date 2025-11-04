import axios from "axios";
import { server } from "../store/store";
import toast from "react-hot-toast";
import { generateQrCodeFailed, generateQrCodeRequest, generateQrCodeSuccess, getAllQrCodeInformationFailed, getAllQrCodeInformationRequest, getAllQrCodeInformationSuccess, verifyOwnerwithKeyFailed, verifyOwnerwithKeyRequest, verifyOwnerwithKeySuccess } from "../reducers/qrCode.reducer";


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

        const url = await QRCode.toDataURL(`${server}/qr/getownerdetails/${data?.message?._id}`)

        const qrCodeData = { ...data?.message, url }
        console.log(qrCodeData)

        dispatch(generateQrCodeSuccess(qrCodeData))

        toast.success("Successfully Generate.")

    } catch (error) {
        dispatch(generateQrCodeFailed(error?.response?.data?.message))
    }

}


export const getAllQrCodeInformationAction = async (dispatch) => {


    try {
        dispatch(getAllQrCodeInformationRequest());

        const { data } = await axios.get(`${server}/qr/getallqrcodes`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        dispatch(getAllQrCodeInformationSuccess(data.message));

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

        dispatch(verifyOwnerwithKeySuccess());
        if (data.success)
            toast.success(data.message.message);

    } catch (error) {
        dispatch(verifyOwnerwithKeyFailed(error?.response?.data?.message))
    }

}