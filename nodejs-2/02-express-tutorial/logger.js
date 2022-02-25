// A middleware function
// Express provides req, res, and next
const logger = (req, res, next) => {
	const method = req.method;
	const url = req.url;
	const time = new Date().getFullYear();
	console.log(method, url, time);

	next(); //pass it on to the next middleware
	// The other option is to send back a response here
};

module.exports = logger;
