// With var we can re-assign its value
// You can also redefine it
// This can cause some hard-to-debug issues
var nameVar = 'nga'
var nameVar = 'Mike'
console.log('nameVar', nameVar)

// With let, you can re-assign its value
// However, you cannot redefine it
let nameLet = 'Jen'
nameLet = 'Julie'
console.log('nameLet', nameLet)

// With const, you cannot re-assign its value or redefine it
// We'll use const by default
const nameConst = 'Frank'
console.log('nameConst', nameConst)

// When var, const, or let is defined inside a function, they are scoped to that function
// var is function scope
// This means that you cannot access the variable outside of that function
function getPetName() {
    var petName = 'Bruno'
    return petName
}
getPetName()
// Cannot access petName. You will get petName is not defined
console.log(petName)

// Block scoping
// Const and let are also block-level scope, meaning not only are they bound to their function, they are also bound to their code block (if statement, conditional etc)
// If you want to access the variable outside of a block scope, define it outside of the block scope using let. Then reassign its value inside the block
const fullName = 'Nga La'
let firstName
if (fullName) {
    firstName = fullName.split(' ')[0]
    console.log(firstName)
}
console.log(firstName)

// We'll never use var again
// We'll use const as default
// We'll use let when we need to reassign its value