const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse } = require('../utils');

// only admin users have access to this route
const getAllUsers = async (req, res) => {
	console.log(req.user);

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
	res.status(StatusCodes.OK).json({ user: req.user });
};

// update user with user.save()
const updateUser = async (req, res) => {
	const { email, name } = req.body;
	if (!email || !name) {
		throw new CustomError.BadRequestError('Please provide all values');
	}

	const user = await User.findOne({ _id: req.user.userId });
	user.email = email;
	user.name = name;
	// invoking the Mongoose pre save hook method on the user instance
	await user.save();

	const tokenUser = createTokenUser(user);
	attachCookiesToResponse({ res, user: tokenUser });
	res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
	const { oldPassword, newPassword } = req.body;
	if (!oldPassword || !newPassword) {
		throw new CustomError.BadRequestError('Please provide both values');
	}

	const user = await User.findOne({ _id: req.user.userId });

	// we created the comparePassword method in UserSchema model
	const isPasswordCorrect = await user.comparePassword(oldPassword);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid credentials');
	}
	user.password = newPassword;

	// the save() method is Mongoose's pre save hook
	// we setup this hook to hash the password before saving the user instance to DB
	await user.save();
	res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' });
};

module.exports = {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword
};

// ----- update user with findOneAndUpdate() method ---------
// const updateUser = async (req, res) => {
// 	const { email, name } = req.body;
// 	if (!email || !name) {
// 		throw new CustomError.BadRequestError('Please provide all values');
// 	}

// 	// updating the user instance
// 	// 1st arg is we're looking for user by their id
// 	// 2nd arg is the properties to update
// 	// 3rd arg is the options
// 	const user = await User.findOneAndUpdate(
// 		{ _id: req.user.userId },
// 		{ email, name },
// 		{ new: true, runValidators: true }
// 	);
// 	const tokenUser = createTokenUser(user);
// 	attachCookiesToResponse({ res, user: tokenUser });
// 	res.status(StatusCodes.OK).json({ user: tokenUser });
// };
