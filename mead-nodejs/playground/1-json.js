const fs = require('fs')

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// // A JS method that takes a JS object and returns a json string representation
// const bookJSON = JSON.stringify(book)
// // 1st arg: create a json file
// // 2nd arg: the data we want to write
// fs.writeFileSync('1-json.json', bookJSON)
// console.log(bookJSON)

// // The opposite of JSON.stringify() method
// // Takes a json string and returns an object
// const parsedData = JSON.parse(bookJSON)
// console.log(parsedData.author)

// // What comes back is a buffer, not a string
// const dataBuffer = fs.readFileSync('1-json.json')
// // Call toString() method on the buffer to get a string represenation
// const dataJSON = dataBuffer.toString()
// // Parse the json data to an object
// const data = JSON.parse(dataJSON)
// console.log(data.title)


//
// Challenge: Work with JSON and the file system
//
// 1. Load and parse the JSON data
// 2. change the name and age property using your info
// 3. Stringify the changed object and overwrite the original data
// 4. Test your work by viewing data in the JSON file

// Read a file
const dataBuffer = fs.readFileSync('1-json.json')
// Convert buffer data to json string
const dataJSON = dataBuffer.toString()
// Parse json string to object
const user = JSON.parse(dataJSON)
// Update name property
user.name = 'Nga'
// Update age property
user.age = 99
// Convert object to json string
const userJSON = JSON.stringify(user)
// Write json string to file
fs.writeFileSync('1-json.json', userJSON)
