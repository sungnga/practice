const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authorizationMiddleware = async (req, res, next) => {
	// authHeader is a string that looks like this: "Bearer <token>"
	const authHeader = req.headers.authorization;

	// can call .startsWith() method on a JS string
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		throw new UnauthenticatedError('No token provided');
	}

	// after splitting the string, get the 2nd element (which is the token)
	const token = authHeader.split(' ')[1];
	// console.log(token);

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log(decoded); //{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }
		// destructure id and username from decoded object
		const { id, username } = decoded;

		// if successfully verify JWT, add user object to req body
		req.user = { id, username };

		next();
	} catch (error) {
		throw new UnauthenticatedError('Not authorized to access this route');
	}
};

module.exports = authorizationMiddleware;
