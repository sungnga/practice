const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

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
	// tokenUser doesn't contain email and password
	const tokenUser = { name: user.name, userId: user._id, role: user.role };

	attachCookiesToResponse({ res, user: tokenUser });

	// return a user object
	res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
	res.send('login user');
};

const logout = async (req, res) => {
	res.send('logout user');
};
module.exports = { register, login, logout };
