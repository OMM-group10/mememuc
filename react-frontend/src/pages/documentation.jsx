import { json, Link } from "react-router-dom";
import Navbar from "../components/navbar";
import './documentation.css'
//import './navbar.css';


  //calls fetch with the specified url and options, also attaches authorization header if logged in
  function serverRequest(url, options){
    if(!options.headers) options.headers = {};
    //check for login token
    const token = window.localStorage.getItem('authToken');
    if(token){options.headers['Authorization'] = 'Bearer ' + token}
    return fetch(url, options);
  }

 /* creates a meme by calling the API:
    method: POST request
    URL: http://localhost:3001/memes/create
    Json data

    @param memeObject An object containing the data of the meme to be generated
                      Fields:
                      memeObject = {
                        title,
                        user,
                        template,
                        captions[]
                      } 
 */
  function createMeme(memeObject, draft=false){

    let url = "http://localhost:3001/memes/create";
    if(draft) url = "http://localhost:3001/memes/draft"
    //TODO: Change Back URL
    return(
    serverRequest(url, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  
      
      body: JSON.stringify(memeObject)
    })
    .then(res => res.json())
    .then(resJson =>{
      console.log("Success", resJson);
      return resJson;
      })
    .catch(err => console.error("Error", err)))
    
  }
  
  //random String generator
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  //returns random meme object
  function randomMeme(){
  
    let templates = ["Spongebob", "Boromir", "Doge"]
  
    let memeObject = {captions: []};
  
    //title
    memeObject.title = makeid(8);
    //user
    memeObject.user = "testuser" + String(Math.floor(Math.random()*3));
    //template
    memeObject.template = templates[Math.floor(Math.random()*100)%3];
  
    //captions
    //TODO: Change to camelCase
    memeObject.captions[0] = {
      "xPosition": Math.random(),
      "yPosition": Math.random(),
      "text": makeid(Math.floor(Math.random()*10)),
      "fontSize": (Math.floor(Math.random()*200)+100),
      color: "white"
    };
  
    memeObject.captions[1] = {
      "xPosition": Math.random(),
      "yPosition": Math.random(),
      "text": makeid(Math.floor(Math.random()*10)),
      "fontSize": (Math.floor(Math.random()*200)+100),
      color: "white"
    };
  
    return memeObject;
  
  }
                      

  //creates 5 random memes
  function populateDb(){
    for (let i = 0; i < 5; i++) {
      createMeme(randomMeme());
    }
    
  }


  function testCall(){
    createMeme({
      title:"New Meme",
      template: 'Doge',
      //TODO: change to actual user/annonymous
      captions:[{
        xPosition: 0.5,
        yPosition: 0.2,
        text: "Top Text",
        fontSize: 100,
        color: "white"
      },
      {
        xPosition: 0.5,
        yPosition: 0.8,
        text: "Bottom Text",
        fontSize: 100,
        color: "white"
      }]
    },false).then(res=>{
      let new_page = window.open();
      new_page.document.write(JSON.stringify(res));
    })
  }

  //just to test stuff
/*   createMeme({
    title: "test",
    user: "testuser2",
    template: "Spongebob",
    captions: [{
    "xPosition": 0.5,
    "yPosition": 0.5,
    "text": "ASDF",
    "fontSize": 200,
    "color": "white"},
    {
      "xPosition": 0.5,
      "yPosition": 0.8,
      "text": "ASDF ghjk",
      "fontSize": 200,
      "color": "white"},
    {
      "xPosition": 0.3,
      "yPosition": 0.2,
      "text": "ASDF 3",
      "fontSize": 200,
      "color": "white"}]
  });
 */


function Documentation() {

    return (
      <div className="Documentation">
        <Navbar/>
      
          
          Documentation: <br/>

          <ul className="doc-api">
          Create meme: 
          <li>url: http://localhost:3001/memes/create</li>
          <li>method: post</li>
          <li>content-type: application/json</li>
          <li>body: memeObject</li>
          <li>response: memeDbObject </li>
          <button onClick={testCall}>Example Call </button>
          </ul> 



          <ul className="doc-api">
          Retrieve memes: 
          <li>url: http://localhost:3001/memes</li>
          <li>url search query: meme=memeid</li>
          <li>method: get</li>
          <li>response: memeDbObject</li>
          <button onClick={()=>{window.open("http://localhost:3001/memes?meme=123", "_blank")}}>Example Call: meme=123</button>
          </ul> 


          <code>
            memeDbObject = &#123; <br/>
          _id: Id-String, <br/>
          captions: Array[captionObject], <br/>
          creationDate: Date-String,  <br/>
          creator: Id-String, <br/>
          image: String,  <br/>
          rating: Number, <br/>
          template: String, <br/>
          title: String &#125;  <br/>
          </code>
          <br/>
          <code>
            memeObject = &#123; <br/>
          captions: Array[captionObject], <br/>
          template: String, <br/>
          title: String &#125;  <br/>
          </code>
          <br/>
          <code>
          captionObject = &#123; <br/>
          xPosition: Number, <br/>
          yPosition: Number, <br/>
          text: String, <br/>
          fontSize: Number, <br/>
          color: String &#125;  <br/>
          </code>


          <button onClick={populateDb}>
        "Click to fill DB with random memes"
          </button>
        
      </div>
    );
  }
  
  export {createMeme, serverRequest};
  export default Documentation;