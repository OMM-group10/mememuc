import { useState} from "react";
import { TextField, Button } from "@mui/material";
import handleLogin from './loginHandler';
import './navbar.css';




function Account() {
    const [userData, setUserData] = useState("anonymous");
    const [username, setUsername] = useState({username:""});
    const [password, setPassword] = useState({password:""});

    const loginUser = () => {
      console.log("Button got clicked! User's name:", username);
      handleLogin(username, password);
      setUserData(username);
    }

    return (
      <header className="App-header">
          <p>
           Hello {userData}!
          </p>
          <p>This is not you? Sign in here:</p>
          <form>
          <TextField 
            id="usernameInput"
            label="Username"
            defaultValue=""
            margin="normal"
            onChange={(user) => {
              setUsername(user.target.value);
            }} />
          </form>
          <form>
          <TextField 
            id="passwordInput"
            label="Password"
            defaultValue=""
            margin="normal"
            onChange={(pass) => {
              setPassword(pass.target.value);
            }} />
          </form>
          <Button variant="contained" margin="normal" onClick={loginUser}>Sign In!</Button>
        </header>
    );
  }
  

  export default Account;