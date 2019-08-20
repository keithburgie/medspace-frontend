import React, {Component, Fragment} from 'react';
import {Route, Link, Switch, Redirect, withRouter} from 'react-router-dom'
import API from '../routes'
// import styles from './App.module.scss'
import TopNav from './TopNav'
import SchoolsList from './SchoolsList.js'
import SchoolPage from './SchoolPage.js'
import Profile from './Profile.js'
import LoginForm from './LoginForm.js'
import NotFound from './NotFound.js'

class App extends Component {

  state = {
    user: null
  }

  updateCurrentUser = (user) => {
    this.setState({user})
  }

  componentDidMount(){
    //check to see if there is a jwt?
    //if there is, fetch to get the user asnd update the user state
    let token = localStorage.getItem("jwt")
    if(token){
      fetch("http://localhost:3000/api/v1/profile", {
        headers: {"Authentication": `Bearer ${token}`}
      })
      .then(res => res.json())
      .then(user => {
        console.log("App CDM: ", user)
      	this.updateCurrentUser(user)
      })
    }
    //if not, let them log in
  }


  render() {
    return (
      <Fragment>
        <TopNav logged_in={this.state.user} updateCurrentUser={this.updateCurrentUser} />
        
        <Switch>
          <Route exact path="/dashboard" render={() => {
            return (this.state.user 
              ? <SchoolsList user={this.state.user}/> 
              : <Redirect to="/login" />)
          }} />

          <Route path="/dashboard/:user_school_id" component={SchoolPage} />

          <Route exact path="/profile" render={()=> {
            return (this.state.user 
              ? <Profile user={this.state.user}/> 
              : <Redirect to="/login" />)
            }
          }/>

          <Route exact path="/login" render={()=> {
            return (this.state.user 
              ? <Redirect to="/profile" /> 
              : <LoginForm updateCurrentUser={this.updateCurrentUser}/>)
            }
          }
          />

          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }

}
  

export default withRouter(App)