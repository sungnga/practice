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
		// name: { $regex: search, $options: 'i' }
	}).sort('-name price');

	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	// get the values of query params from req.query
	// destructure the properties from req.query
	const { featured, company, name, sort } = req.query;
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

	// don't add the await keyword here
	let result = Product.find(queryObject);
	// if sort exists in query params
	if (sort) {
		// split the sort array at comma and join back with a space
		const sortList = sort.split(',').join(' ');
		// sort the products list by the specified sort query params
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	// add the await keyword here
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
