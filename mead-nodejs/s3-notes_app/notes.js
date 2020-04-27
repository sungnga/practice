const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    // Store the existing data to notes variable
    const notes = loadNotes()

    // Prevents duplicate notes being added
    // Check to see if that title is already in use
    // NOTE: filter() method will loop through the ENTIRE LIST before it stops
    const duplicateNotes = notes.filter((note) => {
        // filter() returns a new array
        // if return is true, it will keep the note title in the new array
        return note.title === title
    })

    // NOTE: find() method to search for the FIRST duplicate note. It will stop running once it finds it
    // find() method will return undefined if no match is found
    const duplicateNote = notes.find((note) => {
        return note.title === title
    })

    // If no duplicateNote is found, add a note. Then save all notes using saveNotes() method
    if (!duplicateNote) {
        // Add a note to existing notes data
        notes.push({
            title, body
        })
        // Save all notes
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

// To remove a note
const removeNote = (title) => {
    // Load and store the existing notes to notes variable
    const notes = loadNotes()

    // Iterate on list of notes
    // The returned new array contains only list of notes that does not match the given title
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })
    
    if (notesToKeep.length !== notes.length) {
        console.log(chalk.green.inverse('Note removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'));
    }  
}

// To list notes
const listNotes = () => {
    // Load and store the existing notes to notes variable
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    // Looping through the notes list and print each note title
    notes.forEach((note) => {
        console.log(note.title)
    })
}

// Reading a note
const readNote = (title) => {
    const notes = loadNotes()

    // find() method loops through list of notes, find first matched title, return the found note object
    const findNote = notes.find((note) => {
        return note.title === title
    })

    if (findNote) {
        console.log(chalk.green(`${findNote.title}`))
        console.log((`${findNote.body}`))
    } else {
        console.log(chalk.red('Sorry no note found!'))
    }
}

// Helper function to load notes
// If first time around where there isn't a note.json file, return with an empty array
// Second time around, it will read the file and parse the data
const loadNotes = () => {
    try {
        // Reads the file
        const dataBuffer = fs.readFileSync('notes.json')
        // Convert buffer data to json string representation
        const dataJSON = dataBuffer.toString()
        // Parse json string to object
        return JSON.parse(dataJSON)
    } catch (e) {
        return [];
    }
}

// Save notes helper function
const saveNotes = (notes) => {
    // Takes the notes objects and turns it into json string representation
    const dataJSON = JSON.stringify(notes)
    // Write json string to file
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = { addNote, removeNote, listNotes, readNote };
