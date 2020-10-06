import React from 'react';
import './Navigation.css';

const NavLinks = ({isSignedIn, currentRoute, onRouteChange, routes}) => {
    const inactive_nav_class = "nav-link pointer";
    const active_nav_class = "nav-link pointer active-nav";
    let divider = <p className="nav-divider">|</p>
    let classes = '', routesArr=[];
    
    if (isSignedIn) routesArr = routes.Auth;
    else routesArr = routes.NoAuth;

    return (
        <div className="nav-links">
            {routesArr.map((route, index) => {
                // console.log(route.name, index);
                if (route.name === currentRoute) classes = active_nav_class;
                else classes = inactive_nav_class;
                if (index === (routesArr.length - 1)) divider = '';
                console.log(route, index);

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