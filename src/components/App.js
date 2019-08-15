import React from 'react';
// import assets from './routes'
// import logo from '../src/assets/images/logo.svg';
import styles from './App.module.scss'
import SchoolsList from './SchoolsList.js'

class App extends React.Component {

  render() {
    return (
      <div className={styles.App}>
        {/* <header className={styles.AppHeader}>
          
        </header> */}
        <div className={styles.leftCol}>
          <p>I'm a column too.  </p>
        </div>
        <div className={styles.rightCol}>
          <SchoolsList />
        </div>
      </div>
    );
  }
}

export default App;
