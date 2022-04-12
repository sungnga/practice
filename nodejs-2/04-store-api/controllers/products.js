const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	// passing in empty object will return all products
	// const products = await Product.find({});

	//specifying options
	const products = await Product.find({
		name: 'vase table'
	});

	res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
	res.status(200).json({ msg: 'products route' });
};

module.exports = { getAllProductsStatic, getAllProducts };
