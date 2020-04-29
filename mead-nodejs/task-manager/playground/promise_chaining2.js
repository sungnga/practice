require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5ea887232e3bc6722274f5b6').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((list) => {
    console.log(list)
}).catch((e) => {
    console.log(e)
})