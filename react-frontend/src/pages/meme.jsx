import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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


function Meme() {

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
      <>
      <header className="App-header">
          <p>
           Hello Singleview! <br/>
          MemeId: {memeId} <br/>
          Title: {memeObject.title} <br/>
          Created by: {memeObject.creator.username}
          </p>
        </header>
        <img src={memeObject.image} alt="Meme" width="800"/>
        </>
    );
  }
  
  export default Meme;