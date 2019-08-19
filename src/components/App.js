import React, {Component, Fragment} from 'react';
import {Route, Link} from 'react-router-dom'
// import assets from './routes'
// import logo from '../src/assets/images/logo.svg';
import styles from './App.module.scss'
import TopNav from './TopNav'
import SchoolsList from './SchoolsList.js'
import SchoolPage from './SchoolPage.js'

class App extends Component {

  state = {
    user_id: ''
  }

  componentDidMount() {
    localStorage.setItem('user_id', 1)
    this.setState({
      user_id: parseInt(localStorage.getItem('user_id'))
    })
  }

  render() {

    return (
      <Fragment>

        <TopNav />

        <Route exact path="/dashboard" component={SchoolsList} />
        
        <Route path="/dashboard/:user_school_id" component={SchoolPage} />

      </Fragment>
    );
  }
}

export default App;
