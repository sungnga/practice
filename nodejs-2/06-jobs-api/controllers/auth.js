const User = require('../models/User');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
	// destructure name, email, password from req.body object
	const { name, email, password } = req.body;

	// .genSalt() method generates random byte
	// the value is how many rounds it generates. 10 is default
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// the user's password string is now replaced with hashedPassword
	const tempUser = { name, email, password: hashedPassword };

	const user = await User.create({ ...tempUser });
	// status code is 201 created
	// send back the user object in json
	res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
	res.send('login user');
};

module.exports = {
	register,
	login
};
