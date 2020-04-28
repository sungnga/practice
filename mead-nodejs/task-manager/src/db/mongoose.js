const mongoose = require('mongoose')
const validator = require('validator')

// Connecting mongoose to the mongodb database
// The same localhost and port number as mongodb
// task-manager-api is the name of the database
// The collections will be saved to this database
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// Creating a new mongoose model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must a postive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(str) {
            if (str.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }      
    }
})

// Create an instance from the model
const me = new User({
    name: '    Nga   ',
    email: 'MYEMAIL@EMAIL.COM    ',
    password: 'test1234'
})

// The save() method doesn't take any args and returns a promise
me.save()
.then(() => {
    console.log(me)
})
.catch((error) => {
    console.log('Error!', error)
})

// Creating a Task model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: '    Eat breakfast'
})

task.save()
.then(() => {
    console.log(task)
})
.catch((error) => {
    console.log('Error!', error)
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