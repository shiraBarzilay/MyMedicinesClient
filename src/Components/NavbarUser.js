import { Link } from "react-router-dom";
import "../ComponenetsStyle/Navbar.scss";

export default function NavbarUser() {
    //alt + shift + f סידור קוד
    return (
        <div className="wrap-navbar">
            <div className="wrap-navs">
                <Link to="/home" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link1" >דף הבית</Link>
                <Link to="/register" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link2" >התחברות</Link>
                <Link to="/medicines" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link4" >תרופות</Link>
                <Link to="/aboutUs" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link3" >אודות</Link>
                <Link to="/contactUs" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link5" >צור קשר</Link>
                <Link to="/medicationLog" style={{ textDecoration: 'none', color: '#00008B', fontSize: '23px' }} className="nav-link6" >יומן תרופות</Link>
            </div>
        </div>
    )
}