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
	res.send('get a job');
};

const createJob = async (req, res) => {
	// add createdBy property to req.body and set it to userId from req.user
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
	res.send('update job');
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
