import { Link, useParams, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Filter from "../components/filter";
import SortSelector from "../components/sortSelector";
import Navbar from "../components/navbar";
import './navbar.css';


async function fetchMeme(memeId){

//create URL with meme query parameter
let url = new URL("http://localhost:3001/memes/");
url.search = new URLSearchParams({meme: memeId}).toString();

//for debugging
//console.log(url);

//fetch meme from server and parse json
let memeObject = await fetch(url).then(res => res.json());
//console.log(memeObject);
return memeObject;
}



function Meme(props) {

//used to go to next page
const navigate = useNavigate();

//handle Buttons to display the "next" meme
const handleButton = async e => {
  //base route to navigate to
  let route = '/meme/'

  //parameters to send via url query
  const paramObject = {
    paging: {},
    sortBy: props.sortBy,
    filter: props.filterState
  }

  //create Url for API call
  let url = new URL("http://localhost:3001/memes/all");
  url.search = new URLSearchParams({params: JSON.stringify(paramObject)}).toString();

  //get filtered list of memes
  let memes = await fetch(url).then(res=>res.json());
  
  //if no memes match condition notify user
  if (memes.length===0){
    alert("no meme found!");
    return;
  }

  //index of next meme
  let index = 0;

  //if random select random meme
  if(e.target.name==='random') {
    index = Math.floor(Math.random() * memes.length);
  }

  //if not random find meme in memes array
  for (let i in memes){
    if(memes[i]._id == memeId){
      //current meme is at index i so take next/previous
      if(e.target.name==='next'){ index = (((Number(i)+1)% memes.length + memes.length) %memes.length) }
      if(e.target.name==='previous'){ index = (((Number(i)-1)% memes.length + memes.length) %memes.length) }
      break;
    }

  }


  
  //go to next meme page
  navigate(route + memes[index]._id);
}
  
  const {memeId} = useParams();
  const [memeObject, setMemeObject] = useState();

  useEffect(()=>{
    (async () => {
      const memeObject = await fetchMeme(memeId);
      setMemeObject(memeObject);
    })();

  },[memeId]);


  if(!memeObject) return <div>Loading...</div>;

    return (
      <div className="Meme">
      <Navbar/>
          MemeId: {memeId} <br/>
          Title: {memeObject.title} <br/>
          Created by: {memeObject.creator.username} <br/>
        <button name="next" onClick={handleButton}>Next</button>
        <button name="previous" onClick={handleButton}>Previous</button>
        <button name="random" onClick={handleButton}>Random</button>
        <br/>
        <SortSelector sortBy={props.sortBy} setSortBy={props.setSortBy} />
        <Filter filterState={props.filterState} setFilterState={props.setFilterState} />
        <img src={memeObject.image} alt="Meme" width="800"/>        
      </div>
    );
  }
  
  export default Meme;