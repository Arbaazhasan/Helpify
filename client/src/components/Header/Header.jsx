import React from 'react';
import './header.scss'
import { IoSettingsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { IoQrCodeSharp } from "react-icons/io5";

const Header = () => {
    return (
        <div className='header'>
            <div className="header-logo">
                <div><IoQrCodeOutline /></div>
                <p>Helpify</p>
            </div>

            <div className="header-options">

                <div>
                    <p><IoQrCodeSharp /></p>
                    <p>Generate QR Code</p>
                </div>
                <div>
                    <p><MdOutlineVerified /></p>
                    <p>Verify Key</p>
                </div>
                <div>
                    <p><IoDocumentTextOutline /></p>
                    <p>History</p>
                </div>
                <div>
                    <p><IoIosLogOut /></p>
                    <p>Logout</p>
                </div>

                <div className="profile-icon">
                    <div>
                        <img src="/user.png" alt="" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Header;
