import React from "react";
import { Link } from "react-router-dom";
import {removeToken} from '../utils/tokenService'
import { useNavigate } from "react-router-dom";

const Navbar = ({setLoggedIn}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken()
        setLoggedIn(false)
        navigate('/login/')
    }


    return (
        <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor:"#329ebc"}}>
            <div className="container emphasis-font">
                <Link to="/dashboard" className="navbar-brand" style={{fontFamily:"Poiret One", fontSize:"30px"}}>
                    UniApps
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navmenu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navmenu">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/dashboard" className="nav-link">
                                Dashboard
                            </a>
                            <a href="/dashboard" className="nav-link">
                                <button onClick={handleLogout}>logout</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
