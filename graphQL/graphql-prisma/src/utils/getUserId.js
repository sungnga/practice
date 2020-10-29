import jwt from 'jsonwebtoken';

// This 2nd arg determines if authentication is required or optional
// By default, authentication is required
// If authentication is marked as optional and the user isn't authenticated, null will be returned instead of the user id
const getUserId = (request, requireAuth = true) => {
	// For queries and mutations, we're using standard http requests. The authorization comes from http headers
	// For subscriptions, we're using web sockets. The data lives somewhere else on request
	const header = request.request
		? request.request.headers.authorization
		: request.connection.context.Authorization;

	// If there is a header, get the token, verify the token, and return the user id
	if (header) {
		const token = header.replace('Bearer ', '');
		// This method returns the token and the data object (contains the payload and issued time)
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
