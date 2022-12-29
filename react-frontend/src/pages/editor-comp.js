// This code is based on the omm-counter.js-file provided in exercise 5
// and ( ) inspired by the omm-meme-generator presented in exercise 6

// Used structure for a caption in the captions-array in the state
//interface Caption {
//    text: string
//    posX: number
//    posY: number
//    col: string
//    size: number
//}

import React, {Component} from 'react'
// import './omm-counter.css'
export default class EditorComponent extends Component {
    state = { templateId: -1, user:"", captions:[] }

    addCaption = (inputtext, inputX, inputY, inputcol, inputsize) => 
        {this.setState({captions: (this.state.captions.push(
            {text:inputtext, posX:inputX, posY:inputY, col:inputcol, size:inputsize}))})}
    
    setTemplate = (inputtemplate) => {this.setState({templateId: (this.state.templateId = inputtemplate)})}
    setUser = (inputuser) => {this.setState({user: (this.state.user = inputuser)})}


    render() {
        return (
            //Frontend in JSX :)
        )
    }