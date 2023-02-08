import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../components/filter";
import './navbar.css';


async function fetchMeme(memeId){

//create URL with meme query parameter
let url = new URL("http://localhost:3001/memes/");
url.search = new URLSearchParams({meme: memeId}).toString();

//for debugging
console.log(url);

//fetch meme from server and parse json
let memeObject = await fetch(url).then(res => res.json());
console.log(memeObject);
return memeObject;
}


function Meme(props) {

  //get filter information from location.state
  const location = useLocation();
  
  const {memeId} = useParams();
  const [memeObject, setMemeObject] = useState();

  useEffect(()=>{
    (async () => {
      const memeObject = await fetchMeme(memeId);
      setMemeObject(memeObject);
    })();

  },[]);


  if(!memeObject) return <div>Loading...</div>;

    return (
      <div className="Meme">
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
          <p>
           Hello Singleview! <br/>
          MemeId: {memeId} <br/>
          Title: {memeObject.title} <br/>
          Created by: {memeObject.creator.username} <br/>
          Filterstate: {props.filterState.attr}
          </p>
        </header>
        <Filter filterState={props.filterState} setFilterState={props.setFilterState} />
        <img src={memeObject.image} alt="Meme" width="800"/>
      </div>
    );
  }
  
  export default Meme;