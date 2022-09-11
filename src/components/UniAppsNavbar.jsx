import React from "react";
import { removeToken } from "../utils/tokenService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const UniAppsNavbar = ({ loggedIn, setLoggedIn }) => {
    const handleLogout = () => {
        removeToken();
        setLoggedIn(false);
    };

    return (
        <Navbar bg="#329ebc" expand="lg" style={{backgroundColor:"#329ebc"}}>
            <Container>
                <Navbar.Brand href="#home" style={{fontFamily:"Poiret One", fontSize:"30px", fontWeight:"bold"}}>UniApps</Navbar.Brand>
                {loggedIn ?
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end" style={{ width: "100%", fontFamily:"Poiret One", fontSize:"20px", fontWeight:"bolder"}}>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/" onClick={() => {}}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </> 
                :  <></>}
            </Container>
        </Navbar>
    );
};

export default UniAppsNavbar;
