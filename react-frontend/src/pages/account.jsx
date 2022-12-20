import { Link } from "react-router-dom";

function Account() {
    return (
      <div className="Account">
        <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/overview">Overview</Link>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
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