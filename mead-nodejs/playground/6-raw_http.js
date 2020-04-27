const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=3f9d9ce1389e8aeb5ad2acd52dac539b&query=45,-75&units=f'

// The value we get back from the request method
const request = http.request(url, (response) => {
    let data = ''
    // response.on() is a function that allows us to register a handler
    // data is the event name. Data can come in in small chunks or all at once
    // chunck is a chunk of response that comes in
    // callback function gets run when data comes in, this could fire many times
    response.on('data', (chunk) => {
        // The old value for data plus the new chunk
        // To convert a buffer to a string using toString() method
        data = data + chunk.toString()

    })

    // Another function to handle when the response is done
    response.on('end', () => {
        //console.log(data)
        // To parse a json string to an object
        const body = JSON.parse(data)
        console.log(body)

    })
})

// Another event listener for error. This function runs when an error occurs
request.on('error', (error) => {
    console.log('An error', error)
})

// This function run when we have all the data
request.end()


// NOTES
// In the real world people aren't make requests with these core modules
// Instead use libraries like 'request' and 'axios' to make the request process much easier
// The core node modules are supposed to provide those low-leve implementation
// You're suppose to use npm modules to build out your applications