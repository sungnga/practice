const http = require('http');

// the req is the incoming request object
// the res is what is sending back
const server = http.createServer((req, res) => {
	res.write('Welcome to our home page');
	// end the request
	res.end();
});
 
// provide the port number the server is listening to
server.listen(5000);

// Run this file in the terminal: node 12-http.js
// Now the server is listening on port 5000
// Go to a web browser and type in localhost:5000 to see the printed message