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