import { Link } from "react-router-dom";
import Filter from "../components/filter";
import SortSelector from "../components/sortSelector";
import './navbar.css';



function Test(props) {

    return (
      <div className="Documentation">
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
           Hello Test! <br/>
           Filter: {props.filterState.attr}
          </p>
        </header>
      <Filter filterState={props.filterState} setFilterState={props.setFilterState} />
          <p>
            Sortby: {props.sortBy.attr} {props.sortBy.order}
          </p>
      <SortSelector sortBy={props.sortBy} setSortBy={props.setSortBy} />

      </div>
      

    );
  }
  
  export default Test;