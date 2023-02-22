import { Link } from "react-router-dom";
import './navbar.css';

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
    fetch(url, {
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
           Hello Documentation!
          </p>
          <button onClick={populateDb}>
        "Click to fill DB with random memes"
          </button>
        </header>
      </div>
    );
  }
  
  export {createMeme};
  export default Documentation;