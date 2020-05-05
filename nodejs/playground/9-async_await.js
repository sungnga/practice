const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    const sum = await add(-1, 99)
    const sum2 = await add(sum, 10)
    const sum3 = await add(sum2, 20)

    return sum3
}

doWork().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

// OLD WAY OF CALLING MULTIPLE PROMISES
// add(2, 4).then((sum) => {
//     console.log(sum)
//     return add(sum, 8)
// }).then((sum2) => {
//     console.log(sum2)
// }).catch((e) => {
//     console.log(e)
// })

// THE BASICS OF ASYNCS AWAIT
// const doWork = async () => {
//     throw new Error('something went wrong')
//     return "Andrew"
// }

// doWork().then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(e)
// })


// =======================
// ASYNC/AWAIT
// =======================
// The whole point of async/await is to make it earier to work with asynchronous-promise based code

// THE ASYNC FUNCTION
// If we don't explicitly return something from the function, undefined is implicitly returned
// First, we need to mark a function as async function. We do this by adding the 'async' keyword right before the function declaration
// const doWork = async () => { }
// By marking a function as an async function, it changes the way this function behaves. It now returns a promise with the value undefined instead of returning undefined. //Promise { undefined }
// ASYNC FUNCTIONS ALWAYS RETURNS A PROMISE
// Now if you return with a string: return "Andrew". This means the return value of doWork is not this string "Andrew". Instead, it's a promise that gets fulfilled with this string
// We say: the return value from doWork is a promise that has been fulfilled with the string "Andrew". //Promise { "Andrew" }
// We can chain on the .the() & .catch() promise methods to the call function to process the promise
// doWork().then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })
// The callback function inside the .then() will run if the promise is resolved. And the 'result' that gets passed to the callback is the value that's returned from doWork (in this case, it's the string "Andrew")
// If we throw an error in the async function, the promise is rejected
// When a promise is rejected, the callback function inside the .catch() method gets run. The 'error' that gets passed to the callback is the error value coming from 'throw new Error()'
// const doWork = async () => {
//     throw new Error('something went wrong')
//     return "Andrew"
// }

// THE AWAIT OPERATOR
// The await operator can only be used in async functions
// What we get access to in async is the await operator
// The await operator gets used with a promise
// We can get a promise because add() function returns a promise: await add()
// We can get access to the value that the promise is fulfilled with by storing it in a new variable called 'sum'. This is equivalent to chaining on a .then() method because the promise is resolved, pass in a callback and get access to the value in 'result'
// const sum = await add(1, 99)
// To chain on another promise, just use another await operator. This is equivalent to returning another promise inside a callback of .then() method and chain on a 2nd .then() method. 
//  - const sum = await add(1, 99)
//  - const sum2 = await add(sum, 10)
//  - const sum3 = await add(sum2, 20)
//  - return sum3
// With async/await, you have access to all the individual results in the exact same scope in the async function
// To handle errors when a promise is rejected, call the reject() function with an error value and return early, and then call .catch() method
// if (a < 0 || b < 0) {
//     return reject('Numbers must be non-negative')
// }