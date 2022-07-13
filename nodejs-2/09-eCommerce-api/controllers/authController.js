const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const register = async (req, res) => {
	const { email, name, password } = req.body;

	const emailAlreadyExists = await User.findOne({ email });
	if (emailAlreadyExists) {
		throw new CustomError.BadRequestError('Email already exists');
	}

	// first registered user is an admin
	// the value of isFirstAccount is either truthy or falsy
	const isFirstAccount = (await User.countDocuments({})) === 0;
	const role = isFirstAccount ? 'admin' : 'user';

	const user = await User.create({ name, email, password, role });
	// after a user instance has been created, create a tokenUser object
	// createTokenUser() is a util function
	// tokenUser doesn't contain email and password
	const tokenUser = createTokenUser(user);

	attachCookiesToResponse({ res, user: tokenUser });

	// return a user object
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new CustomError.BadRequestError('Please provide email and password');
	}

	// find user by email in DB
	const user = await User.findOne({ email });
	if (!user) {
		throw new CustomError.UnauthenticatedError('Invalid credentials');
	}

	// comparePassword is a method we created in UserSchema model
	// user instance has access to this method
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new CustomError.UnauthenticatedError('Invalid credentials');
	}

	const tokenUser = createTokenUser(user);

	attachCookiesToResponse({ res, user: tokenUser });

	// return a user object
	res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now())
	});

	// for development purposes, send a json response
	res.status(StatusCodes.OK).json({ msg: 'User logged out' });
};

module.exports = { register, login, logout };
