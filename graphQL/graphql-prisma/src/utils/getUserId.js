import jwt from 'jsonwebtoken';

// This 2nd arg determines if authentication is required or optional
// By default, authentication is required
// If authentication is marked as optional and the user isn't authenticated, null will be returned instead of the user id
const getUserId = (request, requireAuth = true) => {
	const header = request.request.headers.authorization;

	// If there is a header, get the token, verify the token, and return the user id
	if (header) {
		const token = header.replace('Bearer ', '');
		// This method returns the token and the data object (contains the payload and issued time)
		const decoded = jwt.verify(token, 'thisisasecret');

		// userId is the payload
		return decoded.userId;
	}

	// If a resolver requires authentication and the user is not authenticated, throw an error
	if (requireAuth) {
		throw new Error('Authentication required');
	}

	// If authentication is marked optional and the user isn't authenticated, return null instead of the user id
	return null;
};

export { getUserId as default };
