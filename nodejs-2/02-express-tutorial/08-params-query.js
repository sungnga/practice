const express = require('express');
const app = express();
// import the products array module from data.js file
const { products } = require('./data');

app.get('/', (req, res) => {
	res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});

// We can be selective of what data we want to send back to the client
// In this example, we can choose not to send the price and description of products
app.get('/api/products', (req, res) => {
	// newProducts is a new array of products
	// Each product element in newProducts array has id, name, and image properties
	const newProducts = products.map((product) => {
		// destructuring id, name, and image properties from product element
		const { id, name, image } = product;
		return { id, name, image };
	});
	// Sending back newProducts in JSON
	res.json(newProducts);
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
