const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// Register a new middleware function with Express
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()

//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// To stop all route handers from running, just never call next()
// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance. Check back soon')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// .toJSON
// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))


// Creating relationships between the task and the user
const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('5eab61fd538d5758893cf98e')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // the 'userTasks' is is set up and defined in the user schema
    const user = await User.findById('5eab6114805ab5573259c869')
    await user.populate('userTasks').execPopulate()
    console.log(user.userTasks)
    
}    
main()



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

// A Typical workflow:
// 1. Create a router file inside a 'routers' directory. This is where you create a router and define the routes
//  - require in express library
//  - create a new router: const router = new express.Router()
//  - define the routes: router.get('', (req, res) => { })
//  - export the router module: module.exports = router
// 2. In the main index.js file, this is where you register all the routers you have to the Express application
//  - require in the router: const userRouter = require('..')
//  - register the router: app.use(userRouter)

// BCRYPT LIBRARY
// Bcrypt is a hashing algorithm that can convert a plain text to a hashed text
// We can use bcrypt to hash a password and store it securely in the database
// Bcrypt has the .hash() method to hash a text and the .compare() method to compare a given plain text against the hashed text
// There's a difference between hashing algorithm and encryption algorithm
// With encryption, we can get the original value back
// Hashing algorithms are one - way algorithms, which means we can't reverse the process

// The .hash() method:
// The .hash() method from bcrypt allows you to convert a plain text into a hashed text
// The .hash() takes in 2 args and returns a promise
//  - 1st arg: is the plain text password
//  - 2nd arg: the number of rounds we want to perform. Thisnumber determines how many times the hashing algorithm isexecuted. 8 is a good balance between security and speed
//  - The return value from the promise is hashed text
// const password = 'Red12345!'
// const hashedPassword = await bcrypt.hash(password, 8)

// The .compare() method:
// The .compare() method from bcrypt allows you to compare a plain text with the hashed text
// .compare() takes in 2 args and it returns a promise
//  - 1st arg: the plain text you want to compare
//  - 2nd arg: the hashed text
//  - The value from the promise is a boolean
// const isMatch = await bcrypt.compare('Red12345!', hashedPassword

// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)
//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }
// myFunction()

// JSON WEB TOKEN
// We need to set up the login request to send back an authentication token
// This is something that the requester will be able to use later on with other requests where they need to be authenticated
// So you could log in with your account, you'd get your token back. You would go off and edit your profile or create a new task, etc
// We'll be using a JSON Web Token library or JWT for creating these authentication tokens and validating them

// The .sign() method:
//  - The .sign() method will return a token
//  - 1st arg: the object contains the data that's going to be embedded in your token
//  - 2nd arg: the secret. This is used to sign the token making sure that it hasn't been tampered with or altered any way
//  - What we get back from .sign() is the token we end up giving back to the user who's trying to log in   
// const token = jwt.sign({ _id: 'abc123' }, 'thisismynewnodejscourse', {expiresIn: '7 days'}) 

// The .verify() method:
//  - .verify() method verifies the token
//  - 1st arg: the token you're trying to verify
//  - 2nd arg: the secret to use
//  - It returns the payload for the token if the token is valid or it will throw an error
//  - To verify, the secret must be the same for both
// const data = jwt.verify(token, 'thisismynewnodejscourse')

// const jwt = require('jsonwebtoken')
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewnodejscourse', {expiresIn: '7 days'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewnodejscourse')
//     console.log(data)
// }
// myFunction()

// GENERATING AUTHENTICATION TOKENS
// To generate a token:
// The '.methods' methods are accessible on the instance methods
// userSchema.methods.generateAuthToken = async function () {
//     // We're calling this function on a specific user and we have access to that specific user via 'this'
//     const user = this
//     // Generate a token using jwt.sign()
//     const token = jwt.sign({ _id: user._id.toString() }, 'Thisismynodejscourse')
//
//     // Add this newly generated token to the user's tokens property
//     user.tokens = user.tokens.concat({ token })
//     // Call .save() to make sure the token get saved to the database
//     await user.save()
//     return token
// }

// Create a new user and generate an authentication token for this user:
// router.post('/users', async (req, res) => {
//     const user = new User(req.body)
//
//     try {
//         // Save the newly created user
//         await user.save()
//         // Then generate a token for this new user
//         // When calling .generateAuthToken() method, 4 things happen:
//         // 1. it generates a new token and returns it to the user
//         // 2. it adds this token to the user's tokens property array
//         // 3. saves the token to the user's database
//         // 4. the token is returned from the function
//         const token = await user.generateAuthToken()
//         // Send back the user data and the token
//         res.status(201).send({ user, token})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// EXPRESS MIDDLEWARE
//
// Without middleware:  new request -> run route handler
//
// With middleware:     new request -> do something -> run route handler
//
// With middleware, we can customize the server to fit our needs
// We don't have to run the middleware for every incoming requests

// Registering a middleware with Express:
//  - Register a new middleware function to run using app.use()
//  - Pass in a custom function to run
//  - The 'req' and 'res' contain the same information as the route handlers
//  - The 3rd arg 'next' is specific to registering middleware
//  - Calling next() lets Express know that we're done with this middleware function. Don't need to pass in any args
// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     // next()

//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// AUTHENTICATIONS AS MIDDLEWARE
// We can add an authentication middleware to a route handler to authenticate a user who's trying to make a request to this endpoint
// This auth middleware(a function) gets passed as a 2nd argument in the route handler to check for authentication before the request is processed
// The middleware is usally created as a stand-alone function and is require in to the routes file that needs it