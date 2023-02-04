import logo from './logo.svg';
import './App.css';
import Menubar from './pages/menubar';
import Home from './pages/home';
import Editor from './pages/editor';
import Account from './pages/account';
import Overview from './pages/overview';
import Documentation from './pages/documentation';
import Meme from './pages/meme';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <header className="App-header">
    <Router>
        <Routes>
          <Route path="/" element={<Menubar/>}>
            <Route index element={<Home />} />
            <Route path='editor' element={<Editor />} />            
            <Route path='account' element={<Account />} /> 
            <Route path='overview' element={<Overview />} /> 
            <Route path='documentation' element={<Documentation />} />
            <Route path='meme/:memeId' element={<Meme />} />
          </Route>
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
