import { Link } from "react-router-dom";

function Editor() {
  return (
    <div className="Editor">
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
         Hello Editor!
        </p>
      </header>
    </div>
  );
}

export default Editor;