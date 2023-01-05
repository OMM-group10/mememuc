import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import './navbar.css';
import './editor.css';
import Futurama_Meme from './Futurama_Meme.jpeg';
import React, { useState } from "react";

function Editor() {
  const [Caption1, setCaption1] = useState("");
  const [Caption2, setCaption2] = useState("");
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
          <img src={Futurama_Meme} alt="Futurama Meme"/>
          <p className="Caption1">{Caption1} </p><br></br>
          <p className="Caption2">{Caption2} </p>
        </div>
        <div className="Params">
          <form>
            <TextField 
              id="topText"
              label="Upper Text"
              variant="outlined"
              value={Caption1}
              onChange={(top) => {
                  setCaption1(top.target.value);
                }} />
            <TextField id="topX" label="X-Position" variant="outlined" />
            <TextField id="topY" label="Y-Position" variant="outlined" />
          </form><br></br>

          <form>
            <TextField
              id="bottomText"
              label="Lower Text"
              variant="outlined" 
              value={Caption2}
              onChange={(bottom) => {
                  setCaption2(bottom.target.value);
                }} />
            <TextField id="bottomX" label="X-Position" variant="outlined" />
            <TextField id="bottomY" label="Y-Position" variant="outlined" />
          </form>
        </div>
        </div> 
      </body>
    </div>
  );
}

export default Editor;