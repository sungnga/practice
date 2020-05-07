class Person {
    // Constructor function
    // 'this' refers to the class instance
    // Can provide a function default by assigning the parameter with the default value
    constructor(name = 'Anonymous', age = 0) {
        this.name = name
        this.age = age
    }
    // This method is outside of the constructor
    // Must explicitly call
    getGreeting() {
        return `Hi. I am ${this.name}!`
    }

    getDescription() {
        return `${this.name} is ${this.age} years(s) old.`
    }
}

// Use the keyword 'extends' to extend the functionalities of another class
// Student clas extends the Person class
// 'super' keyword is the parent class 
class Student extends Person {
    constructor(name, age, major) {
        // Calling the parent constructor function
        super(name, age)
        this.major = major
    }

    // Define a method just for Student class
    hasMajor() {
        return !!this.major
    }

    // Override the parent method
    getDescription() {
        // Call a method from parent class
        let description = super.getDescription()

        if (this.hasMajor()) {
            // Concat addtl string
            description += ` Their major is ${this.major}`
        }

        return description
    }
}

// Traveler -> Person
// Add support for homeLocation
// Override getGreeting
// 1. Hi I am Andrew Mead. I'm visiting from Philly
// 2. Hi. I am Andrew Mead
class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age)
        this.homeLocation = homeLocation
    }


    getGreeting() {
        let greeting = super.getGreeting()
        
        if (this.homeLocation) {
            greeting += ` I'm visiting from ${this.homeLocation}`
        }

        return greeting
    }
}

// Create an instance of the Person class
// Provide the values for name and age properties
const me = new Traveler('Nga La', 99, 'Seattle')
console.log(me)
console.log(me.getGreeting())
// console.log(me.getDescription())

// Create another instance of the Person class
// Not provide the values for name and age properties
// Name and age then are set to the default values defined in the constructor function
const other = new Traveler(undefined, undefined, 'nowhere')
console.log(other)
console.log(other.getGreeting())
// console.log(other.getDescription())
