const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	// generate user token using instance method
	const token = user.createJWT();

	// status code is 201 created
	// send back the user name and the token in json
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide email and password');
	}

	// find user by their email in DB
	const user = await User.fineOne({ email });

	if (!user) {
		throw new UnauthenticatedError('Invalid Credentials');
	}

	// if user exists, create a JWT token for the user
	const token = user.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
	register,
	login
};
