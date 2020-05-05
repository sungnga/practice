// OBJECT PROPERTY SHORTHAND
// A name property the value comes from a variable with the same name, we can use object property shorthand syntax (ie. name: name --> name)

const name = "Andrew"
const userAge = 27

const user = {
    name,
    age: userAge,
    location: 'Seattle'
}

console.log(user)

// OBJECT DESTRUCTURING
// Destructuring syntax makes it easy to extract properties off of an object, creating individual variables that store those property values
// Object destructuring is useful when you have an object and you're trying to access properties from it
// The whole goal of destructuring is to extract object properties and their values into individual variables
// This is useful when you're working with complex objects that have a lot of properties you're constantly referencing. It's nice to have those standalone variables that you can easily use
// We can rename a variable as well (label: productLabel)
// Can set up a default value for the variable should the object not have that property (rating = 5)
// Can use destructuring when working with function arguments

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// On the right of equal sign is the object we try to destructure
// Inside the curly braces, we can list out all the properties we try to extract
// We can rename a variable as well (label: productLabel)
// Can set up a default value for the variable should the object not have that property (rating = 5)
const { label: productLabel, stock, rating = 5 } = product
console.log(productLabel)
console.log(stock)
console.log(rating)

// Destructuring with function arguments
// If we know that an argument is an object we can destructure its properties right in line
const transaction = (type, {label, stock = 0} = {}) => {
    console.log(type, label, stock)
}

transaction('order', product)