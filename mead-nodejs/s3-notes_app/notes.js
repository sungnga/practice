const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    // Store the existing data to notes variable
    const notes = loadNotes()

    // Prevents duplicate notes being added
    // Check to see if that title is already in use
    const duplicateNotes = notes.filter((note) => {
        // filter() returns a new array
        // if return is true, it will keep the note title in the new array
        return note.title === title
    })

    // If length of duplicateNotes array is 0, add that note and save notes
    if (duplicateNotes.length === 0) {
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

module.exports = { getNotes, addNote, removeNote };

