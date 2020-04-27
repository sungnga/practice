const square = function (x) {
    return x * x
}

const square = (x) => {
    return x * x
}

const square = x => x * x

console.log(square(6))

const event = {
    name: 'Birthday party',
    guestList: ['Andrew', 'Jen', 'Mike'],
    // This is a standard function
    // Equivalent to: printGuestList: function () {}
    printGuestList() {
        console.log('Guest list for ' + this.name)
        // Arrow functions access the 'this' value in the context in which they created. In this case it's printGuestList()
        // PrintGuestList() 'this' values are properties inside event object
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending' + this.name)
        })
    }
}

event.printGuestList()

// =================
// NOTES
// =================

// Arrow functions don't bind their own 'this' value. Which means we do not have access to this as a reference to properties inside the same object
// Arrow functions aren't well suited for methods: properties that are functions when we want to access 'this'
// Arrow functions access the 'this' value in the context in which they created. In this case it's printGuestList()