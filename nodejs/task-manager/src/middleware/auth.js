const jwt = require('jsonwebtoken')
const User = require('../models/user')

// This auth function is a middleware that checks for user authentication
// This middleware runs when a user tries to make a request to a specific endpoint and the user has to be authenticated before the request is processed
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user

        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = auth


// ====================
// NOTES
// ====================

// ACCEPTING AUTHENTICATION TOKENS
// This auth function is a middleware that checks for user authentication
// This middleware runs when a user tries to make a request to a specific endpoint and the user has to be authenticated before the request is processed
// const auth = async (req, res, next) => {
//     try {
//         // Get the value for that header the client is supposed to provide by using req.header()
//         // Pass in the name of the header we're trying to access to
//         const token = req.header('Authorization').replace('Bearer ', '')
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
//         // Add a property called 'token' onto req so route handler has access to this user's token
//         req.token = token
//         // Give route handler the user this function fetched from the database. It already fetched them so there's no need for the route handler to fetch the user again
//         // Add a property called 'user' onto req so route handler has access to this user
//         req.user = user
//         // Let the route handler function run by calling next()
//         next()
//     } catch (e) {
//         // If the user is not authenticated send back an error
//         res.status(401).send({error: 'Please authenticate'})
//     }
// }