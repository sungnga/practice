// require in core modules before npm modules
const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// The default folder to store all the templates is the 'views' folder
// We can customize this path, but we need to tell express where to look
// We need to create a new path
const viewsPath = path.join(__dirname, '../templates')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
// We need to point express to this custom directory (viewsPath) by calling another app.set()
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup to serve template pages
app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Nga La'
    })
})
 
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nga La'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'How can I help you?'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Partly cloudy',
        location: 'Seattle'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 



// =====================
// NOTES
// =====================

// const express = require('express')
// express is actually a method

// Call express to create a new express application
// const app = express()

// ROUTE HANDLER: Set up the server to send a response to a specific route
// Use a get() method on app. get() takes 2 arguments
// 1st arg is the route, the url
// 2nd arg is a callback function: describes what to do when someone visits this particular route
// The CALLBACK FUNCTION gets called w/ 2 important arguments
//  - 1. an object containing info about the incoming request to the server: commonly called 'req', short for request
//  - 2. A response: contains a bunch of methods allowing us to customize what we're going to send back to the requester. Commonly called 'res', short for response
// This lets us configure what the server should do when someone tries to get the resource at a specific URL (i.e. send back html or json)

// START AND RUNNING THE SERVER
// Last thing we need to do is start the server up
// listen() method on app will only ever use a single time in the application. This starts up the server and it has it listen on a specific port
// Port 3000 is the default port for local development environment, to view things on our local machine
// The 2nd argument is a callback function which runs when the server is up and running
// The process of starting up a server is an ASYNCHRONOUS PROCESS, though it happens almost instantly
// Once the server starts, it continues staying up and running, listening and processing new incoming requests
// We can shut down the web server with 'cntrl c'
// app.listen(3000, () => {})

// CLIENT SIDE
// In the browser visit: localhost:3000. This went off to the server
//  The express server found the matching route and it processed the request using the route handler. Then the handler used res.send() method to send back a response to the user
// To visit a different route: localhost:3000/help

// TEMPLATING ENGINE: HBS FOR EXPRESS
// handlebars allows us to render dynamic content. We can then set up the templates (which are very to html documents) and we can inject specifiy values inside
// hbs is a handlebars plugin for express, integrating handlebars into express. hbs is a VIEW ENGINE FOR EXPRESS
// app.set() is telling express which TEMPLATING ENGINE to use
// set() method allows you to set a value for a given express settings
// 1st arg: key, the setting name
// 2nd arg: value, the value we want to set. The name of the modole we installed
// When working with express, it expects all of the views, in this case the handlebars templates, to live in a specific folder called VIEWS. This views folder lives in the root of the app directory
// To SERVE UP the hbs template, need to set up a get() method route handler
// app.set('view engine', 'hbs')

// SERVING UP A TEMPLATE PAGE
// Set up a route handler using get() method to get the route path
// .render() method allows us to render one of our views
// We've configured express to use the view engine hbs. So with render(), we can a handlebars template
// When calling res.render(), express goes off and get that view. It then converts it to html and it makes sure that html gets to the requester
// 1st arg: the name(WITHOUT the extension) of the view to render
// 2nd arg: an object which contains all the values you want that view to be able to access
// To inject these values to the html template: use {{property_name}} inside a tag element
// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Nga La'
//     })
// })