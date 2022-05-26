const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllJobs = async (req, res) => {
	// once authenticateUser is successful,
	// we have access to user object in req.user
	const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
	res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
	// user object comes from auth middleware
	// destructure the user object and get the userId from it
	// the params object is provided by express
	// assign an alias for id to jobId to be more explicit
	const {
		user: { userId },
		params: { id: jobId }
	} = req;

	const job = await Job.findOne({
		_id: jobId,
		createdBy: userId
	});
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
	// add createdBy property to req.body and set it to userId from req.user
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	// destructure from req object
	const {
		body: { company, position },
		user: { userId },
		params: { id: jobId }
	} = req;

	if (company === '' || position === '') {
		throw new BadRequestError('Company or Position fields cannot be empty');
  }
  
	// set new to true means it will return the updated job
	const job = await Job.findByIdAndUpdate(
		{ _id: jobId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
	res.send('delete job');
};

module.exports = {
	getAllJobs,
	getJob,
	createJob,
	updateJob,
	deleteJob
};
