import { Outlet, Link } from "react-router-dom";

function Menubar(){
    return (
        <>
            <nav>
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
            </nav>

            <Outlet/>
        </>
    )
}
export default Menubar