import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/styles/index.scss';
// import App from './components/App';
import SchoolsList from './components/SchoolsList'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SchoolsList />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
