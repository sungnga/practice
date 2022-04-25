const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
	const { username, password } = req.body;
	// console.log(username, password);

	// if no username or password, throw a new customAPIError
	if (!username || !password) {
		// 400 status code is bad request
		// this error is handled by the errorHandlerMiddleware
		throw new CustomAPIError('Please provide email and password', 400);
	}

	// just for demo, normally provided by DB
	const id = new Date().getDate();

	// create a new token
	// 1st arg is the payload object. Try to keep payload small
	// 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
	// 3rd arg is options object. Set when this token will expire
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});

	// send back a custom message and the token
	res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello, John Doe`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
	});
};

module.exports = { login, dashboard };
