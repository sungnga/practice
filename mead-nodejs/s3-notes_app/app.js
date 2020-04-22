// const validator = require('validator');
const getNotes = require('./notes.js');
const chalk = require('chalk');

const msg = getNotes();
console.log(msg);

console.log(chalk.green.bold.inverse('Success!'));



// =============
// NOTES
// =============
// NPM PACKAGES
// 2 steps to use npm packages in an application
// 1. Run 'npm init' in the project directory to initialize npm.
// This will create a package.json file. This file is used to manage all the dependencies that our application needs to run. Here we list all the npm packages we want to use
// 2. Go to 'npmjs.com' to search for a package you want to use. 
// It has the documenation of how to use the package, how to install it, and version number
// Example of installing a npm package: npm install validator@13.0.0
// Need to require in the npm package in order to use its functionalities

// TO RECREATE THE NODE MODULE FOLDER
// Run 'npm install' in the application directory
// It will create the node module folder base off of the content in the 'package-lock.json' and 'package.json' files