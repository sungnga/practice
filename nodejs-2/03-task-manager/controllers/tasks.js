const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

// The asyncWrapper middleware is invoked inside the Express router.route.get() .post() etc. methods

// The asyncWrapper middleware is expecting a function as an argument
// Wrap the entire controller inside the asyncWrapper middleware
// Then remove the try-catch block. This being handled in the asyncWrapper middleware
const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({});
	res.status(200).json({ tasks });
});

// Create a task is a POST method
const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	// get the id out of req.params
	// destructure the id and give it a new alias
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });

	// if this task id not found
	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;

	// the 3rd arg is an options object
	// by default, it sends back the old task. But we want the new/updated task
	// runValidators ensures that users provide a value for name property
	const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
		new: true,
		runValidators: true
	});

	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });

	// if this task id not found
	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}

	// 1st option: send back the task that has been removed
	// res.status(200).json({ task });
	// 2nd option: just sent the status code
	// res.status(200).send();
	// 3rd option: send status code, set task to null, and a custom message
	res.status(200).json({ task: null, status: 'success' });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
