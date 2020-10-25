import jwt from 'jsonwebtoken';

const getUserId = (request) => {
	const header = request.request.headers.authorization;

	if (!header) {
		throw new Error('Authentication required');
	}

	const token = header.replace('Bearer ', '');
	// This method returns the token and the data object (contains the payload and issued time)
	const decoded = jwt.verify(token, 'thisisasecret');

	// userId is the payload
	return decoded.userId;
};

export { getUserId as default };
