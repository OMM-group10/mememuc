import { Link } from "react-router-dom";
import './navbar.css'


function Home(){
  return (
    <div className="Home">
        <ul>
        <li>
          <Link to="/">Home </Link>
        </li>
        <li>
          <Link to="/editor">Editor </Link>
        </li>
        <li>
          <Link to="/account">Account </Link>
        </li>
        <li>
          <Link to="/overview">Overview </Link>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>
      </ul>
      <div>
        <h1>Home Page!</h1>
      </div>
    </div>
    
  );
};

export default Home;