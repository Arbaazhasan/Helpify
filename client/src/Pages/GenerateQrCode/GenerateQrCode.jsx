import React, { useEffect, useState } from 'react';
import './generateQrCode.scss'
import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import QRCode from "qrcode"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { generateQrCodeAction } from '../../redux/actions/qrCode.action';
import { qrCodeValidationSchema } from '../../validation/QrCodeValidationSchema';
import toast from 'react-hot-toast';
import { client_url, server } from '../../redux/store/store';
// import QRCode from "react-qr-code";

const GenerateQrCode = () => {

    const dispatch = useDispatch();
    const { isAuthenticated, } = useSelector(state => state.userAuthReducer);
    const { qrCode } = useSelector(state => state.qrCodeReducer);

    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNo, setPhoneNo] = useState();
    const [secondNo, setSecondNo] = useState();
    const [socialMedia, setSocialMedia] = useState("");
    const [otherLink, setOtherLink] = useState("");
    const [dataURL, setDataURL] = useState("");

    useEffect(() => {

    }, [qrCode])


    const generateQrCode = async (e) => {
        e.preventDefault();

        const { error } = qrCodeValidationSchema.validate({ name, message, phoneNo, secondNo, socialMedia, otherLink })

        if (error) return toast.error(error.details[0].message);

        generateQrCodeAction(dispatch, QRCode, name, message, phoneNo, secondNo, socialMedia, otherLink);



    }


    return (
        <div className='GenerateQrCode'>

            {
                !isAuthenticated &&

                <Link to={'/login'} className='login-banner-btn'>
                    <p>
                        Login to Generate Qr Code
                    </p>
                </Link>

            }


            <div className="productInformation">

                <h2><p><BsBoxSeam /></p>Product Information</h2>

                <form action="" onSubmit={generateQrCode}>

                    <div>
                        <label htmlFor=""><div></div> Name</label>
                        <input type="text" placeholder='Enter the name' onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor=""><div></div> Message</label>
                        <input type="text" placeholder='Message' onChange={(e) => setMessage(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor=""><div></div> Primary Contact Number</label>
                        <input type="tel" pattern='[0-9]{10}' maxLength={10} minLength={10} title='Please enter numbers only' placeholder='+91 9058714187' onChange={(e) => setPhoneNo(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor=""><div></div> Secondary Contact Number</label>
                        <input type="tel" pattern='[0-9]{10}' maxLength={10} minLength={10} placeholder='+91 7906427187' onChange={(e) => setSecondNo(e.target.value)} />

                    </div>

                    <div>
                        <label htmlFor=""><div></div> Social Media Link</label>
                        <input type="text" placeholder='Social Media Link' onChange={(e) => setSocialMedia(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor=""><div></div> Other Link</label>
                        <input type="text" placeholder='Other Link' onChange={(e) => setOtherLink(e.target.value)} />
                    </div>

                    <div id='generate-qr-code-btn'>
                        <button>Generate Qr Code</button>
                    </div>
                </form>




     
            </div>  <div className="qr-code-generator">

                <h2><p><IoQrCodeOutline /></p>Product Information</h2>


                {
                    qrCode?.url ?
                        <div className="qrCode">
                            <img src={`${client_url}/verify/${qrCode._id}`} alt="" />
                            <img src={qrCode?.url} alt="" />

                        </div>

                        :

                        <div className="qr-icon">
                            <IoQrCodeOutline />
                            {/* <img src={dataURL} alt="" /> */}

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
                    qrCode?.url ?

                        <a onClick={() => console.log("cick")} href={qrCode?.url} download="qrcode.png" className='qr-download-btn'>
                            <button> <FaDownload /> Download QR Code</button>
                        </a>
                        :
                        <div className='qr-download-btn'>
                            <button> <FaDownload /> Download QR Code</button>
                        </div>
                }

            </div>

        </div>
    );
}

export default GenerateQrCode;
