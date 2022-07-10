const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthorizedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN; //status code of forbidden is 403
	}
}

module.exports = UnauthorizedError;
