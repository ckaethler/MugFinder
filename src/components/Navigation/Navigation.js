// Top Navigation Component
import React from 'react';
import './Navigation.css';
import Logo from './Logo.png';
import AppName from './AppName.png';
import NavLinks from './NavLinks';

const Navigation = ({onRouteChange, isSignedIn, currentRoute, routes}) => {
    return(
        // Creates top navigation
        <nav className="top-nav">
            {/* Logo and Name */}
            <div 
                onClick={() => onRouteChange('home')}
                className="full-logo pointer">
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
            <NavLinks 
                currentRoute={currentRoute} 
                isSignedIn ={isSignedIn} 
                onRouteChange={onRouteChange}
                routes={routes} />
        </nav>
    ); 
}

export default Navigation;