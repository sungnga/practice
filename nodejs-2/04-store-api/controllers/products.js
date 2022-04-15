const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const search = 'ab';

	// passing in empty object will return all products
	// const products = await Product.find({});

	//specifying options - filter by hardcoded values
	const products = await Product.find({
		// $regex is one of many mongoDB query operators
		// pass in the pattern to $regex
		// option i is for case insensitive
		name: { $regex: search, $options: 'i' }
	});

	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	// get the values of query params from req.query
	// destructure the properties from req.query
	const { featured, company, name } = req.query;
	const queryObject = {};

	// if featured query params exists, add featured prop to queryObject
	if (featured) {
		// use ternary operator
		// if the value of featured is true, set featured prop to true
		// else set to false
		queryObject.featured = featured === 'true' ? true : false;
	}

	// if company query params exists
	if (company) {
		// add company prop to queryObject
		// and set its value to the value from query params
		queryObject.company = company;
	}

	if (name) {
		// $regex is one of many mongoDB query operators
		// pass in the pattern to $regex
		// option i is for case insensitive
		queryObject.name = { $regex: name, $options: 'i' };
	}
	console.log(queryObject);

	// if non of the properties matches, queryObject is an empty object
	// passing in an empty object Mongoose will return all products
	const products = await Product.find(queryObject);
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
