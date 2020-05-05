#!/usr/bin/env node

//run chmod +x index.js
//run npm init -y to generate the package.json file. In this file, create a new key called "bin" with the value as an object. In this object, include "watchit" as key & "index.js" as value
//run sudo npm link
//now you can use 'watchit' to execute the index.js file
//node.js documenation: nodejs.org/api

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const fs = require('fs');
//requiring just the spawn function here
const { spawn } = require('child_process');
//formatting text
const chalk = require('chalk'); 

program
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    .action(async ({filename}) => {
        //check to see if filename exists. If not, we'll default to using index.js
        const name = filename || 'index.js';
        try {       
            //check to see if the filename exists
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`Could not find the file ${name}`)
        }
        
        //the returned child process object
        let proc;
        const start = debounce(() => {
            //check to see if proc is already defined. If true, kill the child process
            if (proc) {
                proc.kill();
            }
            console.log(chalk.blueBright('>>>>>>>>>> Starting process...'));
            //whenever we call spawn(), we assign the returned child process to proc
            proc = spawn('node', [name], { stdio: 'inherit' });
        }, 100);
        
        chokidar.watch('.')
            //NOTE that we're just referencing 'start' and not invoking it
            .on('add', start)
            .on('change', start)
            .on('unlink', start)
    });

program.parse(process.argv);






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