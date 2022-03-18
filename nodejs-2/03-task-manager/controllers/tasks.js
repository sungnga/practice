const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).json({ tasks });
	} catch (error) {
		res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
	}
};

// Create a task is a POST method
const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ task });
	} catch (error) {
		res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
	}
};

const getTask = async (req, res) => {
	try {
		// get the id out of req.params
		// destructure the id and give it a new alias
		const { id: taskID } = req.params;
		const task = await Task.findOne({ _id: taskID });

		// if this task id not found
		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskID}` });
		}

		res.status(200).json({ task });
	} catch (error) {
		// syntax or general error
		res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
	}
};

const updateTask = (req, res) => {
	res.send('Update task');
};

const deleteTask = (req, res) => {
	res.send('Delete task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
