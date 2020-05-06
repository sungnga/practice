'use strict';

console.log('Apooooop.js is running');

var app = {
    title: 'Indecision App',
    subtitle: 'Are you ready?'
    // Define JSX, which the browser doesn't understand
    // When working with JSX, can only have a single root element. Wrap multiple elements inside the root element
    // For readability purposes, wrap the elements inside parenthises ()
};var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        app.title
    ),
    React.createElement(
        'p',
        null,
        app.subtitle
    ),
    React.createElement(
        'ol',
        null,
        React.createElement(
            'li',
            null,
            'Item one'
        ),
        React.createElement(
            'li',
            null,
            'Item two'
        )
    )
);

var user = {
    name: 'Nga',
    age: 99,
    location: 'San Francisco'
    // The data inside JSX should not be defined here. Instead, they should come from variables that we reference
    // This way we can reuse this template
    // {user.name} A variable name inside curly braces is a Javascript expression
    // By adding javascript expressions into JSX we can have JSX that is dynamic
};var templateTwo = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        user.name
    ),
    React.createElement(
        'p',
        null,
        'Age: ',
        user.age
    ),
    React.createElement(
        'p',
        null,
        'Location: ',
        user.location
    )
);

// Select the element to where we want to display the var template in the browser. Assign it to appRoot variable
var appRoot = document.querySelector('#app');
// Render the JSX(template) in the appRoot element in the browser
ReactDOM.render(template, appRoot);

// =========================
// CHALLENGES
// =========================

// GOAL: Create a templateTwo var JSX expression
// div
//   h1 -> Andrew Mead
//   p -> Age: 26
//   p -> Location: Seattle
// Render templateTwo instead of template

// GOAL: Create app object title/subtitle
// use title/subtitle in the template
// render template


// =========================
// NOTES
// =========================

// In index.html file:
// Load React and ReactDOM scripts and the Javascript app.js script in the body tag
// <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
// <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
// <script src="./scripts/app.js"></script>

// JSX - Javascript XML
// Is a javascript syntax extension
// It is not part of the core JS language.
// It is provided by React. React offers us a new way to define our templates and to inject data into those templates
// The browser doesn't understand JSX. But we will use Babel to compile JSX code

// BABEL
// https://babeljs.io
// Is a javascript compiler
// The most common use case for Babel is taking features from ES6 & ES7 and compiling them down to ES5 code

// Setting up Babel:
// 1. Install Babel itself
// 2. Install env preset
// 3. Install react preset
// Run to install babel cli globally: sudo npm install -g babel-cli
// babel --help
// Run to create package.json file: npm init -y
// Now install the 2 babel dependencies: 
// npm install babel-preset-env
// npm install babel-preset-react

// Using Babel:
// Babel will watch the app.js file in src folder for changes. If there's a change, it will convert the code to ES5 code and stores it in Javascript app.js file in the public/scripts directory
// Run: babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// Include the --watch flag to the command above to watch for changes in the app.js file in src folder
// You can see the changes render in the browser automatically when you have babel and live server running in the background

// To install the node_modules folder to have access to the dependcies:
// Run: npm install
