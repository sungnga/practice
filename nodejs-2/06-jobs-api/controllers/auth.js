const User = require('../models/User');
const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });

	// create a token for new user
	// 1st arg is the payload object. Try to keep payload small
	// 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
	// 3rd arg is options object. Set when this token will expire
	const token = jwt.sign(
		{ userId: user._id, name: user.name },
		process.env.JWT_SECRET,
		{
			expiresIn: '30d'
		}
	);

	// status code is 201 created
	// send back the user name and the token in json
	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
	res.send('login user');
};

module.exports = {
	register,
	login
};
