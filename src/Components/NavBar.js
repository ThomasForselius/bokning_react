import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';
import useClickOutsideToggle from '../hooks/useClickOutside';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const dmIcon = (
    <NavLink 
      to='/dm'
      className={styles.NavLink}
      activeClassName={styles.Active}>  
          <i className='fa-solid fa-comment'></i>Message
      </NavLink>
  )
  const loggedInIcons = (
    <>
      <NavLink to='/src/pages/posts/BookingCreateForm.js' className={styles.NavLink} activeClassName={styles.Active}>  
          <i className='fa-solid fa-house'></i>Book
      </NavLink>

      { currentUser && dmIcon }
  
      <NavLink 
        to={`/profile/${currentUser?.profile_id}`}
        className={styles.NavLink} 
        activeClassName={styles.Active}>
          <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={20} className={styles.Avatar} />
      </NavLink>
      <NavLink 
        to='/' 
        onClick={handleSignOut} 
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
    <Navbar 
      expanded={expanded}
      className={styles.NavBar}
      expand="sm"
      fixed="top"
    >
    <Container>
      <NavLink to='/' exact>
        <Navbar.Brand>
          <img src={logo} className={styles.logo} alt="Logo"></img>
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" ref={ref} />
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