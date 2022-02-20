const express = require('express');
const app = express();
// import the products array module from data.js file
const { products } = require('./data');

app.get('/', (req, res) => {
	// sends a JSON response w/ the correct content-type
	res.json(products);
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
