require('../src/db/mongoose')
const User = require('../src/models/user')

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

// https://mongoosejs.com/docs/queries.html