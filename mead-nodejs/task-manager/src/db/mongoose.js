const mongoose = require('mongoose')

// mongoose connects to the database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})



// ======================
// MONGOOSE
// ======================
// https://mongoosejs.com/
// Elegant mongodb object modeling for node.js

// CONNECTING MONGOOSE TO THE MONGODB DATABASE:
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
// The same localhost and port number as mongodb
// task-manager-api is the name of the database
// The collections will be saved to this database

// CREATE A MODEL
// Create a new model by calling the mongoose.model() function. It takes 2 arguments
// 1st arg: the name of the model in string format. Uppercase the first letter
// 2nd arg: an object which define the properties and their types of the model
// Setting the constructor function:
// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// Instantiating an instance of the model:
// By calling the User function with: new User()
// The new instance/user is called 'me'
// Pass in an object that contains the data for this particular user
// const me = new User({
//     name: 'Nga',
//     age: 99
// })

// To save the instance to the collection:
// Call the .save() method on the instance
// save() method returns a PROMISE
// Chain on the .then() and .catch() methods to resolve or reject the promise with a callback function
// me.save()
// .then(() => {
//     console.log(me)
// })
// .catch((error) => {
//     console.log('Error!', error)
// })

// VALIDATION
// Use the npm validator library to validate the data before saving to the database
// Mongoose SchemaType:
// https://mongoosejs.com/docs/schematypes.html#string-validators
//  - think of a Mongoose schema as the configuration object for a Mongoose model
//  - a SchemaType is then a configuration object for an individual property
//  - The following are all the valid SchemaTypes in Mongoose: 
//    - String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map

// REST API
// Representational State Transfer - Application Programming Interface
// An API is a set of tools that allows us to build software applications
// The REST API allows clients such as a web application to access and manipulate resources using a set of predefined operations
// Examples of a resource is like a user or a task
// Example of a predefined operation would be the ability to create a new task, mark a task as complete, upload a profile pic to user acct
// Predefined operations are going to allow a client like a web app to go through the process of creating a front-end for a task manager
// REST:
//  - Representational State Transfer
//  - we are getting and working with representations of our data so the data is stored in the database
//  - but using the REST API, we can still fetch data, manipulate data, and can perform all of those basic CRUD operations
//  - so we're working with representations of our users and tasks
//  - when it comes to state transfer, a REST API the server, it's stateless. The state has been transferred from the server to the client, so each request from the client such as a request from a web app contains everything needed for the server to actually process that request
//  - this includes the operation they're trying to perform, all of the data the operation actually needs in order to work, also includes things like authentication making sure that the user who's trying to perform the operation is actally able to do so

// In practice, the requests are made via HTTP requests, so this is how a client like a web app is going to be able to perform those predefined operations
// We have 2 parties - the client and the server:
// client: Need task data to show on this page
// It's going to make an HTTP request to a specific url on the server: GET /tasks/a77eaaa
// server: I find it in the database. In this case, looking for the task by id
// The server is going through the process of fulfilling it. It's going to find the data in the database
// It will send it back as part of the HTTP response: 200 - JSON response, with the data that was requested
// client: Time to render the data

// THE TASK RESOURCE
// In order for anyone to be able to do anyting meaningful with our API, we need to expose the necessary set of predefined operations for things like the CRUD operations
// EVERY SINGLE REST API OPERATION IS DEFINED WITH 2 PIECES OF DATA: THE HTTP METHOD AND THE PATH
// Create: POST /tasks
//  - Create allows you to create a new task
//  - POST is the HTTP method to post new data
//  - /tasks is the path to all the tasks
// Read: GET /tasks
// Read: GET /tasks/:id
//  - Read is to fetch a task or a list of tasks
//  - GET method is for getting existing data
//  - /tasks/:id is the path to a task by its id
// Update: PATCH /tasks/:id
//  - Update is to update our data
//  - PATCH method allows us to patch up our existing data
//  - /tasks/:id is the path to a task by its id
// Delete: DELETE /tasks/:id
//  - Delete allows you to delete a tasks or tasks
//  - DELETE method is deleting a task by its id
//  - /tasks/:id is the path