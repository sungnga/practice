const express = require('express');
const app = express();

// A middleware sits between a request and the response
// Between the route params and the callback function
// req => middleware => res

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

// 2nd arg is referencing the logger middleware
app.get('/', logger, (req, res) => {
	res.send('Home page');
});

// Using the logger middleware
app.get('/about', logger, (req, res) => {
	res.send('About page');
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
