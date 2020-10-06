import React from 'react';
import './Splash.css';

const Splash = ({ onRouteChange }) => {
    return (
        <div className=''>
            <h1>Welcome to MugFinder!</h1>
            <p>You give us the URL of a photo, 
                we’ll show you any faces in it.
            </p>
            <img src="" />
            <p>
                <p>Create an account</p> to get started.
            </p>
        </div>
    );
}

export default Splash;