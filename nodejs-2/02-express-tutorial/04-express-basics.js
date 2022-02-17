const express = require('express');
// Invoke the express method and we get back an app object
const app = express();

// the .get() method is client requesting for data
// 1st arg is the path to the resource
// 2nd arg is the callback function. This callback runs every time when a request made to this path
// In the callback, the server sends back the status code and the data
app.get('/', (req, res) => {
	console.log('client hits the resource');
	res.status(200).send('Home page');
});

app.get('/about', (req, res) => {
	res.status(200).send('About page');
});

app.all('*', (req, res) => {
	res.status(404).send('<h1>Resource not found</h1>');
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
