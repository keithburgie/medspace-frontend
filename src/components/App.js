import React, {Component, Fragment} from 'react';
// import assets from './routes'
// import logo from '../src/assets/images/logo.svg';
import styles from './App.module.scss'
import TopNav from './TopNav'
import SchoolsList from './SchoolsList.js'

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
        <SchoolsList />
      </Fragment>
    );
  }
}

export default App;
