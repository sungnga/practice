const express = require('express');
const app = express();
// Import the logger middleware module
const logger = require('./logger');
const authorize = require('./authorize');
// Third-party middleware
const morgan = require('morgan');

// A middleware sits between a request and the response
// Between the route params and the callback function
// req => middleware => res

// ------ MIDDLEWARE OPTIONS ------
// our own / express / third party
// app.use([logger, authorize])
// app.use(express.static('./public'))
app.use(morgan('tiny'));

// app.use() method makes middleware be available to all routes
// NOTE: order of code matters. Invoke the middleware first
// 1st arg is the path that the middleware will apply
// 2nd arg is the middleware
// Pass in multiple middleware in an array
// NOTE: the order of the middleware in the array matters
// app.use([logger, authorize]);

// No need to pass in a middleware as 2nd arg
app.get('/', (req, res) => {
	res.send('Home page');
});

app.get('/about', (req, res) => {
	res.send('About page');
});

// Applying multiple middleware functions to just one route
app.get('/api/items', [logger, authorize], (req, res) => {
	console.log(req.user);
	res.send('Items');
});

app.listen(5000, () => {
	console.log('Server is listening on port 5000');
});

// ------ HTTP METHODS ------
// app.get - read data
// app.post - insert data
// app.put - update data
// app.delete - delete data

// app.all - handles all http methods
// app.use - responsible for middleware
// app.listen - the port the server is listening on
