const http = require('http');
const { readFileSync } = require('fs');

// get all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

// req is a huge request object that contains all sort of info about the request
const server = http.createServer((req, res) => {
	// the method property contains the request method the client is making
	// console.log(req.method);

	// the url property contains the path to the resource the client is requesting
	// req.url shows all the urls that the client is requesting from the server
	// these urls are requested in index.html file
	console.log(req.url);

	const url = req.url;
	// home page
	if (url === '/') {
		res.writeHead(200, { 'content-type': 'text/html' });
		res.write(homePage);
		res.end();
	}
	// styles
	// make sure the path matches exactly shown in req.url
	// make sure to indicate the correct content type
	// make sure to pass in the correct variable to the .write() method
	else if (url === '/styles.css') {
		res.writeHead(200, { 'content-type': 'text/css' });
		res.write(homeStyles);
		res.end();
	}
	// image/logo
	else if (url === '/logo.svg') {
		res.writeHead(200, { 'content-type': 'image/svg+xml' });
		res.write(homeImage);
		res.end();
	}
	// logic
	else if (url === '/browser-app.js') {
		res.writeHead(200, { 'content-type': 'text/javascript' });
		res.write(homeLogic);
		res.end();
	}
	// 404
	else {
		res.writeHead(404, { 'content-type': 'text/html' });
		res.write('<h1>page not found</h1>');
		res.end();
	}
});

server.listen(5000);
