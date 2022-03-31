// this middleware has access to these four params
const errorHandlerMiddleware = (err, req, res, next) => {
	// return res.status(500).json({ msg: err }); //system-generated error message
	return res.status(500).json({ msg: `Something went wrong, try again later` }); //custom error message
};

module.exports = errorHandlerMiddleware;
