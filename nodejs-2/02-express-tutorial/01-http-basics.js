// Setup the server
// http module is built-in to Node
const http = require('http');

// In the http cycle, there's a request message object and a response message object
// In the callback, we have access to the request and response objects
// every time when a user hits the server, we have access to these two objects
// In the request object, we want to know
// - the request method
// - the resource user is trying to get (in url)
// - the body where the user provides additional info
// The response.end() method signals to the server that all of the response headers
// and body have been sent; that server should consider this message complete
// The method response.end() MUST be called on each response
const server = http.createServer((req, res) => {
	console.log('User hits the server');
	res.end('Home page');
});

// A port is a communication endpoint
// In development, the port number can be arbitrary
// In production, the port must be specific
server.listen(5000);
