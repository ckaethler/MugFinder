import React from 'react';
import './Splash.css';
import heroImg from './heroIMG.png';

const Splash = ({ onRouteChange, isSignedIn }) => {
    let createAccountBtn='';
    if (!isSignedIn) {
        createAccountBtn = <div
                onClick={() => onRouteChange('register')} 
                className="pointer italic">
                <p className="bold font-pink inline">Create an account</p> to 
                get started.
            </div>
    }
    return (
        <div className='text-center'>
            <h1>Welcome to <p className="inline font-yellow">MugFinder!</p></h1>
            <div>You give us the <p className="inline bold font-pink">URL</p> of a photo, 
                we’ll show you any faces in it.
            </div>
            <img 
                src={heroImg} 
                alt=""
                className="shadow-box"
                width="900px"
                height="auto" />
            <p className="subtext-gray">
                <em>Photo by Luis Quintero from Pexels</em>
            </p>
            {createAccountBtn}
        </div>
    );
}

export default Splash;