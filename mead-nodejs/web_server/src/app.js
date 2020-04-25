// express is actually a function
const express = require('express')

// Call express to create a new express application
const app = express()

// ROUTE HANDLER: Set up the server to send a response to a specific route
// Use a get() method on app. get() takes 2 arguments
// 1st arg is the route, the url
// 2nd arg is a callback function: describes what to do when someone visits this particular route
// The CALLBACK FUNCTION gets called w/ 2 important arguments
//  - 1. an object containing info about the incoming request to the server: commonly called 'req', short for request
//  - 2. A response: contains a bunch of methods allowing us to customize what we're going to send back to the requester. Commonly called 'res', short for response
// This lets us configure what the server should do when someone tries to get the resource at a specific URL (i.e. send back html or json)
app.get('', (req, res) => {
    // res.send() method allows us to send something back to the requester
    // Sending an html response back
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    // We're going to get a json response back
    // When express detects an object, it will automatically stringify the json. What we get back is the stringified version of the object we created
    // Can send back an array of objects as well
    res.send({
        name: 'Andrew',
        age: 27
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Partly cloudy',
        location: 'Seattle'
    })
})

// Last thing we need to do is start the server up
// listen() method on app will only ever use a single time in the application. This starts up the server and it has it listen on a specific port
// Port 3000 is the default port for local development environment, to view things on our local machine
// The 2nd argument is a callback function which runs when the server is up and running
// The process of starting up a server is an ASYNCHRONOUS PROCESS, though it happens almost instantly
// Once the server starts, it continues staying up and running, listening and processing new incoming requests
// We can shut down the web server with 'cntrl c'
app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 



// =====================
// NOTES
// =====================

// CLIENT SIDE:
// In the browser visit: localhost:3000. This went off to the server
//  The express server found the matching route and it processed the request using the route handler. Then the handler used res.send() method to send back a response to the user
// To visit a different route: localhost:3000/help
