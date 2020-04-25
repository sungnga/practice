const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// CHALLENGE: ACCEPT LOCATION VIA COMMAND LINE ARGUMENT
// 1. Access the command line argument without yargs
// 2. Use the string value as the input for geocode
// 3. Only geocode if a location was provided

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    // Start out with an async operation
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error)
        }

        // Start another async operation
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

// CHALLENGE: USE BOTH DESTRUCTURING AND PROPERTY SHORTHAND IN WEATHER APP
// 1. Use destructuring in app.js, forecast.js, and geocode.js
// 2. Use property shorthand in forecast.js and geocode.js

// ==============
// NOTES
// ==============

// S30: CALL STACK, CALLBACK QUEUE, EVENT LOOP
// Call Stack:
// The call stack is a simple data structure provided by the V8 JS engine
// The job of the call stack is to track the execution of our program and it does that by keeping track of all of the functions that are currently running
// whenever we call a function, the function gets added onto the call stack
// When a function finishes by either running to the end or returning a value it gets removed from the call stack
// Your code is first wrapped inside a main() function that is defined by node.js. This main() function gets added to the call stack that allows the script to start executing

// Callback Queue:
// Its job is to maintain a list of all of the callback functions that art read to get executed
// When a given event is complete, the CALLBACK FUNCTION that is passed into the function, gets added on to the Callback Queue

// Event Loop:
// The event loop looks at 2 things: the Callback Queue and the Call Stack
// If the Call Stack is empty, it's going to run items in the Callback Queue

// Callback Function:
// A callback function is one that we define and pass in as an argument to setTimeout()
// A callback function is a function we provide as an argument to another function with the intention of having it called at some point in the future
// Now in this case we are using the callback pattern in an asynchronous way because setTimeout() is a node provided API and it is asynchronous
// NOTE: using a callback pattern DOES NOT mean it's actually asynchronous. If a function is not interacting with a native node API, it's a regular synchronous function

// CALLBACK CHAINING:
// Chaining together multiple callbacks to do multiple things in a specific order
// Start with geocode() async operation
// When it's done, the event loop makes sure the callback gets called
// Then another async operation - forecast(). Then waiting for that callback to finish
// Now we have the final data inside the callback function