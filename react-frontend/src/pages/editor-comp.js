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

function EditorComponent() {
    const state = { templateId: -1, user:"", captions:[] }

    const addCaption = (inputtext, inputX, inputY, inputcol, inputsize) => 
        {this.setState({captions: (this.state.captions.push(
            {text:inputtext, posX:inputX, posY:inputY, col:inputcol, size:inputsize}))})}
    
    const setTemplate = (inputtemplate) => {this.setState({templateId: (this.state.templateId = inputtemplate)})}
    const setUser = (inputuser) => {this.setState({user: (this.state.user = inputuser)})}
    }

    export default EditorComponent;

    // TODO: weiter Funktionen überlegen z.B. ChangeCaption/DeleteCaption und an Verbindung zum BackEnd feilen
    /*
    * Überlegungen zur Verbindung zum BackEnd:
    * In JavaScript gibt es die fetch-API, welche es asynchron ermöglicht, Daten von API-Endpunkten abzufragen
    * In der Variante aus der Übung nutzen sie ebenfalls fetch um Daten vom Frontend zum Backend zu bekommen
    * Bräuchte dann nur einen entsprechenden Pfad zur API um fetch(Pfad).then( result => how to process the result)
    * aufrufen zu können
    * Folgendes Beispiel (https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples) macht deutlich,
    * dass wir mit fetch auch einen POST-Request an die API senden können und somit aus dem Frontend ans Backend Daten
    * übertragen können
    * 
    */

    //TODO: meine State-Benennungen an Jakob seine anpassen


