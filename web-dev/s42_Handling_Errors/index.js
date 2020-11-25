const express = require('express');
const morgan = require('morgan');
const app = express();

const AppError = require('./AppError')

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
	throw new AppError('password required', 401)
	// res.send('SORRY YOU NEED A PASSWORD!!');
	// throw new Error ('Password required!', 400)
};

// Using the custom property of request object
app.get('/', (req, res) => {
	console.log(`REQUEST DATE: ${req.requestTime}`);
	res.send('Home page!');
});

app.get('/error', (req, res) => {
	chicken.fly()
})

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

// Use a custom Error class to handle error
app.get('/admin', (req, res) => {
	throw new AppError('You are not an Admin!', 403)
})

// app.use() is used as a last resort when no path matches in the request-response lifecycle
app.use((req, res) => {
	res.status(404).send('NOT FOUND!');
});

// Error-handling middleware
// app.use((err, req, res, next) => {
// 	console.log('*********************************')
// 	console.log('*************ERROR***************')
// 	console.log('*********************************')
// 	// console.log(err)
// 	// This is passing the error to the next error handler
// 	// When passed in next, this will trigger the next error handler
// 	// When nothing is passed in, it's going to call the next regular middleware
// 	next(err)
// })

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong' } = err
	res.status(status).send(message)
})

app.listen(3000, () => {
	console.log('Listening on port 3000!');
});
