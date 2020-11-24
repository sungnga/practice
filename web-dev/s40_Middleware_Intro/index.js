const express = require('express');
const morgan = require('morgan');
const app = express();

// app.use() runs for every single request
// logs info about the request in the terminal
app.use(morgan('tiny'));

// Use middleware to add a property to the request object
app.use((req, res, next) => {
	req.requestTime = Date.now();
	console.log(req.method, req.path);
	next();
});

// The middleware only runs if the incoming request path matches the specified path
app.use('/dogs', (req, res, next) => {
	console.log('I love dogs!');
	next();
});

// Define a middleware
const verifyPassword = (req, res, next) => {
	// console.log(req.query);
	const { password } = req.query;
	if (password === 'chickennugget') {
		next();
	}
	res.send('SORRY YOU NEED A PASSWORD!!');
};

// Using the custom property of request object
app.get('/', (req, res) => {
	console.log(`REQUEST DATE: ${req.requestTime}`);
	res.send('Home page!');
});

app.get('/dogs', (req, res) => {
	console.log(`REQUEST DATE: ${req.requestTime}`);
	res.send('Woof Woof!');
});

// Pass in a middleware function as 2nd arg
// Note that as long as the 2nd arg middleware calls next(), the next
// callback, which is 3rd arg, will be executed
app.get('/secret', verifyPassword, (req, res) => {
	res.send('MY SECRET IS: I moisturize my face every night!');
});

// app.use() is used as a last resort when no path matches in the request-response lifecycle
app.use((req, res) => {
	res.status(404).send('NOT FOUND!');
});

app.listen(3000, () => {
	console.log('Listening on port 3000!');
});
