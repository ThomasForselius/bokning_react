import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useCurrentUser } from '../context/CurrentUserContext';
import Avatar from './Avatar';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const dmIcon = (
    <NavLink 
      to='/dm'
      className={styles.NavLink}
      activeClassName={styles.Active}>  
          <i className='fa-solid fa-message'></i>Message
      </NavLink>
  )
  const loggedInIcons = (
    <>
      <NavLink to='/check' className={styles.NavLink} activeClassName={styles.Active}>  
          <i className='fa-solid fa-house'></i>Book
      </NavLink>

      { currentUser && dmIcon }
      
      <NavLink 
        to={'/profile/${currentUser?.profile_id}'}
        className={styles.NavLink} 
        activeClassName={styles.Active}>
          <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={30} />
      </NavLink>
      <NavLink 
        to='/' 
        onClick={() => {}} 
        className={styles.NavLink} 
        >  
          <i className='fa-solid fa-right-from-bracket'></i>Sign out
      </NavLink>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
          <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
          <i className="fa-solid fa-user-plus"></i>Register
      </NavLink>
    </>
  )

  return (
    <Navbar className={styles.NavBar} expand="sm" fixed="top">
    <Container>
      <NavLink to='/' exact>
        <Navbar.Brand>
          <img src={logo} className={styles.logo} alt="Logo"></img>
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto text-left">
          {currentUser ? loggedInIcons : loggedOutIcons}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar