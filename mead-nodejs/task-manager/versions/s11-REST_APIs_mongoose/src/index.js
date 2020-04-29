const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

// This index.js file creates an Express app and gets it up and running
// But what the Express app actually does is defined in the router files - router for user and router for task

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

// Fetching a user by its id:
// app.get('/users/:id', (req, res) => {
//     // req.params contains the value that the user passed in in place of the :id 
//     // What's returned is an object that contains the property name (in this case, id) and the value the user provided
//     // { id: 12345 }
//     console.log(req.params)
//
//     // The id that the user provides
//     const _id = req.params.id
//
//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }
//
//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// CONVERTING THE EXPRESS APP ROUTE HANDLERS TO ASYNC/AWAIT
// Mark the function as an async function by using the 'async' keyword in front of the function declaration
// Use the try/catch block to catch any errors if the async operation failed
// Run the code in the try block if the promise is resolved
// Run the catch block if the promise is rejected
// app.get('/tasks/:id', async (req, res) => {
//     const _id = req.params.id
//   
//     try {
//         const task = await Task.findById(_id)
//
//         if (!task) {
//             return res.status(404).send()
//         }
//
//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// }

// Updating a user by its id:
// app.patch('/users/:id', async (req, res) => {
//     // Get all the keys/properties from req.body
//     const updates = Object.keys(req.body)
//     // A list of properties that are allowed for update
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     // Check on each update item of the updates list that the user is trying to update against the properties in the allowedUpdates list
//     // every() method will return true if ALL OF THE ITEMS in the updates match with allowedUpdates
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//
//     // If the property name you're trying to update is not on the allowedUpdates list, return an error with a message 'Invalid updates'
//     if (!isValidOperation) {
//         return res.status(400).send({error: 'Invalid updates!'})
//     }
//
//     try {
//         // 1st arg: the id we're trying to update
//         // 2nd arg: the updates we're trying to apply
//         // 3rd arg: options we want to apply. 'new' is set to true means you get a new user. And run the validators
//         // The variable user stores a new user with the update data    
//         const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//      
//         if (!user) {
//             return res.status(404).send()
//         }
//
//         res.send(user)
//     } catch (e) {
//         res.status(400).send()
//     }
// })

// Delete a user by its id:
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//
//         if (!user) {
//             return res.status(404).send()
//         }
//
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// SEPARATE ALL THE ROUTES TO SEPARATE FILES BY THEIR RESOURCE
// We want one file which contains all of the routes for users and another file which contains all of the routes for tasks
// We'll be setting up multiple express routers and then combining them together to create the complete application
// Can have as many routers as you need, but it's best to categorize them by the resource
// In our case, we'll have a new router for the user related routes. A separate new router for the task related routes
// As we create more functionalities to the application, we can create more routes to stay organized

// THE BASIC SYNTAX FOR CREATING A ROUTER
//  - 1. Create a new router (in separate file)
//  - 2. Setup/define those routes (in separate file)
//  - 3. Register it with the express application (in index.js file)
// Perform these steps for each separate router
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })
// app.use(router)

// We CREATE a new router by using the 'new' operator followed by the express.Router() function
// The new router is stored in the variable 'router'
// const router = new express.Router()

// We don't pass in anything to .Router(). Instead, we use methods on router to customize it
// router has access to .post(), .get(), .patch, .delete() methods
// router.get('/test', (req, res) => {
//     console.log('This is from my other router')
// })

// After the router is created, we need to REGISTER it to work with our existing Express application
// app.use(router)

// A TYPICAL WORKFLOW:
// 1. Create a router file inside a 'routers' directory. This is where you create a router and define the routes
//  - require in express library
//  - create a new router: const router = new express.Router()
//  - define the routes: router.get('', (req, res) => { })
//  - export the router module: module.exports = router
// 2. In the main index.js file, this is where you register all the routers you have to the Express application
//  - require in the router: const userRouter = require('..')
//  - register the router: app.use(userRouter)