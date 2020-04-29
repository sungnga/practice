require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// Using promise chaining
// Find a user by its id and update its age to 1
// Then count the number of documents with the age of 1
// Print out the total count
User.findByIdAndUpdate('5ea88119b4c69b6f55c8702a', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

// Using async/await
// A function that finds a user by its id and updates its age
// Then count all the users in the database with this age
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({ age })
    return count
}

// Call the function and pass in the id and the value of age you want to update to
// Print out all users with the age of 2 in the database
updateAgeAndCount('5ea88119b4c69b6f55c8702a', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})



// https://mongoosejs.com/docs/queries.html