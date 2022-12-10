import Container from 'react-bootstrap/Container';
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="sm" fixed="top">
    <Container>
      <Navbar.Brand href="#home">Bokning</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-left">
            <Nav.Link href="#link">Check rooms</Nav.Link>
            <Nav.Link href="#home">Sign in <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
            <Nav.Link>Register <i className="fa-solid fa-user-plus"></i></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar