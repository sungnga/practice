const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

// Set up a virtual property to create a relationship between the task and the user
userSchema.virtual('userTasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Hidding private data with toJSON method
userSchema.methods.toJSON = function () {
    const user = this

    const userObject = user.toObject()
    
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Generate a token
// The methods methods are accessible on the instance(user) methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

// The statics methods are accessible on the model(User) methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

// Define the User model
const User = mongoose.model('User', userSchema)

module.exports = User


// ===============
// NOTES
// ===============

// USE MONGOOSE MIDDLEWARE TO HASH A PASSWORD BEFORE SAVING
// mongoose middleware allows us to customize our mongoose model
// With middleware, we can register some functions to run before or after given events occur 
// Here, our job is to run some code before a user is saved. 
// In this case, we want to check if there's a plain text password and if there is, we want to hash it
// .pre() or .post() is doing something before or after an event
// We want .pre() because we want to perform a schema before 'saving' the user
// 1st arg: the name of the event
// 2nd arg: a callback function
// This callback checks to see if the user updates the password property using the .isModified() method from mongoose
// If the password has changed or first time created, update the user password with the hashed value
// userSchema.pre('save', async function (next) {
//     const user = this
//
//     // .isModified('password') is true when a new user is created because they have to provide a password and also true if a user updates their password
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//
//     next()
// })

// GENERATE AUTHENTICATION TOKENS
// To generate a token:
// The methods methods are accessible on the instance(user) methods
// userSchema.methods.generateAuthToken = async function () {
//     // We're calling this function on a specific user and we have access to that specific user via 'this'
//     const user = this
//     // Generate a token using jwt.sign()
//     const token = jwt.sign({ _id: user._id.toString() }, 'Thisismynodejscourse')
//
//     // Add this newly generated token to the user's tokens property
//     user.tokens = user.tokens.concat({ token })
//     // Call save to make sure the token get saved to the database
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
//         // When calling .generateAuthToken() method, 3 things happen:
//         // 1. it generates a new token and returns it to the user
//         // 2. it adds this token to the user's tokens property array
//         // 3. saves the token to the user's database
//         const token = await user.generateAuthToken()
//         // Send back the user data and the token
//         res.status(201).send({ user, token})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// HIDDING PRIVATE DATA
// When a mongoose document is passed to res.send(), mongoose converts the object into JSON string
// We can customize this by adding .toJSON as a method on the object
// userSchema.methods.toJSON = function () {
//     const user = this
//
//     // Get back an object with just user data
//     // .toObject() is a method provided by mongoose
//     const userObject = user.toObject()
    
//     // We can manipulate userObject to change what we want to expose
//     delete userObject.password
//     delete userObject.tokens
//
//     return userObject
// }

// VIRTUAL PROPERTY
// Set up a virtual property to create a relationship btween the task and the user
// A virtual property is not actual data stored in the datebase
// It's a relationship between two entities. In this case, between the user and the task
// .virtual() allows us to set up virtual attributes
// 1st arg: the name of the virtual field
// 2nd arg: an object. Here, we can configure the individual fields
// foreignField: owner is the name of the field on the Task model
// ref field is the reference to the Task model
// userSchema.virtual('userTasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })
