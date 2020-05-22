import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = (props) => {
  // Returns an array
  const [count, setCount] = useState(props.count)

  return (
    <div>
      <p>The current count is {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>reset</button>
    </div>
  )
}

App.defaultProps = {
  count: 10
}

ReactDOM.render(
  <React.StrictMode>
    <App />
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

// REACT HOOK
// A hook is nothing more than a function
// React hook is a function that lets you tap into react features, like state or lifecylce methods
// React ships with its own set of hooks we can use as building blocks and we can also create our own hooks, ie our own functions to customize behavior further
// So no longer are they called stateless functional component, they're now just called FUNCTIONAL COMPONENTS because it is possible to use state inside of them
// useState is a hook function that we can call to allow us to use state inside a component

// useState
// Built-in React hook: useState is a function that allows us to use component state in our stateless functional components, something we could not do in the past
  // const array = useState(0)
  // <p> The current count is {array[0]}
// What comes back from useState is an array of two items:
//  - the first is the current state value that's going to change over time
//  - the second is a function we can call in order to update the state 
// It is common to destructure the array and give it a name for the item at that index: 
  // const [count, setCount] = useState(0)
  // <p> The current count is {count}
// 4 pieces to useState:
//  - define the state: useState(10)
//  - get access to its current value: const [count, setCount]
//  - render it: {count}
//  - call the function to update the state: onClick={() => setCount(count + 1)}