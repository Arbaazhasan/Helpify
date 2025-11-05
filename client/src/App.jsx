import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import QrCodeGenerater from './components/QrCodeGenerater/QrCodeGenerater';
import GenerateQrCode from './Pages/GenerateQrCode/GenerateQrCode';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import VerifyProduct from './Pages/VerifyProduct/VerifyProduct';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { getUserProfileAction } from './redux/actions/userAuth.action';
import History from './Pages/History/History';






const App = () => {

  const dispatch = useDispatch();
  const { isAuthenticated, error: userAuthError, loading: userAuthLoading } = useSelector(state => state.userAuthReducer)
  const { error: generateQrCodeError, loading: generateQrCodeLoading } = useSelector(state => state.qrCodeReducer)

  useEffect(() => {
    getUserProfileAction(dispatch);

  }, [dispatch]);

  useEffect(() => {
    if (userAuthError)
      toast.error(userAuthError);

    if (generateQrCodeError)
      toast.error(generateQrCodeError);
  }, [userAuthError, generateQrCodeError])

  return (

    <Router>
      <Toaster />

      {
        generateQrCodeLoading || userAuthLoading && <Loading />
      }

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />


        <Route path='/login' element={
          isAuthenticated ? <Navigate to="/" /> : <Login />
        } />

        <Route path="/profile"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated} >
              <Profile />
            </ProtectedRoutes>
          }
        />

        <Route path="/verify/:id"
          element={
            <VerifyProduct />
          }
        />

        <Route path="/history"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated} >
              <History />
            </ProtectedRoutes>
          }
        />

      </Routes>

    </Router>

  );
}

export default App;
