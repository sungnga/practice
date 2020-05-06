// If you need to access arguments, stick with the ES5 function instead
const add = function (a, b) {
    console.log(arguments)
    return a + b
}
console.log(add(55, 90))

// arguments objects - no longer bound with arrow functions
const sub = (a, b) => {
    // This will result in an error
    //console.log(arguments)
    return a + b
}
console.log(sub(55, 40))



// ES6 arrow function
// this keyword - Does not bind its own 'this' value
const user = {
    name: 'Nga',
    cities: ['Seattle', 'New York', 'San Francisco'],
    printPlacesLived() {
        // The value of 'this' is available here
        // console.log(this.name)
        // console.log(this.cities)

        // Since this.cities is inside a regular function scope, it binds to its parent object, the user object
        // .map() method will return a new array with each iterated items inside it
        return this.cities.map((city) => {
            // Using a regular function, this.name keyword won't work
            // Using arrow function, this.name keywork will work
            // since this.name is inside an arrow function, the function does not bind its 'this' value. Thus it can climb up the scope chain and look for the 'this' value
            return this.name + ' has lived in ' + city
        })
    }
}
console.log(user.printPlacesLived())


const multiplier = {
    numbers: [2, 3, 4],
    multiplyBy: 9,
    multiply() {
        return this.numbers.map((num) => num * this.multiplyBy)
    }
}
console.log(multiplier.multiply())
