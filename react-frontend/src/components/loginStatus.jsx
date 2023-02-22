import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const LoginStatus = (props) => {

    let username = window.localStorage.getItem('userName');
    if(!window.localStorage.getItem('authToken') || !username){return(<Link to="/login" className="link">Login</Link>)}

    return(<div>Logged in as {username}</div>);
}

export default LoginStatus