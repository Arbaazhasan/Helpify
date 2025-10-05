import React from 'react';
import './login.scss'
import { useAuth0 } from "@auth0/auth0-react";
import { IoQrCodeOutline } from "react-icons/io5";


const Login = () => {

  const { isAuthenticated, user, loginWithPopup, logout } = useAuth0();

  return (
    <div className='login-page'>

      <div className="card">

        <div className="header-logo">
          <div><IoQrCodeOutline /></div>
          {/* <p>Helpify</p> */}
        </div>



        <div className='heading'>
          <h1>Welcome to Helpify</h1>
          <p>
            Sign up to access your Helpfi dashboard
          </p>
        </div>
        <div className="login-btn">
          <button onClick={() => loginWithPopup()}> <p>Login</p></button>
        </div>
      </div>
    </div>
  );
}

export default Login;
