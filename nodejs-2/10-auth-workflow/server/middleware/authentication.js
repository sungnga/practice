const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
const Token = require('../models/Token');
const { attachCookiesToResponse } = require('../utils');

const authenticateUser = async (req, res, next) => {
	const { refreshToken, accessToken } = req.signedCookies;

	try {
		// check for accessToken cookie
		if (accessToken) {
			const payload = isTokenValid(accessToken);
			req.user = payload.user;
			return next();
		}
		// if accessToken doesn't exist, use refreshToken to validate token
		const payload = isTokenValid(refreshToken);

		// check for existingToken in 'tokens' collection in DB
		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.refreshToken
		});
		// check for existingToken and if isValid props is true
		if (!existingToken || !existingToken?.isValid) {
			throw new CustomError.UnauthenticatedError('Authentication Invalid');
		}

		// attach two cookies to response
		attachCookiesToResponse({
			res,
			user: payload.user,
			refreshToken: existingToken.refreshToken
		});

		// append user object to req object
		req.user = payload.user;
		next();
	} catch (error) {
		throw new CustomError.UnauthenticatedError('Authentication Invalid');
	}
};

const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			throw new CustomError.UnauthorizedError(
				'Unauthorized to access this route'
			);
		}
		next();
	};
};

module.exports = {
	authenticateUser,
	authorizePermissions
};
