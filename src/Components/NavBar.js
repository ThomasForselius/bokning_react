import Container from 'react-bootstrap/Container';
import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="sm" fixed="top">
    <Container>
      <NavLink to='/' exact>
        <Navbar.Brand>
          Bokning
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-left">
          <NavLink to='/check' className={styles.NavLink} activeClassName={styles.Active}>  
              Check availability<i className='fa-solid fa-house'></i>
          </NavLink>
          <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
              Sign in <i className="fa-solid fa-right-to-bracket"></i>
          </NavLink>
          <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              Register <i className="fa-solid fa-user-plus"></i>
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar