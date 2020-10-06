import React from 'react';
import './Navigation.css';

const NavLinks = ({isSignedIn, currentRoute, onRouteChange, routes}) => {
    // navigation link button classes
    const inactive_nav_class = "nav-link pointer";
    const active_nav_class = "nav-link pointer active-nav";
    let classes = '', routesArr=[], divider='';
    
    // Determines what array of routes to display
    if (isSignedIn) routesArr = routes.Auth;
    else routesArr = routes.NoAuth;

    return (
        <div className="nav-links">
            {/* returns links */}
            {routesArr.map((route, index) => {
                // determines nav link classes 
                if (route.name === currentRoute) classes = active_nav_class;
                else classes = inactive_nav_class;
                if (index === (routesArr.length - 1)) {
                    divider = <p key={index + 10} className="nav-divider"></p>
                } else {
                    divider = <p key={index + 10} className="nav-divider">|</p>
                }
                // returns links as paragraph tag with divider
                return <>
                        <p
                            key={index}
                            id={route.name}
                            onClick={() => onRouteChange(route.name)}
                            className={classes}>
                            {route.display}
                        </p>
                        {divider}
                    </>
            })}
        </div>
    )
}

export default NavLinks;