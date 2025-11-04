import React, { useEffect } from 'react';
import ProductInformation from '../../components/ProductInformation/ProductInformation';
import { getAllQrCodeInformationAction } from '../../redux/actions/qrCode.action';
import { useDispatch } from 'react-redux';

const History = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getAllQrCodeInformationAction(dispatch);
    }, [])
    return (
        <div>
            <ProductInformation />
        </div>
    );
}

export default History;
