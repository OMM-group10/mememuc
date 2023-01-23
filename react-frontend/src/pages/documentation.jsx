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
  function createMeme(memeObject){

    fetch("http://localhost:3001/memes/create", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
  
      
      body: JSON.stringify(memeObject)
    })
    .then(res => res.json())
    .then(resJson => console.log("Success", resJson))
    .catch(err => console.error("Error", err));
    
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
  
    let templates = ["63cd323abe14fa6cc82dd828", "63ad7ad8b217ecc90763ce54", "63ace64e4ebb5fef51bc854e"]
  
    let memeObject = {captions: []};
  
    //title
    memeObject.title = makeid(8);
    //user
    memeObject.user = "testuser" + String(Math.floor(Math.random()*3));
    //template
    memeObject.template = templates[Math.floor(Math.random()*100)%3];
  
    //captions
    memeObject.captions[0] = {
      "x_position": Math.random(),
      "y_position": Math.random(),
      "text": makeid(Math.floor(Math.random()*10)),
      "font_size": (Math.floor(Math.random()*10)+5),
      color: "black"
    };
  
    memeObject.captions[1] = {
      "x_position": Math.random(),
      "y_position": Math.random(),
      "text": makeid(Math.floor(Math.random()*10)),
      "font_size": (Math.floor(Math.random()*10)+5),
      color: "white"
  
    };
  
    return memeObject;
  
  }
                      
     //Populates db with random meme content
    //console.log("Random meme test", randomMeme());
    //createMeme(randomMeme());
/*     for (let i = 0; i < 10; i++) {
      createMeme(randomMeme());

    }
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
        </header>
      </div>
    );
  }
  
  export default Documentation;