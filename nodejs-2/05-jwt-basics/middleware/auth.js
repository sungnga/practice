const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authorizationMiddleware = async (req, res, next) => {
	// authHeader is a string that looks like this: "Bearer <token>"
	const authHeader = req.headers.authorization;

	// can call .startsWith() method on a JS string
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		// 401 code is unauthorized error
		throw new CustomAPIError('No token provided', 401);
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
		// 401 code is unauthorized error
		throw new CustomAPIError('Not authorized to access this route', 401);
	}
};

module.exports = authorizationMiddleware;
