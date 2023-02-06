import { useState} from "react";
import { TextField } from "@mui/material";
import handleLogin from './loginHandler';
import './navbar.css';


function loginUser(propfirstname, propname){
  console.log("Button got clicked! User's name:", propfirstname, propname);
}

function Account() {
    const [userData, setUserData] = useState({firstname:"", name: "anonymous", age: 18});
    const [username, setUsername] =useState({username:""});
    const [password, setPassword] =useState({password:""});

    return (
      <header className="App-header">
          <p>
           Hello {userData.name}!
          </p>
          <p>This is not you? Sign in here:</p>
          <form>
          <TextField 
            id="usernameInput"
            label="Username"
            defaultValue=""
            onChange={(user) => {
              setUsername(user.target.value);
            }} />
          </form>
          <form>
          <TextField 
            id="passwordInput"
            label="Password"
            defaultValue=""
            onChange={(pass) => {
              setPassword(pass.target.value);
            }} />
          </form>
          <button onClick={handleLogin}>Sign In!</button>
        </header>
    );
  }
  

  export default Account;