import { Link } from "react-router-dom";
import { useState} from "react";
import './navbar.css';


function SimpleUIElement(){
  const [dataFromSignInFormular, setDataFromFormular] = useState({firstname:"", name:""});
  return(
    <div className="LoginFormula">
      <p>This is not you? Sign in here:</p>
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname"></input> <br></br>
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname"></input> <br></br>
      <button onClick={loginUser("ben", "affleck")}>Sign In!</button>
    </div>
    
  );
}

function loginUser(propfirstname, propname){
  console.log("Button got clicked! User's name:", propfirstname, propname);
}

function Account() {
    const [userData, setUserData] = useState({firstname:"", name: "anonymous", age: 18});

    return (
      <header className="App-header">
          <p>
           Hello {userData.name}!
          </p>
          <SimpleUIElement/>
        </header>
    );
  }
  

  export default Account;