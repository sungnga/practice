const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
	const token = req.signedCookies.token;
	if (!token) {
		throw new CustomError.UnauthenticatedError('Authentication invalid');
	}

	try {
		// verify the token
		// the isTokenValid() util method returns the auth user object
		// destructure the properties
		const { name, userId, role } = isTokenValid({ token });
		// if successful, add user object to the req object w/ these props
		req.user = { name, userId, role };
		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError('Authentication invalid');
	}
};

// ...roles is a rest operation that collects all the args passed to this middleware
const authorizePermissions = (...roles) => {
	// this middleware returns a callback function
	// because it's invoked right away in
	// getAllUsers route in userRoutes.js file
	return (req, res, next) => {
		// since this is a 2nd middleware, it has access to the req.user object
		// that was created from the 1st middleware
		if (req.user.role !== 'admin') {
			throw new CustomError.UnauthorizedError(
				'Unauthorized to access this route'
			);
		}

		next();
	};
};

module.exports = { authenticateUser, authorizePermissions };
