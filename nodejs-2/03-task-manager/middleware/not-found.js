// since this is a middleware, it has access to the req and res objects
// sending back a custom message with a 404 status code
const notFound = (req, res) => res.status(404).send('Route does not exist');

module.exports = notFound;
