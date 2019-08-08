import React from 'react';
// import assets from './routes'
// import logo from '../src/assets/images/logo.svg';
import '../src/assets/styles/App.scss';
import SchoolsList from './components/schools-list'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SchoolsList />
            {/* School */}
            {/* School */}
            {/* School */}
        </header>
      </div>
    );
  }
}

export default App;
