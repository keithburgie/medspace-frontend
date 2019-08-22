import React, {Component} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import API from '../routes'
import styles from './App.module.scss'
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
    const token = localStorage.getItem("jwt")

    if (token) {
      API.get('profile', { headers: {"Authentication": `Bearer ${token}`} })
      .then(user => {
        this.updateCurrentUser(user.data)
      })
    }
    //if not, let them log in
  }


  render() {
    return (
      <div className={styles.appWrapper}>

        <TopNav logged_in={this.state.user} updateCurrentUser={this.updateCurrentUser} />
        
        <Switch>

        <Route exact path="/login" render={()=> (
            this.state.user 
              ? <Redirect to="/dashboard" /> 
              : <LoginForm updateCurrentUser={this.updateCurrentUser}/>
            )}
          />

          <Route exact path="/profile" render={()=> (
            this.state.user 
              ? <Profile user={this.state.user}/> 
              : <Redirect to="/login" />
            )}
          />

          <Route exact path="/dashboard" render={() => (
            // this.state.user 
            //   ? <SchoolsList user={this.state.user}/> 
            //   : <Redirect to="/login" />
            <SchoolsList user={this.state.user }/>
            )}
          />

          <Route path="/dashboard/:user_school_id" component={SchoolPage} />

          <Route component={NotFound} />

        </Switch>

      </div>
    )
  }
}
  
export default withRouter(App)