import { Link } from "react-router-dom";
import './navbar.css';
import React, { useEffect, useState } from "react";


function Account(props) {

  const [history, setHistory] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const username = "testuser1"

  useEffect(()=>{
    //fetch meme history
    fetch('http://localhost:3001/users/history' + '?user=' + username)
    .then(res=>res.json()).then(memes => {
      console.log(memes);
      setHistory(memes);
    })
    .catch(err=>console.error(err));

    //fetch saved drafts
    fetch('http://localhost:3001/users/drafts' + '?user=' + username)
    .then(res=>res.json()).then(drafts => {
      console.log(drafts);
      setDrafts(drafts);
    })
    .catch(err=>console.error(err));

  },[])

    return (
      <div className="Account">
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

      <div>
        Created memes: 
      {
        history.map(meme=>{
          return(<img key={meme._id} src={meme.image} width="400"/>)
        })
      }
      </div>            

      <div>
        Saved drafts:
      {
        drafts.map(draft=>{
          return(<button key={draft._id} onClick={e=>{props.setEditorState(prev=>{
            let state = {...draft};
            delete state['creator'];
            delete state['_id'];
            return({...state, user:'testuser1'})
          })}}>
              {draft.title}
            </button>
            )
        })
      }
      </div>   


      </div>
    );
  }
  
  export default Account;