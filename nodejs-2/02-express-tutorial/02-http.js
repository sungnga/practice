// Setup the server
// http module is built-in to Node
const http = require('http');
const { readFileSync } = require('fs');

// get all files
const homePage = readFileSync('./index.html');

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
	// the method property contains the request method the client is making
	console.log(req.method);
	// the url property contains the path to the resource the client is requesting
	console.log(req.url);
	const url = req.url;
	// home page
  if (url === '/') {
		// .writeHead() method sends a response header to the request
		// 1st arg is the HTTP response status code
		// - this status code lets the browser knows what is going with the request
		// - 100s is information responses
		// - 200s is successful responses
		// - 300s is redirection messages
		// - 400s is client error responses
		// 2nd arg is the content type being sent back
		res.writeHead(200, { 'content-type': 'text/html' });
		// .write() method writes data to the stream
		res.write(homePage);
		// must always call res.end() to end the communication
		res.end();
	}
	// about page
	else if (url === '/about') {
		res.writeHead(200, { 'content-type': 'text/html' });
		res.write('<h1>about page</h1>');
		res.end();
	}
	// 404
	else {
		res.writeHead(404, { 'content-type': 'text/html' });
		res.write('<h1>page not found</h1>');
		res.end();
	}
});

// A port is a communication endpoint
// In development, the port number can be arbitrary
// In production, the port must be specific
server.listen(5000);
