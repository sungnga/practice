const http = require('http');

// the req is the incoming request object
// the res is what is sending back
const server = http.createServer((req, res) => {
	// console.log(req);
	if (req.url === '/') {
		// end the request
		res.end('Welcome to our home page');
	} else if (req.url === '/about') {
		res.end('Here is our short history');
	} else {
		res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to fine the page your are looking for</p>
    <a href="/">back home</a>
  `);
	}
});

// provide the port number the server is listening to
server.listen(5000);

// Run this file in the terminal: node 12-http.js
// Now the server is listening on port 5000
// To stop the server, run: control c
// Go to a web browser and type in localhost:5000 to see the printed message
