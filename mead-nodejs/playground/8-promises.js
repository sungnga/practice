// THE CALLBACK PATTERN
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         // callback('An error has occurred!', undefined)
//         callback(undefined, [1, 2, 3])
//     }, 3000)
// }

// doWorkCallback((error, result) => {
//     if (error) {
//         return console.log(error)
//     }

//     console.log(result)
// })


// TO CREATE A PROMISE:
// new Promise() <-This is a new promise constructor function
// Typically a promise is created by the library we use
// doWorkCallback is a promise
// The promise takes in a function. This function gets called by the promise API and we get access to 2 arguments
// 1st arg: resolve. This means things went well and you can pass in a value to the resolve() function
// 2nd arg: reject. The promise has been rejected. Can pass in a value to the reject() function
// resolve() gets called if things went well. reject() gets called when it didn't
// Then the callback function inside .then() method runs if resolve() is called
// The callback function inside the .catch() method runs if reject() is called
// We can only call either 'resolve' or 'reject'. But can't call both and can't call one of them twice
// Once resolve() or reject() is called, the promise is done and its value or state can't change
const doWorkCallback = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([1, 3, 5])
        reject('Something went wrong!')
    }, 2000)
})

// A promise is an object with a few methods we can access
// .then() method allows us to register a function when things went well
// So when resolve() gets called, the callback function passed into the .then() method will run
// In this callback function, we get access to the data that the promise resolved with. The data in this case is [1, 3, 5]. This data is stored in the param 'result'
// .catch() method allows us to register a function to run when the reject() method is called
// Inside this callback function we get access to the error value in the reject() method. The error value is stored in the param 'error'
doWorkCallback.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
})


//                                    (resolve)  
//                                    fulfilled  
//                                  /
// Promise         -- pending -->  
//                                  \
//                                    rejected  
//                                    (reject)