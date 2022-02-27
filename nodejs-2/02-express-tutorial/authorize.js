const authorize = (req, res, next) => {
	// destructuring user from string query params
	const { user } = req.query;

	// if request string params doesn't match john, send Unauthorize
	if (user === 'john') {
		// Attaching the user property to the request object
		req.user = { name: 'john', id: 3 };
		next();
	} else {
		res.status(401).send('Unauthorized');
	}
};

module.exports = authorize;
