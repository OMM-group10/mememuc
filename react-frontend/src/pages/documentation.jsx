import { Link } from "react-router-dom";

function Documentation() {
    return (
      <div className="Documentation">
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
           Hello Documentation!
          </p>
        </header>
      </div>
    );
  }
  
  export default Documentation;