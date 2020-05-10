import React from 'react'
import ReactDOM from 'react-dom'
import IndecisionApp from './components/IndecisionApp'

ReactDOM.render(<IndecisionApp />, document.querySelector('#app'))



// ============================
// NOTES
// ============================

// ES6 Import/Export
// 2 types of exports:
// 1. default export: every file can have a single default export
// 2. named exports: can have as many named exports as you like

// To export named exports:
//  - export at the bottom of the file
//  - the export statement: export {} 
//  - define the named export inside the curly braces
//  - they are references to things we want to export
//  - note that the curly braces is not an object definition
//  - export { add, square };
// An alternative way to export a named export is to place the 'export' keyword in front of the variable declaration
//  - export const square = (x) => x * x;

// To import the named exports:
// Inside the file that wants to use the named exports, import the named exports inside the curly braces and provide the path to the file
// import { square, add } from './utils.js'
// Only import the named exports you want to use. No need to import them all
// Make sure the name in the import/export match each other
// The order inside the curly braces does not matter

// Default export:
//  - can only have a single default export
//  - attach 'as default' after the reference name
//  - export { refName as default }
//  - to access the default export, in the import file: import nameOfDefaultExport from 'path to file'
//  - don't include the curly braces when accessing the default export
//  - for default export, when importing, the name can be whatever you want
//  - importing default export and named exports: import anythingIWant, { add, square } from 'path to file'
//  - an alternative way of exporting default is to put it in a single expression. Can not use it with a statement
//  - const subtract = () => {...}  (a statement)
//  - export default subtract  (an expression. reference the subtract variable)

// IMPORTING NPM MODULES
// 3 steps process to working with npm modules: install -> import -> use
// Install a module:
//  - npm install react  (using the react library)
//  - npm install react-dom (this library renders the react components to the browser)
//  - this will install locally to the project
//  - it's saved as a dependency in package.json file with its version
//  - its code now lives in the node_modules folder
// Import a module:
//  - refer to the documentation of the package for how to import
//  - import React from 'react'
//  - import ReactDOM from 'react-dom'
//  - NOTE: we're grabbing the default export of React here. And we're not providing a relative path, so webpack will look for React in the node_modules folder
// Use a module:
//  - refer to the library doc to learn how to use it
//  - const template = React.createElement('p', {}, 'testing 123')
//  - ReactDOM.render(template, document.querySelector('#app'))

// SETTING UP BABEL WITH WEBPACK
// - We need to first configure Babel to work with webpack before we can use JSX in webpack
// - We do this by running babel-loader
// - Babel-loader allows us to run Babel in webpack under certain conditions
// - run: npm install @babel/core babel-loader @babel/preset-env @babel/preset-react
// -  Configure the babel-loader in webpack.config.js file. Babel will run all files that end in .js
// module.exports = {
//     entry: './src/app.js',
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [{
//             loader: 'babel-loader',
//             test: /\.js$/,
//             exclude: /node_modules/
//         }]
//     },
//     mode: 'development'
// }
//  - Create .babelrc file and include all the presets there
// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ]
// }
//  - Now we can use JSX
//  - run again to see JSX renders in the browser: npm run build

// SOURCE MAPS WITH WEBPACK
//  - Source maps is a great setup/config to debug errors in our code
//  - When an error occurs, it will point directly to the file that the error was generated
//  - If this was not set up, the error will point to the bundle.js file instead
//  - Setup the devtool property in webpack.config.js file:
//  - devtool: 'cheap-module-eval-source-map'

// WEBPACK DEV SERVER
//  - Webpack devServer is a replacment for Web Live Server but with webpack features such as the "webpack --watch"
//  - Install webpack devServer: npm install webpack-dev-server
//  - Setup the devServer property in webpack.config.js file:
// devServer: {
//     contentBase: path.join(__dirname, 'public')
// }
//  - Setup the script in package.json file:
// "scripts": {
//     "serve": "live-server public/",
//     "build": "webpack",
//     "dev-server": "webpack-dev-server"
// }
//  - Now with "dev-server" as a script, it'll run the Live devServer and webpack will "--watch" for any changes made to the files
//  - run: npm run dev-server
//  - It will specify the port it's running on: localhost:8080
//  - NOTE: When we run 'npm run build', it'll generate the bundle.js file. The file size is big. We do this when the app is ready for production. Otherwise, run: npm run dev-server during development mode

// ES6 CLASS PROPERTIES
//  - Install: npm install babel-plugin-transform-class-properties
//  - Configure in .babelrc file:
// {
//     "presets": [
//         "@babel/preset-env",
//         "@babel/preset-react"
//     ],
//     "plugins": [
//         "transform-class-properties"
//     ]
// }

// To use the new class syntax:
//  - This Babel plugin allows us to define a class component without having to setup a constructor function
//  - Instead, we can just setup a key/value pair to define properties for the class
//  - We're now able to set the state outside of the constructor function. state = { key: value }
//  - We're also able to set class properties to arrow functions
//  - This is a great candidate for things like event handlers. Event handlers usually have a problem maintaining the 'this' binding. But with arrow functions we no longer have to worry about this
//  - We can define methods as properties of the class using arrow functions instead of regular functions
//  - Arrow functions don't bind their own 'this' value. They're just going to use whatever 'this' is in scope
//  - And for arrow functions on class properties, that is the class instance itself
// Old syntax:
// class OldSyntax {
//     constructor() {
//         this.name = 'Mike'
//         this.getGreeting = this.getGreeting.bind(this)
//     }
//     getGreeting() {
//         return `My name is ${this.name}.`
//     }
// }
// const oldSyntax = new OldSyntax()
// const getGreeting = oldSyntax.getGreeting
// console.log(getGreeting())
// New syntax:
// class NewSyntax {
//     name = 'Jack'
//     getGreeting = () => {
//         return `My name is ${this.name}.`
//     }
// }
// const newSyntax = new NewSyntax()
// const newGetGreeting = newSyntax.getGreeting
// console.log(newGetGreeting())

// FINAL WEBPACK.CONFIG.JS FILE SETUP:
// const path = require('path')
//
// // where the entry point is -> output
// // to find out the absolute path, run: node webpack.config.js
// // console.log(__dirname) -> /Users/nga/Desktop/practice/reactjs/1-indecision-app
// // use node.js built-in module, path, to join the absolute path to the public folder
// console.log(path.join(__dirname, 'public')) 
//
// module.exports = {
//     entry: './src/app.js',
//     output: {
//         path: path.join(__dirname, 'public'),
//         filename: 'bundle.js'
//     },
//     module: {
//         rules: [{
//             loader: 'babel-loader',
//             test: /\.js$/,
//             exclude: /node_modules/
//         }]
//     },
//     devtool: 'cheap-module-eval-source-map',
//     devServer: {
//         contentBase: path.join(__dirname, 'public')
//     },
//     mode: 'development'
// }