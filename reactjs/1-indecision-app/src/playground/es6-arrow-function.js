// ES5 function
// You can name the function
function square(x) {
    return x * x
}
console.log(square(8))

// ES6 arrow function
// All arrow functions are anonymous. Can't give it a name
// If you want to create an arrow function and reference it later, you have to assign it to a variable
const squareArrow = (x) => {
    return x * x
}

// Arrow expression syntax (shorthand syntax)
// It allows us to create a much more concise functions
// If the return value is A SINGLE EXPRESSION, we can leave off the return keywork and the bracket
// It is implicitly returned. So we don't have to explicitly use the 'return' keyword
const squareArrow = (x) => x * x
console.log(squareArrow(6))


const getFirstName = (fullName) => {
    return fullName.split(' ')[0]
}
// Using shorthand syntax
const getFirstName = (fullName) => fullName.split(' ')[0]
console.log(getFirstName('Nga La'))