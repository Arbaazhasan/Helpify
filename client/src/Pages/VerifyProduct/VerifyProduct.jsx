import React from 'react';
import './verifyProduct.scss'
import { AiOutlineSecurityScan } from "react-icons/ai";

const VerifyProduct = () => {
    return (
        <div className='Verify-Product-Page'>
            

            <form className="card">
                <div className="verify-heading">
                    <p><AiOutlineSecurityScan size={"3rem"} /> Verifcation Key</p>
                </div>

                <div className="verification-key">
                    <div>
                        {/* <h1><span>Key: </span></h1> */}
                        <h1>Key:</h1>
                        <input type="text" placeholder='Enter the key' required />
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
