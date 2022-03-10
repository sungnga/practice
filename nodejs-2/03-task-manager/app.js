const express = require('express');
const app = express();
// import tasks router
const tasks = require('./routes/tasks');

// middleware
// have access to json data in req.body
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
	res.send('Task Manager App');
});

// using tasks router as middleware
// 1st arg is the base route
// 2nd arg is the tasks router
app.use('/api/v1/tasks', tasks);

const port = 3000;

app.listen(port, console.log(`Sever is listening on port ${port}...`));

// ----ROUTE STRUCTURE----
// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task
