const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// Creat a new user
// To test the url in postman: localhost:3000/users
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        // Save the newly created user
        await user.save()
        // Then generate a token for this new user
        // When calling .generateAuthToken() method, 4 things happen:
        // 1. it generates a new token and returns it to the user
        // 2. it adds this token to the user's tokens property array
        // 3. saves the token to the user's database
        // 4. the token is returned from the function
        const token = await user.generateAuthToken()
        // Send back the user data and the token
        res.status(201).send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Log in a user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Log out from a session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Log out from all sessions
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// Fetching/reading a user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// Updating a user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

// Delete a user
router.delete('/users/me', auth, async (req, res) => {
    try {
        // Since we're using auth middleware, we have access to the user object, hence we have access to user property: req.user._id
        // const user = await User.findByIdAndDelete(req.user._id)

        // if (!user) {
        //     return res.status(404).send()
        // }

        // We can achieve the same result as above by calling the .remove() method provided by mongoose
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router



// ROUTER SETUP:
// const express = require('express')
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('From a new file')
// })
// module.exports = router