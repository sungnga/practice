#!/usr/bin/env node

//run chmod +x index.js
//run npm init -y to generate the package.json file. In this file, create a new key called "bin" with the value as an object. In this object, include "watchit" as key & "index.js" as value
//run sudo npm link
//now you can use 'watchit' to execute the index.js file
//node.js documenation: nodejs.org/api

const chokidar = require('chokidar');

chokidar.watch('.')
    .on('add', () => console.log('FILE ADDED'))
    .on('change', () => console.log('FILE CHANGED'))
    .on('unlink', () => console.log('FILE UNLINKED'))





// **************************************
// PROJECT BRIEF
// **************************************
// To build a CLI tool similar to nodemon
// It keeps an eye on a file and reruns the file anytime it detects a change

// **************************************
// STRATEGIES FOR PROBLEMS IN THE PROJECT
// **************************************
// Need to detect when a file changes --> Use a package called 'chokidar' to detect file changes
// It would be nice to provide some help to users of our CLI tool --> Use a package called 'caporal' to build our CLI tool
// Need to figure out how to execute some JS code from within a JS program --> Use a standard library module 'child_process' to execute a program