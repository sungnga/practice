// ******************
// BLOCKING CODE
const http = require('http');

const server = http.createServer((req, res) => {
	if (req.url === '/') {
		res.end('Home page');
	} else if (req.url === '/about') {
		// Blocking code
		for (let i = 0; i < 1000; i++) {
			for (let j = 0; j < 1000; j++) {
				console.log(`${i} ${j}`);
			}
		}
		res.end('About page');
	} else res.end('Error page');
});

server.listen(5000, () => {
	console.log('Server listening on port 5000');
});

// ******************
// PROMISE PATTERN
const { readFile } = require('fs');

// the getText() function returns a promise
// pass in a callback function to the new Promise object
// the callback receives a resolve and a reject functions as arguments
const getText = (path) => {
	return new Promise((resolve, reject) => {
		readFile(path, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

// call the getText() function and provide the path
// chain on the .then() and .catch() methods when a function returns a promise
getText('./content/first.txt')
	.then((result) => console.log(result))
	.catch((err) => console.log(err));

// ******************
// ASYNC/AWAIT PATTERN
// when writing an async function, use a try/catch block
const start = async () => {
	// performing multiple operations
	try {
		const first = await getText('./content/first.txt');
		const second = await getText('./content/second.txt');
		console.log(first, second);
	} catch (error) {
		console.log(error);
	}
};

start();

// ******************
// ASYNC/AWAIT PATTERN - NODE'S NATIVE OPTION
// chain on .promises to the module and the functions will return promises
const { readFile, writeFile } = require('fs').promises;

const start = async () => {
	try {
		const first = await readFile('./content/first.txt', 'utf8');
		const second = await readFile('./content/second.txt', 'utf8');
		await writeFile(
			'./content/result-mind-grenade.txt',
			`THIS IS AWESOME: ${first} ${second}`,
			{ flag: 'a' }
		);
		console.log(first, second);
	} catch (error) {
		console.log(error);
	}
};

start();
