import React, { useEffect, useState } from 'react';
import "./home.scss"
import GenerateQrCode from '../GenerateQrCode/GenerateQrCode';
import Hero from '../../components/Hero/Hero';

const Home = () => {

    return (
        <div className='home-page'>
            <Hero />
            <GenerateQrCode />

        </div>
    );
}

export default Home;
