const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// Configure express to automatically parse the incoming json to JS object
app.use(express.json())

// Setup a REST API route, the route for creating a new user
// Setup the resource creation endpoint: /users
// To test the url in postman: localhost:3000/users
app.post('/users', (req, res) => {
    // req.body contains the json response we get back
    // console.log(req.body)

    // Create a new user from the User model
    const user = new User(req.body)

    user.save().then(() => {
        // if the promise is resolved, save the user data to the database
        // sending the user a more detailed status code
        res.status(201).send(user)
    }).catch((e) => {
        // call the .status() method and pass in the status code
        // then call the .send() method to send the error value
        res.status(400).send(e)
    })
    
})

// Setup a REST API route handler for creating a new task
// Setup the resource creation endpoint: /tasks
app.post('/tasks', (req, res) => {
    // console.log(req.body)
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})




// ==================
// NOTES
// ==================

// PROJECT SETUP WORKFLOW
// Install express library: npm i express
// Install nodemon and save it as devDependencies: npm install nodemon --save-dev
// require in the express library: const express = require('express')
// create an express app: const app = express()
// setup port per Heroku or port 3000 for local development environment: const port = process.env.PORT || 3000
// call app.listen() to start and running the express web server
// setup the 'start' and 'dev' scripts in package.json file. Heroku will run 'start' to start our application
// run: npm run dev to make sure that the server is up and running on port 3000
// --------------
// Configure express to automatically parse the incoming json to JS object: app.use(express.json())

// Setup a REST API route, the route for creating a new user
// Setup the resource creation endpoint: /users
// To test the url in postman: localhost:3000/users
// app.post('/users', (req, res) => {
//     // req.body contains the json response we get back
//     console.log(req.body)
//
//     // Create a new user from the User model
//     const user = new User(req.body)
//
//     user.save().then(() => {
//         // if the promise is resolved, save the user data to the database
//         // sending the user a more detailed status code          
//         res.send(user)
//     }).catch((e) => {
//         // call the .status() method and pass in the status code
//         // then call the .send() method to send the error value
//         res.status(400).send(e)
//     })
// })
