// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
	let customError = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || 'Something went wrong try again later'
	};

	// don't need to use this anymore. The default customError handles this already
	// if (err instanceof CustomAPIError) {
	// 	return res.status(err.statusCode).json({ msg: err.message });
	// }

	// handling validation error
	// i.e if user doesn't provide email or password during registration
	// the err.errors object contains password and email objects
	// Object.values() method turns object into array
	if (err.name === 'ValidationError') {
		console.log(Object.values(err.errors));
		customError.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(',');
		customError.statusCode = 400;
	}

	// handling duplicate email error
	// error code 11000 is email duplicate
	if (err.code && err.code === 11000) {
		// sending custom error message
		customError.msg = `Duplicate value entered ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		// sending custom status code
		customError.statusCode = 400;
	}

	// return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
	return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
