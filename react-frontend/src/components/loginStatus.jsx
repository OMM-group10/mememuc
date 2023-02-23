import React, { useState, useEffect } from "react";
import { logout } from "../pages/login";
import { Link } from "react-router-dom";


const LoginStatus = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        if(window.localStorage.getItem('authToken') && window.localStorage.getItem('userName')){
            setLoggedIn(true);
        }
    },[loggedIn]);

    
    if(!loggedIn){return(<Link to="/login" className="link">Login</Link>)}
    else{
    return(<Link to="/" onClick={e=>{
        logout();
        setLoggedIn(false);
    }} className="link">Log Out</Link>);
    }
}

export default LoginStatus