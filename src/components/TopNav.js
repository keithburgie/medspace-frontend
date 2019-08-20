import React, {Fragment} from 'react';
import {Route, Link, withRouter} from 'react-router-dom'
import styles from './TopNav.module.scss'
import { Navbar, Container, NavbarBrand, NavItem } from 'reactstrap';

const TopNav = (props) => {
  let { location: { pathname } } = props
  let logged_in = props.logged_in;
  console.log("TopNav logged_in =", logged_in)
  let logout = () => {
    //clear localStorage of our jwt
    localStorage.removeItem("jwt")
    //set the user state back to null
    props.updateCurrentUser(null)
  }

  return (
    <Navbar className={styles.topnav} light expand="md">
      
        <NavbarBrand href="#">MEDSPACE</NavbarBrand>
        <NavItem>
          <Link to="/dashboard">Dashboard</Link>
        </NavItem>
        {
        logged_in ? 
        (
          <Fragment>
            <NavItem>
              <Link to="/profile">Profile</Link>
                {/* active={pathname === "/profile"} */}
            </NavItem>
            
            <NavItem>
              {/* <Link to="/logout" onClick={logout}>Logout</Link> */}
              <Link to="/login" onClick={logout}>Logout</Link>
            </NavItem>
          </Fragment>
        ) 
        : 
        (
        <NavItem>
          <Link to="/login">Login</Link>
          {/* // active={pathname === "/login"} */}
        </NavItem>
        )
      }
    </Navbar>
  );
};

export default withRouter(TopNav);