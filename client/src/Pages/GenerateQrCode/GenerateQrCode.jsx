import React, { useEffect, useState } from 'react';
import './generateQrCode.scss'
import { BsFillBoxSeamFill } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
import QRCode from "qrcode"

const GenerateQrCode = () => {


    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [phoneNo, setPhoneNo] = useState();
    const [secondNo, setSecondNo] = useState();
    const [socialMedia, setSocialMedia] = useState("");
    const [otherLink, setOtherLink] = useState("");
    const [dataURL, setDataURL] = useState("");


    useEffect(() => {


    }, [])


    const generateQrCode = (e) => {
        e.preventDefault();

        QRCode.toDataURL("https://www.linkedin.com/").then((value) => {
            console.log(value)
            setDataURL(value)
        }).catch((e) => {
            console.log(e)
        })


    }


    return (
        <div className='GenerateQrCode'>

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
                    dataURL ?
                        <div className="qrCode">
                            <img src={dataURL} alt="" />
                        </div>

                        :

                        <div className="qr-icon">
                            <IoQrCodeOutline />
                        </div>

                }



                <div className="qr-details">
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>Arbaz</td>
                            </tr>
                            <tr>
                                <th>Message</th>
                                <td>Lorem ipsum dolor sit amet consectetur adipisicing.</td>
                            </tr>
                            <tr>
                                <th>Contact Number</th>
                                <td>+91 9058714187</td>
                            </tr>
                            <tr>
                                <th>Secondary Number</th>
                                <td>+91 9058714187</td>
                            </tr>
                            <tr>
                                <th>Social Media</th>
                                <td>https://www.instagram.com/lord_arbaz</td>
                            </tr>
                            <tr>
                                <th>Other</th>
                                <td>https://www.github.com/Arbazhasan</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {
                    dataURL ?

                        <a href={dataURL} download="qrcode.png" className='qr-download-btn'>
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
