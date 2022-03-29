// ---The asyncWrapper middleware function---

// takes a function (the controller) as an argument
// this function returns an async function with try-catch block
const asyncWrapper = (fn) => {
	// asyncWrapper has access to req, res, and next from Express
	return async (req, res, next) => {
		// since the returned funct is an async funct, we use a try-catch block
		try {
			// execute the controller function with the provided req, res, next as args
			// add the await keyword in front because the controller is an async function
			await fn(req, res, next);
		} catch (error) {
			// if error occurs, pass the error to the next errorHandler middleware
			next(error);
		}
	};
};

module.exports = asyncWrapper;
