const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Setup a REST API route handler for creating a new task
router.post('/tasks', auth, async (req, res) => {
    // console.log(req.body)
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=3&skip=0
// GET /tasks?sortBy=createdAt:desc
// mongoose enable these features under options property
router.get('/tasks', auth, async (req, res) => {
    // Start out with an empty match object
    const match = {}
    // Start out with an empty sort object
    const sort = {}

    // Check to see if the user provides additional query at endpoint
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        // Split the value of sortBy query
        const parts = req.query.sortBy.split(':')
        // Ternary operation
        // If condition is true, set to - 1 for sort by descending order
        // If condition is false, set to 1 for sort by ascending order
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    // The final match object gets passed into the .populate() method as a filter property
    // parseInt() method will parse the string into a number
    // Use limit and skip options to paginate your search result
    // limit: to limit the number of results we get back for any given request
    // skip: allows you to iterate over pages
    // sort: allows you to sort the result you get back
    // Use sort option to sort the result of your search
    // Can sort documents by its field names. Ascending order = 1. Descending order = -1
    //  - Example: sort: { createAt: -1 } to sort by descending ordder of when it was created
    // Here, the final sort object gets passed into the options property
    try {
        await req.user.populate({
            path: 'userTasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.userTasks)
    } catch (e) {
        res.status(500).send()
    }
})

// Fetch a task
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    
    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

// Update a task
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates"})
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete a task
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
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