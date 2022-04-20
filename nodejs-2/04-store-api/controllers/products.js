const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const search = 'ab';

	// passing in empty object will return all products
	// const products = await Product.find({});

	//specifying options - filter by hardcoded values
	const products = await Product.find({
		// $regex, $gt are mongoDB query operators
		// pass in the pattern to $regex
		// option i is for case insensitive
		// name: { $regex: search, $options: 'i' }
		price: { $gt: 100 }
	})
		.sort('name')
		.select('name price');

	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	// get the values of query params from req.query
	// destructure the properties from req.query
	const { featured, company, name, sort, fields, numericFilters } = req.query;
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

	// if numericFilters query params exists
	if (numericFilters) {
		// mapping the operator symbols to Mongoose query operators
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte'
		};
		const regEx = /\b(<|>|>=|=|<=)\b/g;
		// if there is a match, replace the operator symbols in regEx w/ Mongoose query operator
		let filters = numericFilters.replace(
			regEx,
			(match) => `-${operatorMap[match]}-`
		);
		console.log(filters); //example numericFilters values: price-$gt-100,rating-$gte-4.5

		// only price and rating in our DB have numeric values
		const options = ['price', 'rating'];

		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}
	console.log(queryObject); //final example looks like this: { price: { '$gt': 100 }, rating: { '$gte': 4.5 } }

	// don't add the await keyword here
	let result = Product.find(queryObject);
	// ---implementing sort---
	// if sort exists in query params
	if (sort) {
		// split the sort array at comma and join back with a space
		const sortList = sort.split(',').join(' ');
		// sort the products list by the specified sort query params
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	// ---implementing select---
	// if fields property exists in query params
	if (fields) {
		// split the fields array at comma and join back with a space
		const fieldsList = fields.split(',').join(' ');
		// sort the products list by the specified sort query params
		result = result.select(fieldsList);
	}

	// ---implementing pagination---
	// convert the query string value of page to a number
	// set the default page number to 1
	const page = Number(req.query.page) || 1;
	// limit number is the number of items per page
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);

	// add the await keyword here
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
