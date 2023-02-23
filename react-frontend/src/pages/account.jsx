import { Link, useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";
import './navbar.css';
import React, { useEffect, useState } from "react";
import { serverRequest } from "./documentation";


function Account(props) {
  //to navigate to other pages
  const navigate = useNavigate();
  //created memes
  const [history, setHistory] = useState([]);
  //created drafts
  const [drafts, setDrafts] = useState([]);
  //TODO: use authentication
  const username = "testuser1"

  
  useEffect(()=>{
    //fetch meme history
    serverRequest('http://localhost:3001/users/history' + '?user=' + username, {})
    .then(res=>res.json()).then(memes => {
      console.log(memes);
      setHistory(memes);
    })
    .catch(err=>console.error(err));

    //fetch saved drafts
    serverRequest('http://localhost:3001/users/drafts' + '?user=' + username, {})
    .then(res=>res.json()).then(drafts => {
      console.log(drafts);
      setDrafts(drafts);
    })
    .catch(err=>console.error(err));

  },[])

    return (
      <div className="Account">
        <Navbar/>
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
          })
          navigate('/editor');
          }}>
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