// require in core modules before npm modules
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Creates an Express application
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
// registerPartials() method takes a path to the directory where partials live
// The partialsPath variable contains the path the handlebars module needs
hbs.registerPartials(partialsPath)

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
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Nga La'
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

// Express documentation: http://expressjs.com/en/4x/api.html

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
// 2nd arg: value, the value we want to set. The name of the module we installed
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
// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Nga La'
//     })
// })

// To inject these values to the html template:
//  - use { { property_name } } inside a element tag
// To render the values in a template:
//  - in the template file (index.hbs), which lives inside the 'views' folder which is inside the 'templates' directory, use 2 sets of curly braces with the proprety name inside the braces
//  - wrap these curly braces inside an element tag
//  - <h1>{{title}}</h1>

// CUSTOMIZING VIEWS DIRECTORY
// The default folder to store all the templates is the 'views' folder
// Create a new folder name that will contain all the templates ('templates' folder)
// We can customize this path, but we need to tell express where to look
// We need to create a new path
// const viewsPath = path.join(__dirname, '../templates')
// We need to point express to this custom directory (viewsPath) by calling another app.set()
// app.set('views', viewsPath)

// PARTIALS WITH HANDLEBARS
// Partials allow you to create a little template which is part of a bigger web page.
// Think about parts of the web page that you'er gonna end up REUSING across multiple pages in your site. This could be things like headers or footers where you want the exact same thing showing on every page
// With partials, can create a header and reuse it without needing to copy markup between all the page in your site

// To work with partials:
//  - in app.js file, load hbs module in for the first time(require in) and configure it
//  - create a folder called 'partials' inside the templates/views directory. This folder stores all the partial templates
//  - in app.js file, create a partial path

// To configure partials to tell express where to look:
//  - hbs.registerPartials(partialsPath)
//  - registerPartials() method takes a path to the directory where partials live
//  - the partialsPath variable contains the path the handlebars module needs

// To create a header partial:
//  - in partials folder, create file called header.hbs
//  - in here, we only create a partial tag elements that we can load into other handlebars files

// To render a partials:
//  - use 2 sets of curly braces like we did when adding a value into the template
//  - include a > sign and the file name inside the braces: {{>filename}} --> {{>header}}. Don't need to provide a complete path or the file extension
//  - can place these curly braces in any templates you want to render the partials

// NOTE: the server doesn't restart & pick up the changes when new templates are created. We can address this customizing the nodemon command. We can have nodemon RESTART when our JS file and hbs file changed
//  - tweak the nodemon command by adding the e flag (short for extensions) followed a comma-separated list of extensions that nodemon should watch for
//  - nodemon src/app.js -e js,hbs