import React, { useEffect, useState } from 'react';
import './login.scss'
import { useAuth0 } from "@auth0/auth0-react";
import { IoQrCodeOutline } from "react-icons/io5";
import { userLoginAction, userRegisterAction } from '../../redux/actions/userAuth.action';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';


const Login = () => {

  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.userAuthReducer);

  const [isRegister, setIsRegister] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loginToggleHandler = () => {
    setIsRegister((pre) => !pre);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (isRegister) {
      if (password === confirmPassword) {
        userRegisterAction(dispatch, name, email, password, confirmPassword);
      } else {
        toast.error("Password not matched!");
      }
    } else {
      userLoginAction(dispatch, email, password);
    }
  };


  useEffect(() => {
    // userLoginAction(1, "arbaz@gmail.com", "1234")

    if (confirmPassword.length !== 0)
      if (password === confirmPassword) setIsPasswordMatched(false)
      else setIsPasswordMatched(true);


  }, [password, confirmPassword]);

  return (
    <div className='login-page'>

      <form className="card" onSubmit={submitHandler}>

        <div className="header-logo">
          <div><IoQrCodeOutline /></div>
          {/* <p>Helpify</p> */}
        </div>



        <div className='heading'>
          <h1>Welcome to Helpify</h1>
          <p>
            {isRegister ? "Sing Up" : "Login"} to access your Helpfi dashboard
          </p>
        </div>

        <div className='login-page-userInputs'>

          {
            isRegister &&
            <input type="text" placeholder='name' name='name' maxLength={20} minLength={4} required onChange={(e) => setName(e.target.value)} />
          }

          <input type="email" placeholder='email' maxLength={30} minLength={5} required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' name='password' maxLength={20} minLength={4} required onChange={(e) => setPassword(e.target.value)} />

          {
            isRegister &&
            <input type="password" placeholder='confirm password' maxLength={20} minLength={4} required onChange={(e) => setConfirmPassword(e.target.value)} />
          }

          {
            isPasswordMatched &&
            <p onClick={loginToggleHandler}>
              Password not matched!
            </p>
          }
        </div>

        <div className="login-btn">
          <button type='submit' disabled={loading}>
            <p> {loading ? "Please wait..." : (isRegister ? "Sing Up" : "Login")}</p>
          </button>

          {
            isRegister ?
              <p onClick={loginToggleHandler}>
                Have an account? <span>Login</span>
              </p>
              :
              <p onClick={loginToggleHandler}>
                Don't have an account? <span>Register</span>
              </p>

          }

        </div>

      </form >
    </div >
  );
}

export default Login;
