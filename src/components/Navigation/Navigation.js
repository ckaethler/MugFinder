// Top Navigation Component
import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    // Handles if user is authenticated
    if(isSignedIn) {
        return(
            // Creates navigation with only sign out function
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signout')}
                    className='f3 link dim black underline pa3 pointer'>
                    Sign Out
                </p>
            </nav>
        ); 
    // Handles if user isn't authenticated
    } else {
        return ( 
            // Creates nagivation with Sign In and Register routes
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p 
                    onClick={() => onRouteChange('signin')}
                    className='f3 link dim black underline pa3 pointer'>
                    SignIn
                </p>
                <p 
                    onClick={() => onRouteChange('register')}
                    className='f3 link dim black underline pa3 pointer'>
                    Register
                </p>
            </nav>
        );
    }
}

export default Navigation;