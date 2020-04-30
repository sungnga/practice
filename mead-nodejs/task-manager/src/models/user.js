const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    }]
})

// To generate a token
// The methods methods are accessible on the instance methods
userSchema.methods.generateAuthToken = async function () {
    // We're calling this function on a specific user and we have access to that specific user via 'this'
    const user = this
    // Generate a token using jwt.sign()
    const token = jwt.sign({ _id: user._id.toString() }, 'Thisismynodejscourse')

    // Add this newly generated token to the user's tokens property
    user.tokens = user.tokens.concat({ token })
    // Call save to make sure the token get saved to the database
    await user.save()
    return token
}

// The statics methods are accessible on the model methods
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
// 1st arg: the name of the event
// 2nd arg: a callback function
// This callback checks to see if the user updates the password property using the .isModified() method from mongoose
// If the password has changed or first time created, update the user password with the hashed value
userSchema.pre('save', async function (next) {
    const user = this

    // .isModified('password') is true when a new user is created because they have to provide a password and also true if a user updates their password
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Define the User model
const User = mongoose.model('User', userSchema)

module.exports = User



// USE MONGOOSE MIDDLEWARE TO HASH A PASSWORD
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

// GENERATING AUTHENTICATION TOKENS
// To generate a token:
// The '.methods' methods are accessible on the instance methods
// userSchema.methods.generateAuthToken = async function () {
//     // We're calling this function on a specific user and we have access to that specific user via 'this'
//     const user = this
//     // Generate a token using jwt.sign()
//     const token = jwt.sign({ _id: user._id.toString() }, 'Thisismynodejscourse')

//     // Add this newly generated token to the user's tokens property
//     user.tokens = user.tokens.concat({ token })
//     // Call .save() to make sure the token get saved to the database
//     await user.save()
//     return token
// }

// Create a new user and generate an authentication token for this user:
// router.post('/users', async (req, res) => {
//     const user = new User(req.body)

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