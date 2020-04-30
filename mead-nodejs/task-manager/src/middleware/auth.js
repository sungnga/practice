const jwt = require('jsonwebtoken')
const User = require('../models/user')

// This auth function is a middleware that checks a user's authentication
// This middleware runs when a user tries to make a request to a specific endpoint and the user has to be authenticated before the request is processed
const auth = async (req, res, next) => {
    try {
        // Get the value for that header the client is supposed to provide by using req.header()
        // Pass in the name of the header we're trying to access to
        const token = req.header('Authorization').replace('Bear ', '')
        // Validate that header by using .verify() method
        // 1st arg: the token you want to verify
        // 2nd arg: the secret that was used to create it
        const decoded = jwt.verify(token, 'Thisismynodejscourse')
        // Find the associated user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }

        // Give route handler the user this function fetched from the database. It already fetched them so there's no need for the route handler to fetch the user again
        // Add a property called 'user' on to req to store this user and route handler will have access to this
        req.user = user
        // Let the route handler function run by calling next()
        next()
    } catch (e) {
        // If the user is not authenticated send back an error
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth


// ====================
// NOTES
// ====================

// ACCEPTING AUTHENTICATION TOKENS
// This auth function is a middleware that checks a user's authentication
// This middleware runs when a user tries to make a request to a specific endpoint and the user has to be authenticated before the request is processed
// const auth = async (req, res, next) => {
//     try {
//         // Get the value for that header the client is supposed to provide by using req.header()
//         // Pass in the name of the header we're trying to access to
//         const token = req.header('Authorization').replace('Bear ', '')
//         // Validate that header by using .verify() method
//         // 1st arg: the token you want to verify
//         // 2nd arg: the secret that was used to create it
//         const decoded = jwt.verify(token, 'Thisismynodejscourse')
//         // Find the associated user
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
//        
//         if (!user) {
//             throw new Error()
//         }
//
//         // Give route handler the user this function fetched from the database. It already fetched them so there's no need for the route handler to fetch the user again
//         // Add a property called 'user' on to req to store this user and route handler will have access to this
//         req.user = user
//         // Let the route handler function run by calling next()
//         next()
//     } catch (e) {
//         // If the user is not authenticated send back an error
//         res.status(401).send({error: 'Please authenticate'})
//     }
// }