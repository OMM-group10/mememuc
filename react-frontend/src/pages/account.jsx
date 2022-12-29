import { Link } from "react-router-dom";
import './navbar.css';

function Account() {
    return (
      <div className="Account">
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
           Hello Account!
          </p>
        </header>
      </div>
    );
  }
  
  export default Account;