import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import './navbar.css';
import 'src/Futurama_Meme';

function Editor() {
  return (
    <div className="Editor">
      <ul>
      <li>
          <Link to="/" className="link">Home </Link>
        </li>
        <li>
          <Link to="/editor" className="link">Editor </Link>
        </li>
        <li>
          <Link to="/account" className="link">Account </Link>
        </li>
        <li>
          <Link to="/overview" className="link">Overview </Link>
        </li>
        <li>
          <Link to="/documentation" className="link">Documentation</Link>
        </li>
      </ul>
      <header className="App-header">
        <img src="Futurama_Meme"></img>
        <p> Hello Editor!</p> 
        <input type="text"></input>
        <input type="text"></input>
      </header>
      
    </div>
  );
}

export default Editor;