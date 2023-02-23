import { Link } from "react-router-dom";
import { serverRequest } from "./documentation";
import React, {useState} from "react";
import Navbar from "../components/navbar";

const logout = ()=>{
  window.localStorage.removeItem('userName');
  window.localStorage.removeItem('authToken');
}

function Login(){

  //state of inputs
  const[state, setState] = useState({username: "", password: ""});

  //handles Login Button
  const loginHandler = async e => {
    e.preventDefault();


    //make login request
    let authToken = await fetch('http://localhost:3001/users/login', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },   
      body: JSON.stringify(state)
    }).then(res=>{if (res.ok) {
      return res.json();
    }
    alert("Wrong user or password");
    throw("Something went wrong")
    })
    .catch(err=>console.log(err));

    //if request successful set local storage items
    if(authToken){
      window.localStorage.setItem('userName', state.username);
      window.localStorage.setItem('authToken', authToken.token);
      //notify user of successful login
      alert("You were logged in");
    }

    //console.log("From Server: ", authToken);
    //console.log(state);
  }
  
  //handle input changes
  const handleChange = e => {
    setState(prev=>{
      prev[e.target.name] = e.target.value;
      return({...prev});
    })
  }

  return (
  <div className="login-page">
    <Navbar/>
    <form onSubmit={loginHandler}>
      <label>Username:
        <input name="username" type="text" value={state.username} onChange={handleChange}/>
      </label>
      <label>Password:
      <input name="password" type="text" value={state.password} onChange={handleChange}/>
      </label>
      <button type="submit">Log in</button>
    </form>
  </div>
  );
};

export {logout};
export default Login;