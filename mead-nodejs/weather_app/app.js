const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('San Francisco', (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

forecast(44.1545, -75.7088, (error, data) => {
  console.log('Error', error);
  console.log('Data', data);
});



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
