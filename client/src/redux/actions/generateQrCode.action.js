import axios from "axios";
import { generateQrCodeFailed, generateQrCodeRequest, generateQrCodeSuccess } from "../reducers/generateQrCode.reducer"
import { server } from "../store/store";
import toast from "react-hot-toast";


export const generateQrCodeAction = async (dispatch, QRCode,
    name,
    message,
    phoneNo,
    secondNo,
    socialMedia,
    otherLink,
) => {

    try {
        dispatch(generateQrCodeRequest());

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