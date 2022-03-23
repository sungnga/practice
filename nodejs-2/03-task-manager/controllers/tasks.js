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

const updateTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;

		// the 3rd arg is an options object
		// by default, it sends back the old task. But we want the new/updated task
		// runValidators ensures that users provide a value for name property
		const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
			new: true,
			runValidators: true
		});

		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskID}` });
		}

		res.status(200).json({ task });
	} catch (error) {
		// syntax or general error
		res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
	}
};

const deleteTask = async (req, res) => {
	try {
		const { id: taskID } = req.params;
		const task = await Task.findOneAndDelete({ _id: taskID });

		// if this task id not found
		if (!task) {
			return res.status(404).json({ msg: `No task with id: ${taskID}` });
		}

		// 1st option: send back the task that has been removed
		// res.status(200).json({ task });
		// 2nd option: just sent the status code
		// res.status(200).send();
		// 3rd option: send status code, set task to null, and a custom message
		res.status(200).json({ task: null, status: 'success' });
	} catch (error) {
		// syntax or general error
		res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
	}
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
