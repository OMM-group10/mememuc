import { Link } from "react-router-dom";
import LoginStatus from "./loginStatus";
import '../pages/navbar.css'


const Navbar = ()=>{

    return (
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
            <li>
              <LoginStatus/>
            </li>
          </ul>
      );
    
}

export default Navbar