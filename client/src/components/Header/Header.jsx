import React, { useEffect } from 'react';
import './header.scss'
import { IoSettingsOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoQrCodeOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { IoQrCodeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useParams } from 'react-router-dom';
import { userLogoutAction } from '../../redux/actions/userAuth.action';

const Header = () => {

    // const { isAuthenticated } = useSelector(state => state.userAuthReducer);

    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.userAuthReducer);
    const path = useLocation();

    const handleLogout = () => {
        userLogoutAction(dispatch);
    };



    return (
        <div className='header'>
            <div className="header-logo">
                <div><IoQrCodeOutline /></div>
                <p>Helpify</p>
            </div>



            {
                isAuthenticated ?

                    <div className="header-options">



                        {
                            path.pathname !== '/' &&
                            <Link to={'/'}>
                                <p><IoQrCodeSharp /></p>
                                <p>Generate QR Code</p>
                            </Link>
                        }

                        <Link to={'/verify/68f9868d03386292107e4644'}>
                            <p><MdOutlineVerified /></p>
                            <p>Verify Key</p>
                        </Link>

                        <Link to={'/history'}>
                            <p><IoDocumentTextOutline /></p>
                            <p>History</p>
                        </Link>

                        {
                            isAuthenticated ?
                                <Link
                                    onClick={handleLogout}
                                    className="button logout"
                                >
                                    <p><IoIosLogOut /></p>
                                    <p>Logout</p>
                                </Link>
                                :
                                <Link>
                                    <p><IoIosLogOut /></p>
                                    <p>Log In</p>
                                </Link>


                        }


                        <Link to={'profile'} className="profile-icon">
                            <div>
                                <img src="/user.png" alt="" />
                            </div>
                        </Link>

                    </div>


                    :


                    <Link to='/login' className="header-options">
                        <div id='header-login-btn'>
                            Login
                        </div>
                    </Link>

            }

        </div >
    );
}

export default Header;
