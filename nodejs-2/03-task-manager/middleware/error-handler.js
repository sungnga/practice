const { CustomAPIError } = require('../errors/custom-error');

// this middleware has access to these four params
const errorHandlerMiddleware = (err, req, res, next) => {
	// check if err is instance of CustomAPIError
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	// return res.status(500).json({ msg: err }); //system-generated error message

	// default statusCode and error message
	return res
		.status(500)
		.json({ msg: `Something went wrong, please try again` }); //custom error message
};

module.exports = errorHandlerMiddleware;
