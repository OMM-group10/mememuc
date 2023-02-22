import React, { useState, useEffect } from "react";

const CaptionEditor = (props) => {

    //handle changes of caption properties
    const changeHandler = (index,e) => {
        props.setState(prev=>{
        prev.captions[index][e.target.name] = e.target.value;
        //console.log(prev);
        return({...prev});
        })

  }

    return(
        <form>
            Text: <input type="text" name="text" value={props.state.captions[props.index].text} onChange={e=>{changeHandler(props.index,e)}}/>
            Color: <select name="color" value={props.state.captions[props.index].color} onChange={e=>{changeHandler(props.index,e)}}>
                  <option value="white">white</option>
                  <option value="blue">blue</option>
                  <option value="red">red</option>
                  <option value="green">green</option>
                  <option value="yellow">yellow</option>
                </select>
            xPosition: <input type="number" name="xPosition" min="0" max="1" step="0.05" value={props.state.captions[props.index].xPosition} onChange={e=>{changeHandler(props.index,e)}}></input>
            yPosition: <input type="number" name="yPosition" min="0" max="1" step="0.05" value={props.state.captions[props.index].yPosition} onChange={e=>{changeHandler(props.index,e)}}></input>
        </form>
          )

}

export default CaptionEditor;