class CustomAPIError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

// a function that creates a new instance from CustomAPIError class
const createCustomError = (msg, statusCode) => {
	return new CustomAPIError(msg, statusCode);
};

module.exports = { CustomAPIError, createCustomError };
