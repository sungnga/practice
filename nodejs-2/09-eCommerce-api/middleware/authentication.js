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

module.exports = { authenticateUser };
