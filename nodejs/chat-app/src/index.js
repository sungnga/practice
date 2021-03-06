const path = require('path')
const http = require('http')
const express = require('express')
// Returns a function
const socketio = require('socket.io')
const Filter = require('bad-words')
// Require will return that object that we exported
// Use destructuring to grab the property we want to use
// generateMessage is a function. So we can call this function anywhere inside our code
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

// Create an Express application
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

// Run some code when a new user is connected
// io.on('connection', ...) means the server is listening for the 'connection' event
// 1st arg: is the conncection event
// 'connection' event is a built-in event from socket.io
// 2nd arg: a callback function to run when a new user is connected
// socket is an object and it contains information about that new connection
// We can use methods on that socket to communicate with that client
// Use .on() method to listen for an event
// Use .emit() method to emit an event and the data along with it
// socket.emit(), io.emit(), socket.broadcast.emit()
// io.to().emit() emits an event to everybody in a specific room
// socket.broadcast.to().emit() emits an event to everybody except this particular socket in a specific room
io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    // Listen for 'join' event
    // The object we get back is destructured with username and room
    // Pass in an acknowledgement callback to let the user know if they have successfully joined the room
    socket.on('join', ({ username, room }, callback) => {
        // If a user is successfully able to join the room, the user is stored in the variable user. If unable to join, an error is returned
        // Destructuring the error and user properties because addUser function returns AN OBJECT
        // NOTE: the error value is handled in the addUser function
        const { error, user } = addUser({ id: socket.id, username, room })

        // If error, return early and send acknowledgement to user with the error
        if (error) {
            return callback(error)
        }

        // The user/client joins the room
        socket.join(user.room)
        // Emits a welcome message to this new user who just joined the room
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        // Emits the message to this room
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))  
        // Emit a 'roomData' event to everybody including the new user
        // The data is an object that has the room and list of users
        // Call getUsersInRoom function to get a list of users in a specific room
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        // Send an acknowledgement to the user when they successfully joined
        callback()
    })

    // Listen for 'sendMessage' event
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    // Share your location
    socket.on('sendLocation', (latitude, longitude, callback) => {
        const user = getUser(socket.id)
        const url = `https://google.com/maps?q=${latitude},${longitude}`
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, url))
        callback()
    })

    // Listening for 'disconnect' event
    socket.on('disconnect', () => {
        // Remove user from the chat room when they disconnect
        const user = removeUser(socket.id)

        // Emit a message to the chat room that this user has left
        if (user) {
            // Emit a 'message' event to everybody in the room
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            // Emit a 'roomData' event to everybody
            // The data is an object that has the room and list of users
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }        
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

// GOAL: Share coordinates with other users
// 1. have client emit 'sendLocation' with an object as the data
//  - object should contain latitude and longitude properties
// 2. server should listen for 'sendLocation'
//  - when fired, send a 'message' to all connected clients "Location: long, lat"

// GOAL: Setup acknowledgement
// 1. set up the client acknowlegement function
// 2. set up the  server to send back the acknowledgement
// 3. have the client print "Location shared!" when acknowledged

// GOAL: Disable the send location button while location being sent
// 1. set up a selector at the top of the file
// 2. disable the button just before getting the current position
// 3. Enable the button in the acknowledge callback

// GOAL: Create a separate event for location sharing messages
// 1. have server emit 'locationMessage' with the URL
// 2. have the client listen for 'locationMessage' and print the URL to the console

// GOAL: Duplicate the message template
// 1. duplicate the message template
//  - change the id to something else
// 2. add a link inside the paragraph with the link text "My current location"
//  - URL to link shoul dbe the maps URL (dynamic)
// 3. select the template from javascript
// 4. render the template with the URL and append to messages list

// GOAL: Add timestamps for location messages
// 1. create generateLocationMessage and export
//  - { url: '', createAt: 0 }
// 2. use generateLocationMessage when server emits locationMessage
// 3. Update template to render time before the url
// 4. Compile the template with the URL and the formatted time

// GOAL: Send messages to correct room
// 1. use getUser inside 'sendMessage' event handler to get user data
// 2. emit the message to their current room
// 3. test your work!
// 4. repeat for 'sendLocation' event

// GOAL: Render username for text messages
// 1. setup the server to send username to client
// 2. edit every call to 'generateMessage' to include username
//  - use "Admin" for sts messages like connect/welcome/disconnect
// 3. update client to render username in template



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
//
// const app = express()
// const port = process.env.PORT || 3000
//
// // Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, '../public')
//
// // Setup static directory to serve
// app.use(express.static(publicDirectoryPath))
//
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

// -----------------------------
// Sending data to the client and receiving data from the client:
// 
// On server side:
// socket is an object and it contains information about that new connection
// We can use methods on that socket to communicate with that client
// When we're working with socket.io and we're transferring data, we're sending and receiving what are called events
// All of your events are custom, fitting the needs of your application
// Use .on() method to listen for an event
// Use .emit() method to emit an event or data
// io.on('connection', (socket) => {
//     console.log('New  WebSocket connection')
//
//     // Create a 'countUpdated' event
//     // .emit() method emits an event from the server to the client
//     // Can call the event name anything you want. Put it in quotes
//     // Anything we provide after the event name argument is going to be available from the callback function on the client
//     // Here we're providing count for that callback
//     socket.emit('countUpdated', count)
//
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

// To receive an event/data from the server:
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
// -----------------------------

// 3 ways to emit an event:
// 1. socket.emit() is to emit to this particular socket
//  - socket.emit('message', 'Welcome!')
// 2. socket.broadcast.emit() is to emit to everybody BUT this particular socket
//  - socket.broadcast.emit('message', 'A new user has joined')
// 3. io.emit() is to emit to everyone
//  - io.emit('message', message)

// To disconnect a client:
// socket.on('disconnect', ...) means listening for a disconnect event
// 'disconnect' event is a built-in event from socket.io
// 2nd arg: this callback function runs when the 'disconnect' event is triggered
// socket.on('disconnect', () => {
//     // io.emit() emits an event to everybody
//     // In this case, notifying everybody that a user has left
//     io.emit('message', 'A user has left!')
// })

// To share a location on google maps:
// https://google.com/maps?q=<lat>,<long>
// server side::
// socket.on('sendLocation', (latitude, longitude) => {
//     io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`)
// })
//
// client side::
// document.querySelector('#send-location').addEventListener('click', () => {
//     if (!navigator.geolocation) {
//         return alert('Geolation is not supported')
//     }
//
//     navigator.geolocation.getCurrentPosition((position) => {
//         const latitude = position.coords.latitude
//         const longitude = position.coords.longitude
//         socket.emit('sendLocation', latitude, longitude)
//     })
// }) 

// EVENT ACKNOWLEDGEMENT
// server (emit) -> client (receive)    --client sends acknowledgement--> server
// client (emit) -> server (receive)    --server sends acknowledgement--> client
// Whoever emits the event SETS UP A CALLBACK function as a 3rd arg
// Whoever receives the event RECEIVES THE CALLBACK which is passed in as 2nd arg in the original callback function. Then call that function inside the orginal callback

// Rendering message template:
// 1. Import the Mustache library script into index.html file
//  - this library is used to render our message templates
// 2. Define the message template index.html file
    // <script id="message-template" type="text/html">
    //     <div>
    //         <p>{{message}}</p>
    //     </div>
    // </script> 
// 3. Create a new html tag that the Mustache lib will render the message dynamically
    // <div id="messages"></div>
// 4. Select the message div tag and the message template from Javascript. In JS chat.js file
    // const $messages = document.querySelector('#messages')
    // const messageTemplate = document.querySelector('#message-template').innerHTML
// 5. Set up HTML to render the message inside the socket.io('event', ...) where the message is received
    // socket.on('message', (message) => {
    //     console.log(message)
    //     // Render the message template with the data given in the 2nd arg
    //     const html = Mustache.render(messageTemplate, {
    //         message
    //     })
    //     // This is where we insert the incoming message, inside the div tag
    //     $messages.insertAdjacentHTML('beforeend', html)
    // })
// 6. Setup the message template to render the message dynamically. Mustache will be able to replace what's inside the p tag with the incoming message
    // <p>{{message}}</p>
// 7. To render the data dynamically, provide the data as a 2nd arg to .render() method
    // Here, we pass in the data into the template. Mustache will render it
    // const html = Mustache.render(messageTemplate, { message })

// TIMESTAMPS
// https://momentjs.com
// To generate a timestamp:  const newTime  = new Date().getTime()
// Load the moment library script in index.html
// Use the moment library in the Javascript chat.js file
    // const html = Mustache.render(messageTemplate, {
    //     message: message.text,
    //     createdAt: moment(message.createdAt).format('h:mm a')
    // })
