const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

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
    }
})

//
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

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
