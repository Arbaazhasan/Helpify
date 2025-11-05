import React, { useEffect } from 'react';
import "./history.scss"
import ProductInformation from '../../components/ProductInformation/ProductInformation';
import { getAllQrCodeInformationAction } from '../../redux/actions/qrCode.action';
import { useDispatch, useSelector } from 'react-redux';

const History = () => {

    const dispatch = useDispatch();
    const { qrCodeArray } = useSelector(state => state.qrCodeReducer)
    useEffect(() => {
        getAllQrCodeInformationAction(dispatch);
    }, [])
    return (
        <div className='history'>
            {
                qrCodeArray.map((qrCode, index) => (<ProductInformation qrCode={qrCode} index={index} showQRCode={true} />))
            }
        </div>
    );
}

export default History;
