const express = require('express');
const app = express();
// import the products array module from data.js file
const { products } = require('./data');

app.get('/', (req, res) => {
	res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});

// Can name the route parameter anything you want
// Route params always starts with a colon
app.get('/api/products/:productID', (req, res) => {
	// Use req.params to access the route params that the client makes the request
	console.log(req.params); //the route params is always returned in string format

	// Destructuring the productID property from req.params
	// This property matches with the route params the client provides
	const { productID } = req.params;

	// Convert productID to integer
	// because the product id in products array is an integer
	const singleProduct = products.find(
		(product) => product.id === Number(productID)
	);

	// if productID not found, return status 404 and a message
	if (!singleProduct) {
		return res.status(404).send('Product does not exist');
	}

	// Return the data in JSON
	return res.json(singleProduct);
});

// A more complex route params
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
	console.log(req.params); //returns productID and reviewID route params
	res.send('Hello world');
});

// If no query string params is provided, the server will return the entire data collection
app.get('/api/v1/query', (req, res) => {
	// The query string params can be found in req.query
	console.log(req.query);
	// Destructuring the key properties off of req.query
	const { search, limit } = req.query;
	// Create a new products array from the existing products array
	let sortedProducts = [...products];

	// If string param search is provided,
	// filter the product name by the value of the search key
	if (search) {
		sortedProducts = sortedProducts.filter((product) => {
			return product.name.startsWith(search);
		});
	}
	if (limit) {
		// Because the value for the limit key is a string
		// need to convert to an integer
		sortedProducts = sortedProducts.slice(0, Number(limit));
	}
	// If the sortedProducts array is empty and there's nothing wrong with the query
	// send a custom json object with a success status code and an empty data array
	if (sortedProducts.length < 1) {
		res.status(200).send('No products matched your search');
		return res.status(200).json({ success: true, data: [] });
	}

	// Send back data in JSON format
	res.status(200).json(sortedProducts);
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
