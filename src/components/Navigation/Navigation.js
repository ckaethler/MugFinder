// Top Navigation Component
import React from 'react';
import './Navigation.css';
import Logo from './Logo.png';
import AppName from './AppName.png';

const Navigation = ({onRouteChange, isSignedIn}) => {
    let navigation_links;

    // Handles if user is authenticated
    if (isSignedIn) {
        navigation_links = <p 
            onClick={() => onRouteChange('signout')}
            className=''>
            Sign Out
        </p>

    // Handles if user isn't authenticated
    } else {
        navigation_links = 
        <div>
            <p
                onClick={() => onRouteChange('signin')}
                className='pointer'>
                Sign In
            </p>
            <p 
                onClick={() => onRouteChange('register')}
                className='pointer'>
                Register
            </p>
        </div>
    }

    return(
        // Creates top navigation
        <nav className="top-nav">
            {/* Logo and Name */}
            <div className="full-logo pointer" onClick={() => onRouteChange('home')}>
                <img 
                    className="logo"
                    src={Logo} 
                    alt="Logo" 
                    width="56px" 
                    height="56px" />
                <img
                    className="app-name"
                    src={AppName} 
                    alt="MugFinder" />
            </div>

            {/* Right side nagivation links */}
            {navigation_links}
        </nav>
    ); 
}

export default Navigation;