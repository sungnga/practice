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
	// authHeader is a string that looks like this: "Bearer <token>"
	const authHeader = req.headers.authorization;

	// can call .startsWith() method on a JS string
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		// 401 code is unauthorized error
		throw new CustomAPIError('No token provided', 401);
	}

	// after splitting the string, get the 2nd element (which is the token)
	const token = authHeader.split(' ')[1];
	console.log(token);

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded); //{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }

		const luckyNumber = Math.floor(Math.random() * 100);
		res.status(200).json({
			msg: `Hello, ${decoded.username}`,
			secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
		});
	} catch (error) {
		// 401 code is unauthorized error
		throw new CustomAPIError('Not authorized to access this route', 401);
	}
};

module.exports = { login, dashboard };
