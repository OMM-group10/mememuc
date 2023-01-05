import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import './navbar.css';
import './editor.css';
import Futurama_Meme from './Futurama_Meme.jpeg';

function Editor() {
  return (
    <div className="Editor">
    <header>
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
      </header>
      <body>
      <div className="Editor-header">
        <div className="Templates">
          <p> Templates: </p>
        </div>
        <div className="Canvas">
          <img src={Futurama_Meme}/>
        </div>
        <div className="Params">
          <form>
            <TextField id="outlined-basic" label="Upper Text" variant="outlined" />
            <TextField id="outlined-basic" label="X-Position" variant="outlined" />
            <TextField id="outlined-basic" label="Y-Position" variant="outlined" />
          </form><br></br>

          <form>
            <TextField id="outlined-basic" label="Lower Text" variant="outlined" />
            <TextField id="outlined-basic" label="X-Position" variant="outlined" />
            <TextField id="outlined-basic" label="Y-Position" variant="outlined" />
          </form>
        </div>
        </div> 
      </body>
    </div>
  );
}

export default Editor;