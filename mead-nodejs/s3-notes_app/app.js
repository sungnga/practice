// const validator = require('validator');
const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler() {
        console.log('Reading a note')
    }
})


// console.log(process.argv);

// It goes through the process of parsing the arguments with the detail config provided
yargs.parse()
// console.log(yargs.argv)


// TO USE THE APPLICATION
// In project directory run this in the command line:
// node app.js add --title="List" --body="clean, sleep" <-- will get an error message 'Note title taken!' if run this code again
// node app.js remove --title="List" <-- will get an error message 'No note found!' if run this code again
// Can see the list of notes in notes.json file

// CHALLENGE: ADD AN OPTION TO YARGS
// 1. setup a body option for the add command
// 2. Configure a description, make it required and for it to be a string
// 3. Log the body value in the handler function
// 4. Test your work!

// CHALLENGE: SETUP COMMAND OPTION AND FUNCTION
// 1. Setup the remove command to make a required '==title' option
// 2. Create and export a removeNote function from notes.js
// 3. Call removeNote in remove command handler
// 4. Test your work using: node app.js remove --title="some title". Console log the title

// CHALLENGE: WIRE UP REMOVENOTE
// 1. Load existing notes
// 2. Use array filter method to remove the matching note (if any)
// 3. Save the newly created array
// 4. Test your work with a title that exists and a title that doesn't exist

// CHALLENGE: USE CHALK TO PROVIDE USEFUL LOGS FOR REMOVE
// 1. If note is removed, print "Note removed!" with green background
// 2. if no note is removed, print "No note found!" with red background

// CHALLENGE: WIRE UP LIST COMMAND
// 1. Create and export listNotes from notes.js
//  - "Your notes" using chalk
//  - Print note title for each note (use forEach loop
// 2. Call listNotes from command handler
// 3. Test your work!

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
// It will create the node module folder based off of the content in the 'package-lock.json' and 'package.json' files