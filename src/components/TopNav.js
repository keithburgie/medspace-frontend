import React, {Component, Fragment} from 'react';
import {withRouter, Link} from 'react-router-dom'
import styles from './TopNav.module.scss'
import { IoMdMedical, IoMdPerson } from "react-icons/io";
import {Navbar, Nav, NavItem } from 'reactstrap';

class TopNav extends Component {

  render() {
    let { location: { pathname } } = this.props
    let logged_in = this.props.logged_in;
    console.log("TopNav logged_in =", logged_in)
    let logout = () => {
      //clear localStorage of our jwt
      localStorage.removeItem("jwt")
      //set the user state back to null
      this.props.updateCurrentUser(null)
    }

    return (
      <Navbar className={styles.topnav} light expand="lg">
        <Link to="/dashboard"><IoMdMedical/> MEDSPACE</Link>
          <Nav className="ml-auto" navbar>
            { logged_in 
            ? <Fragment>
                <NavItem><Link to="/dashboard" active={pathname === "/dashboard"}>DASHBOARD</Link></NavItem>
                <NavItem><Link to="/profile" active={pathname === "/profile"}><IoMdPerson /> {logged_in.name.toUpperCase()}</Link></NavItem>
                <NavItem><Link to="/login" onClick={logout}>LOGOUT</Link></NavItem>
              </Fragment>
            
            : <NavItem><Link to="/login" active={pathname === "/login"}>LOGIN</Link></NavItem>
            // active={pathname === "/login"}
            }
          </Nav>
      </Navbar>
    )
  }
  
}

export default withRouter(TopNav);