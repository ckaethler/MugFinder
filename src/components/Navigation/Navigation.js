// Top Navigation Component
import React from 'react';
import './Navigation.css';

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
            {navigation_links}
        </nav>
    ); 
}

export default Navigation;