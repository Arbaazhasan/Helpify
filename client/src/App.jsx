import React from 'react';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import QrCodeGenerater from './components/QrCodeGenerater/QrCodeGenerater';
import GenerateQrCode from './Pages/GenerateQrCode/GenerateQrCode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import VerifyProduct from './Pages/VerifyProduct/VerifyProduct';



const App = () => {

  return (

    <Router>
      <Header />

      {/* <Loading /> */}

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/verify' element={<VerifyProduct />} />

      </Routes>

    </Router>

  );
}

export default App;
