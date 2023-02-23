import { Link } from "react-router-dom";
import './navbar.css';
import './editor.css';
import {createMeme} from './documentation'
import CaptionEditor from "../components/captionEditor";
import Navbar from "../components/navbar";
import React, { useEffect, useState, useLayoutEffect } from "react";

//state to recall when reset button is pressed
const defaultState = {
  title:"New Meme",
  template: 'Doge',
  //TODO: change to actual user/annonymous
  user: "testuser1",
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
}


function Editor(props) {

  //map of available Templates
  const [templateMap, setTemplateMap] = useState(new Map());
  //reference to canvas element
  const cnv = React.useRef(null);
  //reference to download link
  const download = React.useRef(null);




  //set template in state
  const templateHandler = template => {
    props.setState(prev=>{
      return({...prev, template: template});
    })
  }

  //create download button
  const createLocally = e => {
    //get current image data of canvas 
    const imageData = cnv.current.toDataURL('png');
    //reference to download button
    const link = download.current;

    //set attributes
    link.setAttribute('download', new Date().toLocaleString() + "_meme");
    link.setAttribute('href', imageData);
    link.setAttribute('style', '');
    //notify user
    alert("Meme was created locally!");
  }

  //create Meme on server and render download button
  const createOnServer = e => {
    //create Meme on server
    createMeme(props.state)
    .then(res=>{
      //set attributes of download button
      const link = download.current;
      link.setAttribute('download', new Date().toLocaleString() + "_meme");
      link.setAttribute('href', res.image);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      link.setAttribute('style', '');
      alert("Meme was created on server!");
    })
  }

  const draftHandler = e => {
    //check if user is logged in
    if(!window.localStorage.getItem('authToken')) alert("Not Logged in!")
    else{
      //if logged in create draft
      createMeme(props.state, true)
    }
  }

  //get available templates, and store them in map
  useEffect(()=>{
    //get meme templates:
    fetch('http://localhost:3001/templates/list')
    .then(res=>res.json()).then(templates=>{
      //console.log(templates);
      let map = new Map();
      //Add to map
      for(let template of templates){
        map.set(template.name, template);
      }
      setTemplateMap(map);

      //for debugging
      //console.log("Map: ", templateMap);
    })
    .catch(err=>console.error(err));
    
    }, []);

  //draw on canvas
  useEffect(() => {
    //get active template
    const template = templateMap.get(props.state.template);
    //if templates not yet loaded return
    if(!template) {
      console.log("Templates not ready: ", new Date());
      return;
    }
    console.log("Template ready: ", new Date());
    //set up canvas and template Image
    let canvas = cnv.current;
    let ctx = canvas.getContext("2d");
    let background = new Image();
    //Use crossOrigin so canvas is not tainted
    background.crossOrigin = "Anonymous";

    //if defined use template url as image src
    if(template){ background.src ='http://localhost:3001' + template.url};

       
    //draw background when loaded
    background.onload =
      () => {

        //set canvas width and height
        canvas.width = 700;
        //ratio by which image was scaled to fit canvas is later used to scale text as well
        let scale = (canvas.width/background.naturalWidth);
        canvas.height = (scale * background.naturalHeight);

        //draw image scaled
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        //Draw text (same process as in the backend)
        for (let cap of props.state.captions){
              
          //apply scale to fontsize
          ctx.font = scale * cap.fontSize + "px" + " Impact";
          ctx.textAlign = "center";

          //Start with Outline
          ctx.strokeStyle = "black";
          ctx.miterLimit = 2;
          ctx.lineJoin = 'circle';
          ctx.lineCap = 'round';
          ctx.lineWidth = cap.fontSize/14;
          ctx.strokeText(cap.text, cap.xPosition * canvas.width, cap.yPosition * canvas.height);

          //Fill in Text
          ctx.fillStyle = cap.color;
          ctx.fillText(cap.text, cap.xPosition * canvas.width, cap.yPosition * canvas.height);

          } 

      }
    


  },[props, templateMap])

    return (
      <div className="Editor">
      <Navbar/>
      <div className="template-list">
          Templates:
          {
            [...templateMap.keys()].map((k) => {
          return(<img key={k} crossOrigin="Anonymous" src= {'http://localhost:3001' + templateMap.get(k).url} width="300" className="template" onClick={e => {templateHandler(k)}}/>)
            })
            }
        </div>

      <div className="editor-area">
          <div>
            <button onClick={createOnServer} >Create Meme</button>
            <button onClick={createLocally}>Create Meme locally</button>
            <button onClick={draftHandler}>Save draft</button>
            <a ref={download} download={new Date().toLocaleString() + "_meme"} style={{display: 'none'}}><button>Download Meme</button></a>
          </div>

          <div>
            Title: <input type="text" name="title" value={props.state.title} onChange={e=>{props.setState(prev=>{return{...prev, title: e.target.value}})}} />
            <button onClick={e=>{props.setState(defaultState)}}>Reset Editor</button>

            <form>
              Top Caption:
              <CaptionEditor {...props} index={0}></CaptionEditor>
              Bottom Caption: 
              <CaptionEditor {...props} index={1}></CaptionEditor>
            </form>
          </div>

          <canvas className="meme-canvas" ref={cnv}></canvas>

        </div>

      </div>
        

    );
  }
  
  export default Editor;