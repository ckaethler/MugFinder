// Top Navigation Component
import React from 'react';
import './Navigation.css';
import Logo from './Logo.png';
import AppName from './AppName.png';

const Navigation = ({onRouteChange, isSignedIn}) => {
    let navigation_links;

    const line_divider = <p className="nav-divider">|</p>

    // Handles if user is authenticated
    if (isSignedIn) {
        navigation_links = <div className="nav-links">
            <p
                onClick={() => onRouteChange('home')}
                className="nav-link pointer">
                Home
            </p>
            {line_divider}
            <p
                onClick={() => onRouteChange('account')}
                className="nav-link pointer">
                My Account
            </p>
            {line_divider}
            <p 
                onClick={() => onRouteChange('signout')}
                className="nav-link pointer">
                Sign Out
            </p>
        </div>
        

    // Handles if user isn't authenticated
    } else {
        navigation_links = <div className="nav-links">
            {/* Create Account */}
            <p 
                onClick={() => onRouteChange('register')}
                className="nav-link pointer">
                Create Account
            </p>
            {line_divider}
            {/* Sign In */}
            <p
                onClick={() => onRouteChange('signin')}
                className="nav-link pointer">
                Sign In
            </p>
        </div>
    }

    return(
        // Creates top navigation
        <nav className="top-nav">
            {/* Logo and Name */}
            <div 
                // onClick={() => onRouteChange('home')}
                className="full-logo pointer" >
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