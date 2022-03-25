const express = require('express');
const app = express();
// import tasks router
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

// ---middleware---
// have access to json data in req.body
app.use(express.json());
app.use(express.static('./public'));

// ---routes---
// using tasks router as middleware
// 1st arg is the base route
// 2nd arg is the tasks router
app.use('/api/v1/tasks', tasks);

app.use(notFound);

const port = 3000;

// Note that mongoose.connect() method returns a promise
// therefore use try/catch block here
const start = async () => {
	try {
		// invoking the mongoose.connect() method
		// it's expecting the MongoDB connection string value
		await connectDB(process.env.MONGO_URI);

		// start the server if the connection is successful
		app.listen(port, console.log(`Sever is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();

// ----ROUTE STRUCTURE----
// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get('/api/v1/tasks/:id')    - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task
