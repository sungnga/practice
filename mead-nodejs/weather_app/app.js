const request = require('request')

// Geocoding
// Address -> Lat/Long -> Weather
// CHALLENGE 2: PRINT THE LAT/LONG FOR LOS ANGELES
// 1. Fire off a new request to the URL explored in browser
// 2. Have the request module parse it as JSON
// 3. Print both the latitude and longitude to the terminal

// CHALLENGE 3: HANDLE ERRORS FOR GEOCODING REQUEST
// 1. Setup an error handler for low-level errors
// 2. Test by disabling network request and running the app
// 3. Setup error handling for no matching results

const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3VuZ25nYSIsImEiOiJjazB2cW1kNTEwdXdwM2NvMDBmM2kxaTloIn0.fO_TBwhds2S0-PmbeL2nqw&limit=1'

request({ url: geocodeURL, json: true }, (err, res) => {
    if (err) {
        console.log('Unable to connect to location services!')
    } else if (res.body.features.length === 0) {
        console.log('Unable to find location. Try another search')
    }
    else {
        const data = res.body.features
        const latitude = data[0].center[1]
        const longitude = data[0].center[0]
        console.log(latitude, longitude)
    }
})


// CHALLENGE 1: PRINT A SMALL FORECAST TO THE USER
// 1. Print: "It is currently 9 degrees out. It feels like 5 degrees out."
// 2. Test your work!

const url = 'http://api.weatherstack.com/current?access_key=3f9d9ce1389e8aeb5ad2acd52dac539b&query=37.8267,-122.4233&units=f'

// json property set to true will parse the data for us
request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather service!')
  } else if (response.body.error) {
    console.log('Unable to find location')
  }
  else {
     const data = response.body.current
     console.log(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
  }
    
})




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