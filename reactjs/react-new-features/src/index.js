import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <div>My new content</div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// ========================
// NOTES
// ========================

// USING CREATE REACT APP
// Create-react-app application is designed to get us up and running with a barebones react app quickly
// Install globally: npm i -g create-react-app
// To creat a React project: create-react-app <nameOfProject>
// It will generate a few things:
//  - create a new directory
//  - generate all the boilerplate files 
//  - install all of the npm modules necessary
// cd into the project directory
// Run: npm start
// Create-react-app is using Babel configuration and Webpack configuration behind the scenes. These tools are abstracted away

