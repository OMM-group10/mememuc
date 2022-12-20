import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import Editor from './pages/editor';
import Account from './pages/account';
import Overview from './pages/overview';
import Documentation from './pages/documentation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
    <header className="App-header">
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor />} />            
          <Route path='/account' element={<Account />} /> 
          <Route path='/overview' element={<Overview />} /> 
          <Route path='/documentation' element={<Documentation />} />    
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
