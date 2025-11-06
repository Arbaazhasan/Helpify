import React, { useEffect } from 'react';
import "./history.scss"
import ProductInformation from '../../components/ProductInformation/ProductInformation';
import { getAllQrCodeInformationAction } from '../../redux/actions/qrCode.action';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from "qrcode"


const History = () => {

    const dispatch = useDispatch();
    const { qrCodeArray } = useSelector(state => state.qrCodeReducer)

    useEffect(() => {
        getAllQrCodeInformationAction(dispatch, QRCode);
    }, [])

    return (
        <div className='history'>
            {
                qrCodeArray.map((qrCode, index) => (<ProductInformation qrCode={qrCode} index={index} showQRCode={true} key={index} />))
            }
        </div>
    );
}

export default History;
