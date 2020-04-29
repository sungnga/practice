require('../src/db/mongoose')
const Task = require('../src/models/task')

// Using promise chaining
// A function that deletes a task by its id
// Then count all the tasks that is marked not complete
Task.findByIdAndDelete('5ea887232e3bc6722274f5b6').then((task) => {
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((list) => {
    console.log(list)
}).catch((e) => {
    console.log(e)
})

// Using async/await
// A function that deletes a task by its id
// Then count all the tasks that have not been completed
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5ea8da92c985e0863511aa77').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})