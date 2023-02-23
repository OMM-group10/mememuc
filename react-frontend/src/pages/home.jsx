import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import './navbar.css'


function Home(){
  return (
    <div className="Home">
      <Navbar/>
    <header className="App-header">
        <p>
         Hello Home!
        </p>
      </header>
    </div>
  );
};

export default Home;