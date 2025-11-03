import React, { useEffect } from 'react';
import './profile.scss'
import { CgProfile } from "react-icons/cg";
import { RiSecurePaymentLine } from "react-icons/ri";

import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from 'react-redux';


const Profile = () => {
    const { user } = useSelector(state => state.userAuthReducer);

    useEffect(() => {
        console.log(user)
    }, [user])


    return (


        <div className='profile-page'>

            <div className="user-profile">
                <div className="profile-information">
                    <p><CgProfile size={"3rem"} /> Profile Information</p>
                </div>

                {/* <div className="user-profile-icon">
                    <div>
                        <img src={`${user?.picture || "user.png"}`} alt="error" />
                    </div>
                </div> */}

                <div className="user-information">
                    <div>
                        <p>Username</p>
                        <h1>{user?.name}</h1>
                    </div>

                    <div>
                        <p>Email</p>
                        <h1>{user?.email}</h1>
                    </div>
                </div>
            </div>


            <div className="user-profile">
                <div className="profile-information">
                    <p><RiSecurePaymentLine size={"3rem"} /> Verifcation Key</p>
                </div>

                <div className="user-information">
                    <div>
                        <p>Key</p>
                        <h1>{user?.verificationKey}</h1>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
