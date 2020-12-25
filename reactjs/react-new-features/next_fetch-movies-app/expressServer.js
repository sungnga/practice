// Custom server-side routes with Express
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();

	// Defining a custom route path:
	// Follow this pattern when creating a custom route
	// Define the route definition
	// Then call app.render() method to pass off the request to Next.js
	// 3rd arg is the route name defined in pages directory. It's telling Next to render this page for this route request
	// 4th arg is a query object that we want to provide
	// In the Post component, we have access to query.id. So we can pass in the id key here
	// In express, we have access to the req.params object
	// req.params.id is coming from the route definition "/p/:id"
	// Set the value for the id key to the id from req.params
	// We can even just pass in the entire req.params object as a 4th arg
	server.get('/p/:id', (req, res) => {
		app.render(req, res, '/post', { id: req.params.id });
	});

	// For every request that comes in, call the handle() method
	// and pass in the req and res objects to Next.js
	// Next.js will handle the requests
	server.get('*', (req, res) => {
		return handle(req, res);
	});

	server.listen(3000, (err) => {
		if (err) throw err;
		console.log('> Now serving on localhost:3000');
	});
});
