import React from 'react';
import logo from './logo.svg';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

function MainMenu() {
  return (
    <>
        <header>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand>PrivatniCasovi</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/offer">Ponuda</Nav.Link>
                <Nav.Link href="/profile">Profil</Nav.Link>
                <Nav.Link href="/">Odjava</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    </>
  );
}

export default MainMenu;