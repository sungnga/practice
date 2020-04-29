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
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    // Use a try/catch block to handle errors if the promise is rejected
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

    // promise chaining is replaced with async/await
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
    
})

// Setting up route handler for fetching all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }

    // promise chaining is replaced with async/await
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((e) => {
    //     // status code of 500 is internal server error
    //     res.status(500).send()
    // })
})

// Fetching a user by its id
app.get('/users/:id', async (req, res) => {
    // console.log(req.params)

    // The id that the user provides
    const _id = req.params.id
        
    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    // promise chaining is replaced with async/await
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }

    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.patch('/users/:id', async (req, res) => {
    // Get all the keys/properties from req.body
    const updates = Object.keys(req.body)
    // A list of properties that are allowed for update
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // Check on each update item of the updates list that the user is trying to update against the properties in the allowedUpdates list
    // every() method will return true if ALL OF THE ITEMS in the updates match with allowedUpdates
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    // If the property name you're trying to update is not on the allowedUpdates list, return an error with a message 'Invalid updates'
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        // 1st arg: the id we're trying to update
        // 2nd arg: the updates we're trying to apply
        // 3rd arg: options we want to apply. 'new' is set to true means you get a new user. And run the validators
        // The variable user stores a new user with the update data
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

// Setup a REST API route handler for creating a new task
// Setup the resource creation endpoint: /tasks
app.post('/tasks', async (req, res) => {
    // console.log(req.body)
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // promise chaining is replaced with async/await
    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// Fetching all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }

    // promise chaining is replaced with async/await
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

// Fetching a task by its id
app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    // promise chaining is replaced with async/await
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
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

