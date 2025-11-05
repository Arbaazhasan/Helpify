import React, { useEffect, useState } from 'react';
import './verifyProduct.scss'
import { AiOutlineSecurityScan } from "react-icons/ai";
import ProductInformation from '../../components/ProductInformation/ProductInformation';
import { getOwnDetails, verifyOwnerwithKeyAction } from '../../redux/actions/qrCode.action';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const VerifyProduct = () => {

    const dispatch = useDispatch();
    const { getOwnerDetails } = useSelector(state => state.qrCodeReducer);
    const { id } = useParams();

    const [verificationKey, setVerificationKey] = useState('')

    const submitHandler = (e) => {
        e.preventDefault();
        verifyOwnerwithKeyAction(dispatch, id, verificationKey)
    }


    useEffect(() => {
        getOwnDetails(dispatch, id);
    }, [])


    return (
        <div className='Verify-Product-Page'>


            <ProductInformation qrCode={getOwnerDetails} showQRCode={false} />


            <form className="card" onSubmit={submitHandler}>
                <div className="verify-heading">
                    <p><AiOutlineSecurityScan size={"3rem"} /> Verifcation Key</p>
                </div>

                <div className="verification-key">
                    <div>
                        {/* <h1><span>Key: </span></h1> */}
                        <h1>Key:</h1>
                        <input type="text" placeholder='Enter the key' min={4} required onChange={(e) => setVerificationKey(e.target.value)} />
                    </div>
                </div>

                <div className='submit-btn'>
                    <button>Verify</button>
                </div>


            </form>
        </div>
    );
}

export default VerifyProduct;
