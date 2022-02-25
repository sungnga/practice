const express = require('express');
const app = express();
// Import the logger middleware module
const logger = require('./logger');

// A middleware sits between a request and the response
// Between the route params and the callback function
// req => middleware => res

// app.use() method makes middleware be available to all routes
// NOTE: order of code matters. Invoke the middleware first
// 1st arg is the path that the middleware will apply
// 2nd arg is the middleware
app.use('/api', logger);

// No need to pass in a middleware as 2nd arg
app.get('/', (req, res) => {
	res.send('Home page');
});

app.get('/about', (req, res) => {
	res.send('About page');
});

app.get('/products', (req, res) => {
	res.send('Products');
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
