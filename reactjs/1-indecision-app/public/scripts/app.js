console.log('Apooooop.js is running')
// In index.html file: load React and ReactDOM scripts and this JS app.js file script

// Define JSX. Which the browser doesn't understand
var template = <p>This is JSX from app.js!</p>
// Babel compiles JSX code to ES5 that the browser can understand
// This is what actually is happening behind the seen using Babel
// var template = React.createElement(
//     "h1",
//     { id: "someid" },
//     "Something new"
// )

// Select the element to where we want to display the var templaten in the browser
var appRoot = document.querySelector('#app')
// Render the template in the appRoot element in the browser
ReactDOM.render(template, appRoot)









// =========================
// NOTES
// =========================

// JSX - Javascript XML
// Is a javascript syntax extension
// It is not part of the core JS language.
// It is provided by React. React offers us a new way to define our templates and to inject data into those templates
// The browser doesn't understand JSX. But we will use Babel to compile JSX code

// BABEL
// https://babeljs.io
// Is a javascript compiler
// The most common use case for Babel is taking features from ES6 & ES7 and compiling them down to ES5 code