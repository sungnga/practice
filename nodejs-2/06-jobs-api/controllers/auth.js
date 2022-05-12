const User = require('../models/User');
const StatusCodes = require('http-status-codes');

const register = async (req, res) => {
	const user = await User.create({ ...req.body });
	// generate user token using instance method
	const token = user.createJWT();

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
