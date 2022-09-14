import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserContext from "../utils/UserContext";

const UniAppsNavbar = () => {
    const {loggedIn, setLoggedIn, removeToken} = useContext(UserContext)
    const handleLogout = () => {
        removeToken();
        setLoggedIn(false);
    };

    return (
        <Navbar expand="lg" className="nav-main-container">
            <Container>
                <Navbar.Brand href="/dashboard" className="nav-brand">UniApps</Navbar.Brand>
                {loggedIn ?
                <>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end nav-links ">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/" onClick={handleLogout}>
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
