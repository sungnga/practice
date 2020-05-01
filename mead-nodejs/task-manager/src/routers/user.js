const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')

// Creat a new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
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
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// Register multer middleware
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }

        cb(undefined, true)
    }
})


// Upload a profile picture
// Multer middleware processes the upload file. It then passes that data to route handler
// Normalize the image using sharp library
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // The upload image data is stored in req.file.buffer. We have access to this info because we didn't set up the file upload destination in multer middleware 
    // Normalize the upload image to standard file size and file type with sharp
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    // After the image has been normalized, store the buffer data onto the user 'avatar' field
    req.user.avatar = buffer

    // Then save the user profile since we just made a change to it
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// Delete a profile image
router.delete('/users/me/avatar', auth, async (req, res) => {
    // This will clear the avatar field
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// Fetch user profile image by their id
// localhost:3000/users/user_id/avatar to view the image
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        // Tell the requester what type of data they're getting back by setting the response header
        // Use the .set() method on the response(res) object and it takes 2 args, a key/value pair
        // 1st arg: the key name of the response header
        // 2nd arg: the value of the response header
        res.set('Content-Type', 'image/png')
        // This allows the user to access the image by their id
        res.send(user.avatar)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router


// ====================
// NOTES
// ====================

// ROUTER SETUP:
// const express = require('express')
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('From a new file')
// })
// module.exports = router

// FILE UPLOADS WITH MULTER
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
// Multer will not process any form which is not multipart(multipart/form-data)

// USING MULTER
// const multer = require('multer')

// Register multer:
//  - Call multer() to create a new instance of it. 'upload' is the conventional name used
//  - dest is short for destination and the name of folder to upload to
// - Use limits property to limit the size of the upload file
//  - Use fileFilter FUNCTION to filter file type
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a word document'))
//         }
//
//         cb(undefined, true)
//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// Route handler to upload a profile image:
//  - Use post method to upload images
//  - upload.single() - upload is the instance of multer and can call .single() method on it
//  - What you pass in to .single() method is the name of the key
//  - To handle Express error message, we need pass in a 4th argument to route handler. It's a callback funtion that contains the error message
//  - Multer middleware processes the upload file. It then passes that data to route handler
//  - Normalize the image using sharp library
// router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
//     // The upload image data is stored in req.file.buffer. We have access to this info because we didn't set up the file upload destination in multer middleware 
//     // Normalize the upload image to standard file size and file type with sharp
//     const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
//
//     // After the image has been normalized, store the buffer data onto the user 'avatar' field
//     req.user.avatar = buffer
//
//     // Then save the user profile since we just made a change to it
//     await req.user.save()
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({error: error.message})
// })
//
// Delete a profile image:
// router.delete('/users/me/avatar', auth, async (req, res) => {
//     // This will clear the avatar field
//     req.user.avatar = undefined
//     await req.user.save()
//     res.send()
// })

// Fetch user profile image by their id:
// localhost:3000/users/user_id/avatar to view the image
// router.get('/users/:id/avatar', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//
//         if (!user || !user.avatar) {
//             throw new Error()
//         }
//
//         // Tell the requester what type of data they're getting back by setting the response header
//         // Use the .set() method on the response(res) object and it takes 2 args, a key/value pair
//         // 1st arg: the key name of the response header
//         // 2nd arg: the value of the response header
//         res.set('Content-Type', 'image/png')
//         // This allows the user to access the image by their id
//         res.send(user.avatar)
//     } catch (e) {
//         res.status(400).send()
//     }
// })
