import { Link } from "react-router-dom";
import "../ComponenetsStyle/Navbar.css";
// import { Outlet } from "react-router-dom";

export default function NavbarUser(){

return(
    <div className="bbody">
    <nav className="navbar navbar-expand-sm bg-light">
    <div className="container-fluid">
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/home" style={{textDecoration: 'none',color:'#00008B',fontSize:'23px'}} className="nav-link" >דף הבית</Link>
            </li>
            <li className="nav-item">
                <Link to="/register"  style={{textDecoration: 'none',color:'#00008B',fontSize:'23px'}} className="nav-link" >התחברות</Link>
            </li>
            <li className="nav-item">
                <Link to="/aboutUs"  style={{textDecoration: 'none',color:'#00008B',fontSize:'23px'}} className="nav-link" >אודות</Link>
            </li>
            <li className="nav-item">
                <Link to="/contactUs"  style={{textDecoration: 'none',color:'#00008B',fontSize:'23px'}} className="nav-link" >צור קשר</Link>
            </li>
            </ul>
            </div>
            </nav >
              {/* <Outlet /> */}
        </div>
)
      
}