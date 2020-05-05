setTimeout(() => {
    console.log('Two second timer')
}, 2000)

const geocode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
    
        callback(data)
    }, 2000)
}

geocode('Seattle', (data) => {
    console.log(data)
})


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (x, y, callback) => {
    setTimeout(() => {
        const sum = x + y
        callback(sum)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})


// ===================
// NOTES
// ===================
// A callback function is one that we define and pass in as an argument to setTimeout()
// A callback function is a function we provide as an argument to another function with the intention of having it called at some point in the future
// Now in this case we are using the callback pattern in an asynchronous way because setTimeout() is a node provided API and it is asynchronous
// NOTE: using a callback pattern DOES NOT mean it's actually asynchronous. If a function is not interacting with a native node API, it's a regular synchronous function