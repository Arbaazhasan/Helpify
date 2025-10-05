import React from 'react';
import './profile.scss'
import { CgProfile } from "react-icons/cg";
import { RiSecurePaymentLine } from "react-icons/ri";

const Profile = () => {
    return (
        <div className='profile-page'>

            <div className="user-profile">
                <div className="profile-information">
                    <p><CgProfile size={"3rem"} /> Profile Information</p>
                </div>

                <div className="user-profile-icon">
                    <div>
                        <img src="user.png" alt="" />
                    </div>
                </div>

                <div className="user-information">
                    <div>
                        <p>Username</p>
                        <h1>Arbaz Hasan</h1>
                    </div>

                    <div>
                        <p>Email</p>
                        <h1>arbaazhasan.@gmail.com</h1>
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
                        <h1>VK-2024-ABCD-EFGH-IJKL-MNOP-QRST-UVWX</h1>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
