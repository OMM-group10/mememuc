import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Editor from './pages/editor';
import Account from './pages/account';
import Overview from './pages/overview';
import Documentation from './pages/documentation';
import Meme from './pages/meme';
import Test from './pages/test';
import Login from './pages/login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';


function App() {

  const [editorState, setEditorState] = useState({
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
  })

  const [filterState, setFilterState] = useState({
    use: 0,
    attr: "none",
    value: 0,
    comparison: "$lt",
    query: {}
  });

  const [sortBy, setSortBy] = useState({
    attr: "creationDate",
    order: 1
  })

  return (
    <div className="App">
    <header className="App-header">
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor state={editorState} setState={setEditorState} />} />            
          <Route path='/account' element={<Account editorState={editorState} setEditorState={setEditorState} />} /> 
          <Route path='/overview' element={<Overview sortBy={sortBy} setSortBy={setSortBy} filterState={filterState} setFilterState={setFilterState}/>} /> 
          <Route path='/documentation' element={<Documentation />} />
          <Route path='/meme/:memeId' element={<Meme sortBy={sortBy} setSortBy={setSortBy} filterState={filterState} setFilterState={setFilterState}/>} />
          <Route path='/test' element={<Test sortBy={sortBy} setSortBy={setSortBy} filterState={filterState} setFilterState={setFilterState} />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
