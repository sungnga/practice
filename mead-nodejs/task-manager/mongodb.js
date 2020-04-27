// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Destructuring properties off of the mongodb object
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// To generate a new id
const id = new ObjectID()
console.log(id)
console.log(id.id.length)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Andrew',
    //     age: 27
    // }, (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert user')
    //         }
            
    //         console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     }, {
    //         name: 'Brad',
    //         age: 26
    //     }
    // ], (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert documents!')
    //         }

    //         console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'wash dishes',
    //         completed: true
    //     }, {
    //         description: 'laundry',
    //         completed: false
    //     }, {
    //         description: 'cook',
    //         completed: true
    //     }
    // ], (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert tasks')
    //         }
    //         console.log(result.ops)
    // })
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
// const connectionURL = 'mongodb://127.0.0.1:27017'
//  - Define the connection URL and the database we're trying to connect to
//  - url: the local host that is up and running
//  - mongodb:// is mongodb's protocol
//  - 127.0.0.1 is the local host ip
//  - :27017 is the port #
// const databaseName = 'task-manager'
//  - Can name it whatever you want
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {  })
//  - The .connect() method is used to connect to a specific server (connectionURL)
//  - The callback function gets called once we're connected to the database
//  - This is an async operation
//  - Once the connection is open and remains active, the node process continues to stay up and running. Cntrl c to end the process
// const db = client.db(databaseName)
//  - use .db() method on client to get the connection for the specific database
//  - what you get back when calling client.db() is a reference to a specific database you want to manipulate
//  - the variable db is the ref to the database

// Inserting documents into a collection:
// db.collection('users').insertOne({
//     name: 'Andrew',
//     age: 27
// })
//  - .collection() is a function and it expects the NAME of the collection you're trying to manipulate
//  - we can call a method on that collection reference to insert a document: .insertOne()

// Insert a single document with .insertOne() method:
//  - .insertOne() is an async operation, so we need to handle any errors or confirm that the operation works as expected
//  - .insertOne() expects the 1st arg be an object, which contains all the data you try to insert. Each property in the object is a called field
//  - 2nd arg: is a callback function which is going to get called when the operation is complete. It gets called one of two potential arguments: 
//    - an error, if things went poorly
//    - result, if things went well. Result contains THE DATA & THE UNIQUE ID THAT IS ASSIGNED TO THE DOCUMENT(the individual items)
//  - result.ops contains an array of documents
// db.collection('users').insertOne({
//     name: 'Andrew',
//     age: 27
// }, (error, result) => {
//         if (error) {
//             return console.log('Unable to insert user')
//         }    
//         console.log(result.ops)
// })

// Insert multiple documents with .insertMany() method:
//  - 1st arg: is an array which contains a list of documents(items) you want to insert
//  - 2nd arg: is a callback function that takes 2 arguments: an error and a result(has the data and unique id)
// db.collection('users').insertMany([
//     {
//         name: 'Jen',
//         age: 28
//     }, {
//         name: 'Brad',
//         age: 26
//     }
// ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert documents!')
//         }
//         console.log(result.ops)
// })

// The ObjectId
// With mongodb, the ids are known as GUID which stands for Globally Unique Identifiers
// It's unique using an algorithm without needing the server to determine what then next unique id value is. No chance of an id collision across the database servers
// Can generate these unique ids for the documents before insert them into the database. So the server doesnt need to generate the ids
// The ObjectId is a 12-byte value