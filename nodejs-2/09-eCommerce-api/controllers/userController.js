const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// only admin users have access to this route
const getAllUsers = async (req, res) => {
	// get all users with role of 'user'
	// then remove the password property from the return array of users
	const users = await User.find({ role: 'user' }).select('-password');

	res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
	// find one user that has the match id from req.params.id
	// then remove the password property from the found user object
	const user = await User.findOne({ _id: req.params.id }).select('-password');
	if (!user) {
		throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
	}

	res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
	res.send('show current user');
};

const updateUser = async (req, res) => {
	res.send(req.body);
};

const updateUserPassword = async (req, res) => {
	res.send(req.body);
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword
};
