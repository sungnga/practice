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

	res.send('Fake login/Register/Signup Route');
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.floor(Math.random() * 100);
	res.status(200).json({
		msg: `Hello, John Doe`,
		secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
	});
};

module.exports = { login, dashboard };
