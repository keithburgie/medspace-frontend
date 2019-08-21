import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import styles from './TopNav.module.scss'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const TopNav = (props) => {
  // let { location: { pathname } } = props
  let logged_in = props.logged_in;
  console.log("TopNav logged_in =", logged_in)
  let logout = () => {
    //clear localStorage of our jwt
    localStorage.removeItem("jwt")
    //set the user state back to null
    props.updateCurrentUser(null)
  }

  return (
    <Navbar className={styles.topnav} fixed={true} light expand="lg">
      <NavbarBrand href="/dashboard">MEDSPACE</NavbarBrand>
      <Nav className="ml-auto" navbar>
        { logged_in 
        ? (<Fragment>
            <NavItem><NavLink href="/dashboard">Dashboard</NavLink></NavItem>
            <NavItem><NavLink href="/profile">Profile</NavLink></NavItem>  {/* active={pathname === "/profile"} */}
            <NavItem><NavLink href="/login" onClick={logout}>Logout</NavLink></NavItem> {/* <NavLink href="/logout" onClick={logout}>Logout</NavLink> */}
          </Fragment>) 
        
        : (<NavItem><NavLink href="/login">Login</NavLink></NavItem>) 
        // active={pathname === "/login"}
        }
      </Nav>
    </Navbar>
  )
}

export default withRouter(TopNav);