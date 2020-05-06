console.log('Apooooop.js is running')

const app = {
    title: 'Indecision App',
    subtitle: 'Are you ready?',
    options: ['One', 'Two']
}
// Define JSX, which the browser doesn't understand
// When working with JSX, can only have a single root element. Wrap multiple elements inside the root element
// For readability purposes, wrap the elements inside parenthises ()
// If subtitle exists, render the subtitle
// Check the length of array for options property
const template = (
    <div>
        <h1>{app.title}</h1>
        {app.subtitle && <p>{app.subtitle}</p>}
        <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
        <ol>
            <li>Item one</li>
            <li>Item two</li>

        </ol>
    </div>
)



const user = {
    name: 'Nga',
    age: 99,
    location: 'San Francisco'
}
function getLocation(location) {
    // If location isn't found, the return value is implicitly set to undefined
    if (location) {
        return <p>Location: {location}</p>
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
const templateTwo = (
    <div>
        <h1>{user.name ? user.name : 'Anonymous'}</h1>
        {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
)

// EVENTS AND ATTRIBUTES
// NOTE: the class attribute has been renamed to 'className' because 'class' is a reserved word in JS
// templateThree is an object. It contains a bunch of information about JSX
// onClick is an event listener
// When an event is triggered, we can pass in a function, a callback function, to run
let count = 0
const addOne = () => {
    console.log('addOne')
}
const minusOne = () => {
    console.log('minusOne')
}
const reset = () => {
    console.log('reset')
}
const templateThree = (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={addOne} className="button">+1</button>
        <button onClick={minusOne}>-1</button>
        <button onClick={reset}>Reset</button>
    </div>
)
console.log(templateThree)


// Select the element to where we want to display the var template in the browser. Assign it to appRoot variable
const appRoot = document.querySelector('#app')
// Render the JSX(template) in the appRoot element in the browser
ReactDOM.render(templateThree, appRoot)



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