// CRUD create read update delete

// What comes back from the mongodb npm library is an object
// This is a native driver created by the mongodb company, allowing us to connect to a mongodb database from node.js
const mongodb = require('mongodb')
// The MongoClient gives us access to the function necessary to connect to the database so we can perform our four basic CRUD operations
const MongoClient = mongodb.MongoClient

// Define the connection URL and the database we're trying to connect to
// url: the local host that is up and running
// mongodb:// is mongodb's protocol
// 127.0.0.1 is the local host ip
// :27017 is the port #
const connectionURL = 'mongodb://127.0.0.1:27017'
// Can name it whatever you want
const databaseName = 'task-manager'

// To setup the connection
// The .connect() method is used to connect to a specific server (connectionURL)
// The callback function gets called once we're connected to the database
// This is an async operation
// Once the connection is open and remains active, the node process continues to stay up and running. Cntrl c to end the process
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    // Return early if an error occurs
    if (error) {
        return console.log('Unable to connect to database')
    }

    // What you get back when calling client.db() is a reference to a specific database you want to manipulate
    // The variable db is the ref to the database
    const db = client.db(databaseName)

    // To insert a single document into a collection
    // .collection() is a function and it expects the NAME of the collection you're trying to manipulate
    // We can call a method on that collection reference to insert a document: .insertOne()
    // .insertOne() expects the 1st arg as an object, which contains all the data you try to insert
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })
})


// =================
// NOTES
// =================

// TO USE MONGODB:
// const mongodb = require('mongodb')
//   - What comes back from the mongodb npm library is an object
//   - This is a native driver created by the mongodb company, allowing us to connect to a mongodb database from node.js
// const MongoClient = mongodb.MongoClient
//  - the MongoClient gives us access to the function necessary to connect to the database so we can perform our four basic CRUD operations

// To setup the connection:
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {  })
//  - The .connect() method is used to connect to a specific server (connectionURL)
//  - The callback function gets called once we're connected to the database
//  - This is an async operation
//  - Once the connection is open and remains active, the node process continues to stay up and running. Cntrl c to end the process
// const db = client.db(databaseName)
//  - use .db() method on client to get the connection for the specific database
//  - what you get back when calling client.db() is a reference to a specific database you want to manipulate
//  - the variable db is the ref to the database

// To insert a single document into a collection:
// db.collection('users').insertOne({
//     name: 'Andrew',
//     age: 27
// })
// To insert a single document into a collection
// .collection() is a function and it expects the NAME of the collection you're trying to manipulate
// We can call a method on that collection reference to insert a document: .insertOne()
// .insertOne() expects the 1st arg be an object, which contains all the data you try to insert. The data in the object is called field