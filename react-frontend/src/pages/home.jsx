import { Link } from "react-router-dom";
import './navbar.css'


function Home(){
  return (
    <div className="Home">
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
         Hello Home!
        </p>
      </header>
    </div>
  );
};

export default Home;