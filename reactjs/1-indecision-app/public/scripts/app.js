'use strict';

console.log('Apooooop.js is running');

var app = {
    title: 'Indecision App',
    subtitle: 'Are you ready?',
    options: ['One', 'Two']
    // Define JSX, which the browser doesn't understand
    // When working with JSX, can only have a single root element. Wrap multiple elements inside the root element
    // For readability purposes, wrap the elements inside parenthises ()
    // If subtitle exists, render the subtitle. Using && logical operation
    // Check the length of array for options property. Using ternary operator
};var template = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        app.title
    ),
    app.subtitle && React.createElement(
        'p',
        null,
        app.subtitle
    ),
    React.createElement(
        'p',
        null,
        app.options.length > 0 ? 'Here are your options' : 'No options'
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
};
function getLocation(location) {
    // If location isn't found, the return value is implicitly set to undefined
    if (location) {
        return React.createElement(
            'p',
            null,
            'Location: ',
            location
        );
    }
}
// The data inside JSX should not be defined here. Instead, they should come from variables that we reference
// This way we can reuse this template
// {user.name} A variable name inside curly braces is a Javascript expression
// By adding javascript expressions into JSX we can have JSX that is dynamic
// CONDITIONAL RENDERING IN JSX:
//  - Conditionals: if statements, ternary operators, logical && operator
//  - Undefined, null, and booleans(true/false) ARE IGNORED BY JSX
//  - Calling a function is AN EXPRESSION: getLocation()
//  - We can inject a function expression into JSX. The return value from the function is what's going to show up
//  - IF A JSX EXPRESSION IS RESOLVED TO UNDEFINED, NOTHING IS GOING TO SHOW UP
//  - If {getLocation(user.location)} is undefined. Meaning there's no location found, the location property won't even render
//  - A ternary operator is AN EXPRESSION and not a statement
//  - We can add conditional expressions like tenery operator into JSX
// Logical && operator:
//  - true && 'some age' //returns "some age"
//  - fales && 'some age' //returns false (which JSX will ignore)
//  - If what's on the left of && is true, what's on the right will be used. If false, age property will get ignored by JSX
var templateTwo = React.createElement(
    'div',
    null,
    React.createElement(
        'h1',
        null,
        user.name ? user.name : 'Anonymous'
    ),
    user.age && user.age >= 18 && React.createElement(
        'p',
        null,
        'Age: ',
        user.age
    ),
    getLocation(user.location)
);

// EVENTS AND ATTRIBUTES
// NOTE: the class attribute has been renamed to 'className' because 'class' is a reserved word in JS
// templateThree is an object. It contains a bunch of information about JSX
// onClick is an event listener
// When an event is triggered, we can pass in a function, a callback function, to run
var count = 0;
// This function runs when onClick button is triggered
var addOne = function addOne() {
    // Increment count
    count++;
    // Re-render JSX and this updated count to the screen
    renderCounterApp();
};
var minusOne = function minusOne() {
    count--;
    renderCounterApp();
};
var reset = function reset() {
    count = 0;
    renderCounterApp();
};

// Select the element to where we want to display the var template in the browser. Assign it to appRoot variable
var appRoot = document.querySelector('#app');

// JSX DOES NOT HAVE BUILT-IN DATA BINDING
// The JSX express runs before anything is rendered to the screen
// Remember, we don't render anything to the screen until we call ReactDOM.render()
// When we create JSX, all the data that gets used inside of it, that happens at the time the code run
// In this case, count is always going to be 0 because count was zero when JSX first ran
// How to fix this?
// We just rerun the JSX expression and the ReactDOM.render() that has the JSX in it when the data changes. Later on we'll use React component to do that
// So we're going to write a simple function that re-renders JSX when the data changes
//  - It has the JSX
//  - ReactDOM.render() to render the initial JSX
//  - Don't forget to call the function
// Another note, when we're using ReactDOM.render(), we're using React-DOM capability. We're using the virtual DOM algorithm to efficiently render and re-render only the parts that are needed, not wasting a ton of resources
// This runs in Javascript. The virtual DOM algorithm calculates if any changes need to be made and if they do, it calculates the minimal number of changes
// templateThree is an object that represents the entire JSx tree. React uses algorithm to compare two objects tree to figure out what has been changed
var renderCounterApp = function renderCounterApp() {
    var templateThree = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Count: ',
            count
        ),
        React.createElement(
            'button',
            { onClick: addOne, className: 'button' },
            '+1'
        ),
        React.createElement(
            'button',
            { onClick: minusOne },
            '-1'
        ),
        React.createElement(
            'button',
            { onClick: reset },
            'Reset'
        )
    );
    // Render the JSX(templateThree) in the appRoot element in the browser
    ReactDOM.render(templateThree, appRoot);
};
renderCounterApp();

// =========================
// CHALLENGES
// =========================

// GOAL1: Create a templateTwo var JSX expression
// div
//   h1 -> Andrew Mead
//   p -> Age: 26
//   p -> Location: Seattle
// Render templateTwo instead of template

// GOAL2: Create app object title/subtitle
// use title/subtitle in the template
// render template

// GOAL3: Rendering with conditionals
// only render the subtitle (and p tag) if subtitle exists - logical && operator
// render new p tag - if options.length > 0 "Here are your options" "No options"


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
