import { Link } from "react-router-dom";
import './navbar.css';
import {createMeme} from './documentation'
import React, { useEffect, useState } from "react";



//TODO: Clear Button
//TODO: Download Link
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

  //handle changes of caption properties
  const changeHandler = (index,e) => {
    props.setState(prev=>{
      prev.captions[index][e.target.name] = e.target.value;
      //console.log(prev);
      return({...prev});
    })

  } 

  //create download button
  const createDownload = e => {
    const imageData = cnv.current.toDataURL('png');
    const link = download.current;

    link.setAttribute('download', new Date().toLocaleString() + "_meme");
    link.setAttribute('href', imageData);
    link.setAttribute('style', '');
  }

  //create Meme on server and render download button
  const createUpload = e => {
    createMeme(props.state)
    .then(res=>{
      const link = download.current;
      link.setAttribute('download', new Date().toLocaleString() + "_meme");
      link.setAttribute('href', res.image);
      link.setAttribute('style', '');
    })
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

    //draw canvas

    },[]);

  //draw on canvas
  useEffect(()=>{
    let canvas = cnv.current;
    let ctx = canvas.getContext("2d");
    let background = new Image();
    background.crossOrigin = "Anonymous";
    
    //get active template
    let template = templateMap.get(props.state.template);
    //if defined use it as background
    if(template){ background.src ='http://localhost:3001' + template.url};
    
    canvas.width = 700;
    //ratio by which image was scaled to fit canvas is later used to scale text as well
    let scale = (canvas.width/background.naturalWidth);

    canvas.height = (scale * background.naturalHeight);

    //draw background when loaded
    background.addEventListener(
      "load",
      () => {
        //draw image scaled
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

            //Draw text
        for (let cap of props.state.captions){
              
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

      },
      false
    );

  })

    return (
      <div className="Editor">
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
      <button onClick={createUpload} >Create Meme</button>
      <button onClick={createDownload}>Create Meme locally</button>
      <a ref={download} download={new Date().toLocaleString() + "_meme"} style={{display: 'none'}}><button>Download Meme</button></a>
      </div>
      <ul className="template-list">
        {
          [...templateMap.keys()].map((k) => {
        return(<li key={k}> <img crossOrigin="Anonymous" src= {'http://localhost:3001' + templateMap.get(k).url} width="300" onClick={e => {templateHandler(k)}}/> </li>)
          })
          }
      </ul> <br/>
          <form>
          Top Text: <input type="text" name="text" value={props.state.captions[0].text} onChange={e=>{changeHandler(0,e)}}/>
          Color: <select name="color" value={props.state.captions[0].color} onChange={e=>{changeHandler(0,e)}}>
                  <option value="white">white</option>
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="yellow">yellow</option>
                </select>
          xPosition: <input type="number" name="xPosition" min="0" max="1" step="0.05" value={props.state.captions[0].xPosition} onChange={e=>{changeHandler(0,e)}}></input>
          yPosition: <input type="number" name="yPosition" min="0" max="1" step="0.05" value={props.state.captions[0].yPosition} onChange={e=>{changeHandler(0,e)}}></input>
          </form>
          <form>
          Bottom Text: <input type="text" name="text" value={props.state.captions[1].text} onChange={e=>{changeHandler(1,e)}}/>
          Color: <select name="color" value={props.state.captions[1].color} onChange={e=>{changeHandler(1,e)}}>
                  <option value="white">white</option>
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="yellow">yellow</option>
                </select>
          xPosition: <input type="number" name="xPosition" min="0" max="1" step="0.05" value={props.state.captions[1].xPosition} onChange={e=>{changeHandler(1,e)}}></input>
          yPosition: <input type="number" name="yPosition" min="0" max="1" step="0.05" value={props.state.captions[1].yPosition} onChange={e=>{changeHandler(1,e)}}></input>
          </form>

          
          <canvas ref={cnv}></canvas>
      </div>
        

    );
  }
  
  export default Editor;