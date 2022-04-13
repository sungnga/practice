const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	// passing in empty object will return all products
	// const products = await Product.find({});

	//specifying options - filter by hardcoded values
	const products = await Product.find({
		name: 'vase table'
	});

	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	// find products by query params
	// get the values of query string params from req.query
	const products = await Product.find(req.query);
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
