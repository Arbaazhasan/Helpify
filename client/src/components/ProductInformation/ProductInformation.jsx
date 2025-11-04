import React, { useEffect } from 'react';
import './productInformation.scss'
import { useSelector } from 'react-redux';
import { IoQrCodeOutline } from "react-icons/io5";

import { FaDownload } from "react-icons/fa6";
import QRCode from 'react-qr-code';
import { server } from '../../redux/store/store';


const ProductInformation = ({ qrCode, index, showQRCode }) => {

    const { qrCodeArray } = useSelector(state => state.qrCodeReducer);

    useEffect(() => {
    }, [qrCodeArray]);

    return (
        <div className="product-Information">

            <div className="qr-code-generator" key={index}>

                <h2><p><IoQrCodeOutline /></p>Product Information</h2>

                {
                    showQRCode &&
                    <div className="qrCode">
                        <QRCode
                            id={`qr-${qrCode?._id}`}
                            value={`${server}/qr/verfiyownerwithkey/${qrCode?._id}`}
                            size={150}
                        />
                    </div>
                }


                <div className="qr-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{qrCode?.name}</td>
                            </tr>
                            <tr>
                                <th>Message</th>
                                <td>{qrCode?.message}</td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td> {qrCode?.primaryContactNumber}</td>
                            </tr>
                            <tr>
                                <th>Secondary Number</th>
                                <td> {qrCode?.secondaryContactNumber}</td>
                            </tr>
                            <tr>
                                <th>Social Media</th>
                                <td>{qrCode?.socialMediaLink}</td>
                            </tr>
                            <tr>
                                <th>Other</th>
                                <td>{qrCode?.otherLink}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {

                    showQRCode ?
                        qrCode?.url ?
                            <a onClick={() => console.log("cick")} href={qrCode?.url} download="qrcode.png" className='qr-download-btn'>
                                <button> <FaDownload /> Download QR Code</button>
                            </a>
                            :
                            <div className='qr-download-btn'>
                                <button> <FaDownload /> Download QR Code</button>
                            </div>

                        :
                        ""
                }

            </div>

        </div>


    );
}

export default ProductInformation;
