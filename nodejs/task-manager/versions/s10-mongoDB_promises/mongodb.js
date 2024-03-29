// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// Destructuring properties off of the mongodb object
const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)


    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    }, (error, result) => {
            if (error) {
                return console.log('Unable to insert user')
            }    
            console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        }, {
            name: 'Brad',
            age: 26
        }
    ], (error, result) => {
            if (error) {
                return console.log('Unable to insert documents!')
            }
            console.log(result.ops)
    })  
    
    db.collection('tasks').findOne({ _id: new ObjectID("5ea733a5f6d84b2a01f6b56b") }, (error, task) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })    

    db.collection('tasks').updateOne({
        description: "laundry"
    }, {
        $set: { completed: false }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({
        cook: false
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
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
//  - the MongoClient gives us access to the FUNCTION necessary to connect to the database so we can perform our four basic CRUD operations

// SETTING UP THE CONNECTION:
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

// INSERT(CREATE) DOCUMENTS IN A COLLECTION WITH insertOne() & insertMany()
// db.collection('users').insertOne({
//     name: 'Andrew',
//     age: 27
// })
//  - .collection() is a function and it expects the NAME of the collection you're trying to manipulate
//  - we can call a method on that collection reference to insert a document: .insertOne()

// The .insertOne() method:
// Inserting a single document
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

// The .insertMany() method:
// Inserting multiple documents at once
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

// THE ObjectId
// With mongodb, the ids are known as GUID which stands for Globally Unique Identifiers
// It's unique using an algorithm without needing the server to determine what then next unique id value is. No chance of an id collision across the database servers
// Can generate these unique ids for the documents before insert them into the database. So the server doesnt need to generate the ids
// The ObjectId is a 12-byte value

// QUERYING(READ) DOCUMENTS WITH findOne() & find()
// 2 methods to fetch data out of the database: find() and findOne()

// The .findOne() method:
//  - .findOne() accepts two required args
//  - 1st arg: an object. Is used to specify the search criteria
//  - 2nd arg: a callback. It gets called when the operation is complete. It takes either an error or the document it gets back
//  - If no document is found based on the search criteria, it will return 'null', because it successfully searched through the collection
//  - With .findOne() method, if the search matches multiple documents it will return the first one it finds
// db.collection('tasks').findOne({ _id: new ObjectID("5ea733a5f6d84b2a01f6b56b") }, (error, task) => {
//     if (error) {
//         return console.log('Unable to fetch')
//     }
//     console.log(task)
// })

// To search by ObjectId:
// .findOne({ _id : new ObjectID("5ea733a5f6d84b2a01f6b56c")}, (error, user) => {  }
//  - call the 'new ObjectID()' method and pass in the id value

// The .find() method:
//  - .find() takes in the query object
//  - It returns a Curser. It is a pointer to data
//  - We can call different methods on the curser to refine the data we want to get back
//  - The method takes a CALLBACK FUNCTION, which returns either an error or the documents
// db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
//     console.log(tasks)
// })

// THE CALLBACK PATTERN
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         // callback('An error has occurred!', undefined)
//         callback(undefined, [1, 2, 3])
//     }, 3000)
// }

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error)
//     }

//     console.log(result)
// })


// TO CREATE A PROMISE:
// new Promise() <-This is a new promise constructor function
// Typically a promise is created by the library we use
// doWorkCallback is a promise
// The promise takes in a function. This function gets called by the promise API and we get access to 2 arguments
// 1st arg: resolve. This means things went well and you can pass in a value to the resolve() function
// 2nd arg: reject. The promise has been rejected. Can pass in a value to the reject() function
// resolve() gets called if things went well. reject() gets called when it didn't
// Then the callback function inside .then() method runs if resolve() is called
// The callback function inside the .catch() method runs if reject() is called
// We can only call either 'resolve' or 'reject'. But can't call both and can't call one of them twice
// Once resolve() or reject() is called, the promise is done and its value or state can't change
// const doWorkCallback = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([1, 3, 5])
//         reject('Something went wrong!')
//     }, 2000)
// })

// A promise is an object with a few methods we can access
// .then() method allows us to register a function when things went well
// So when resolve() gets called, the callback function passed into the .then() method will run
// In this callback function, we get access to the data that the promise resolved with. The data in this case is [1, 3, 5]. This data is stored in the param 'result'
// .catch() method allows us to register a function to run when the reject() method is called
// Inside this callback function we get access to the error value in the reject() method. The error value is stored in the param 'error'
// doWorkCallback.then((result) => {
//     console.log('Success!', result)
// }).catch((error) => {
//     console.log('Error!', error)
// })


//                                    (resolve)  
//                                    fulfilled  
//                                  /
// Promise         -- pending -->  
//                                  \
//                                    rejected  
//                                    (reject)

// UPDATING DOCUMENTS WITH updateOne() & updateMany()
// The updateOne() method:
// The updateOne() method searches for a single document and updates it with the new specified data
// 1st arg: the filter object. The Filter used to select the document to update
// 2nd arg: the upate object. The update operations to be applied to the document. $set, $inc, etc
// 3rd arg: a callback. HOWEVER, A PROMISE IS RETURNED IF NO CALLBACK PASSED IN
// When a PROMISE is returned:
//  - you can chain on a .then() method and pass in a callback to be invoked when the promise is resolved. The callback has access to the resolved value
//  - next, chain on a .catch() method and pass in a callback to run when the promise is rejected. The callback has access to the error value
// db.collection('tasks').updateOne({
//     description: "laundry"
// }, {
//     $set: { completed: false }
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// The updateMany() method:
// updateMany(filterObject, updateObject, options, callback)
// The updateMany() method works very similar to the updateOne() method
// However it can search and update multiple documents at once
// db.collection('tasks').updateMany({
        
//     completed: false
// }, {
//         $set:
//     { completed: true}
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

// DELETING DOCUMENTS WITH deleteOne() & deleteMany()
// The deleteOne() method deletes one document with the matching criteria
// The deleteMany() method deletes multiple documents that match the criteria
// 1st arg: the filter object. The Filter used to select the document to update
// 2nd arg: a callback. HOWEVER, A PROMISE IS RETURNED IF NO CALLBACK PASSED IN
// Chain on the .then() and .catch() methods to resolve or reject the promise with a callback function
// db.collection('users').deleteMany({
//     age: 27
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })
