const path = require('path')
const http = require('http')
const express = require('express')
// Returns a function
const socketio = require('socket.io')

const app = express()

// Create a server that is outside of the Express library
// Then we configure it to use the Express app
const server = http.createServer(app)
// Create a new instance of socket.io
// Now our server supports webSocket
const io = socketio(server)

const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Print a message when a new client connects
// 1st arg: is the conncection event
// 2nd arg: a callback function
// socket is an object and it contains information about that new connection
// We can use methods on that socket to communicate with that client
// When we're working with socket.io and we're transferring data, we're sending and receiving what are called events
// All of your events are custom, fitting the needs of your application
// Use .on() method to listen for an event
// Use .emit() method to emit an event or data
io.on('connection', (socket) => {
    console.log('New  WebSocket connection')

    // Emit a welcome event to client
    socket.emit('message', 'Welcome!')

    // Listen for 'sendMessage' event
    // Have access to the message that gets passed to the callback
    socket.on('sendMessage', (message) => {
        // Send message to all connected clients
        io.emit('message', message)
    })
})

// Starting the server up
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// ================
// CHALLENGES
// ================
// GOAL: Create an Express web server
// 1. initialize npm & install Express
// 2. setup a new Express server
//    - serve up the public directory
//    - listen to port 3000
// 3. create index.html & render "Chat app" on the screen
// 4. test your work! Start the server & view the page in the browser

// GOAL: Setup scripts in package.js
// 1. create a "start" script to start the app using node
// 2. install nodemon and a development dependency
// 3. create a "dev" script to start the app using nodemon
// 4. run both scripts to test your work

// GOAL: Send a welcome message to new users
// 1. have server emit 'message' when new client connects
//  - send "Welcome!" as the event data
// 2. have client listen for 'message' event and print the message to console

// GOAL: Allow clients to send messages
// 1. create a form with an input and button
//  - similar to the weather app
// 2. setup event listener for form submission
//  - emit 'sendMessage' with input string as message data
// 3. haeve server listen for 'sendMessage'
//  - send message to all connected clients






// ===================
// NOTES
// ===================

// WEBSOCKETS
// https://socket.io
// Use websockets to build real-time web applications
// Like with the HTTP protocol, the webSocket protocol allows us to set up communication
//  - A server - a node.js application server - that starts up a server
//  - Clients - one or multiple clients can connect to this server

// The WebSocket Protocol:
// WebSockets allow for full-duplex communnication
//  - meaning, it's a bi - directional communication
// WebSocket is a separate protocol from HTTP
//  - The client can initiate comm with the server and the server can initiate comm with the client. 
//  - We don't have this with HTTP requests. The client initiates a request and the server responds
// Persistent connection between client and server
//  - When the client connects to the server, it stays connected as long as it needs to
//  - The comm between the client and the server is in real-time

// *******************************************
// SETUP EXPRESS WEB SERVER WITHOUT WEBSOCKET
// *******************************************
// const path = require('path')
// const express = require('express')

// const app = express()
// const port = process.env.PORT || 3000

// // Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, '../public')

// // Setup static directory to serve
// app.use(express.static(publicDirectoryPath))

// // Start up and run the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })
// *************************************************

// Configure Express server with socket.io library:
// Install the socket.io library: npm i socket.io
// We'll use this socket.io lib to make some changes to the server to support websockets
// Load in the HTTP core module: const http = require('http')
// Right after the Express app has been created
// Create a new server. With the http core module, we can call the .createServer() method to create a new server. Pass in the Express application (app) to the method
//  - const server = http.createServer(app)
// Now change the way the server starts up. Instead of calling app.listen(), call with server.listen()
// Require in the socket.io library: const socketio = require('socket.io'). We get back a function
// Create a new instance of socket.io to configure webSockets to work with our server
//  - const io = socketio(server)
//  - const io is a common name used
//  - we call the socketio() function to configure socket.io to work with a given server
//  - we pass in that server to the function
// Now our server(io) supports webSocket

// To print a message to the terminal when a given client connects:
// This means that the server is setting webSockets report correctly
// It also means the client is able to connect to the server
// And with this connection, we can facilitate real-time communication
//
// 1. The server-side of the socket.io library:
// io.on('connection', () => {
//     console.log('New  WebSocket connection')
// })
//  - io is the server
//  - .on() method to listen for a given event to occur
//  - 1st arg: the name of the event. In this case, the name of the event is called 'connection'
//  - connection is going to fire whenever the socket.io server gets a new connection
//  - 2nd arg: a callback function to run when that event occurs
//
// 2. The client-side of the socket.io library:
// When we set up a socket.io to work with a given server, it also provides a file for the client-side(the browser) version of the socket.io library
// To get this library, load the socket.io script inside the index.html file
//  - <script src="/socket.io/socket.io.js"></script>
//  - THIS IS THE CLIENT-SIDE VERSION OF THE SOCKET.IO LIBRARY
//  - when we load this in, our client-side javascript code will have access to all of the stuff from the library it needs in order to set up that comm
// Next, we need to create our own client-side javascript file to connect to the server using webSockets
//  - create a js folder in the public directly. In it, create a file called chat.js
//  - load this chat.js file into index.html file:
//  - <script src="/js/chat.js"></script>
//  - now that both of the js script and the socket.js script are loaded in index.html, the js file has access to the functionalities of the socket.io library
//  - inside the chat.js file, call the function io() to connect to the server



// ***************************************
// SETUP EXPRESS WEB SERVER WITH WEBSOCKET
// ***************************************
// const path = require('path')
// const http = require('http')
// const express = require('express')
// const socketio = require('socket.io')
//
// const app = express()
// const server = http.createServer(app)
// const io = socketio(server)
//
// const port = process.env.PORT || 3000
// const publicDirectoryPath = path.join(__dirname, '../public')
//
// app.use(express.static(publicDirectoryPath))
//
// io.on('connection', () => {
//     console.log('New  WebSocket connection')
// })
//
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`)
// })
// ***************************************

// Sending data to the client and receiving data from the client:
// socket is an object and it contains information about that new connection
// We can use methods on that socket to communicate with that client
// When we're working with socket.io and we're transferring data, we're sending and receiving what are called events
// All of your events are custom, fitting the needs of your application
// Use .on() method to listen for an event
// Use .emit() method to emit an event or data
// io.on('connection', (socket) => {
//     console.log('New  WebSocket connection')

//     // Create a 'countUpdated' event
//     // .emit() method emits an event from the server to the client
//     // Can call the event name anything you want. Put it in quotes
//     // Anything we provide after the event name argument is going to be available from the callback function on the client
//     // Here we're providing count for that callback
//     socket.emit('countUpdated', count)

//     // Use socket.on() method to listen for an incoming event
//     // 1st arg: the name of the event
//     // 2nd arg: a callback to run when the event name is triggered
//     // Use io.emit() instead of socket.emit() to send data back to the client ON ALL CONNECTIONS. DO THIS INSIDE THE CALLBACK FUNCTION
//     socket.on('increment', () => {
//         count++
//         // io.emit() will emit events to every single connections
//         io.emit('countUpdated', count)
//     })
// })

// To receive an event that the server sends:
// In chat.js file
// Make sure the name of the event matches with the name you created the event
// We have access to the data sent by the server in the callback function
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated', count)
// })
//
// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked')
//     // Sending data back to the server
//     // Create the name of the event
//     socket.emit('increment')
// })