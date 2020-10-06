import React from 'react';
import './Splash.css';

const Splash = ({ onRouteChange }) => {
    return (
        <div className='text-center'>
            <h1>Welcome to <p className="inline font-yellow">MugFinder!</p></h1>
            <p>You give us the <p className="inline bold font-pink">URL</p> of a photo, 
                we’ll show you any faces in it.
            </p>
            <img src="" alt=""/>
            <p 
                onClick={() => onRouteChange('register')} 
                className="pointer italic">
                <p className="bold font-pink inline">Create an account</p> to 
                get started.
            </p>
        </div>
    );
}

export default Splash;