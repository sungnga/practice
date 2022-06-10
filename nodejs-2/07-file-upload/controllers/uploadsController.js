const path = require('path');
const { StatusCodes } = require('http-status-codes');
// we're getting the entire error object from errors/index.js file
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
	// console.log(req.files);

	// check if file exists
	if (!req.files) {
		throw new CustomError.BadRequestError('No file uploaded');
	}

	const productImage = req.files.image;

	// check format
	if (!productImage.mimetype.startsWith('image')) {
		throw new CustomError.BadRequestError('Please upload image');
	}

	// maxSize is 1MB
	const maxSize = 1024 * 1024;
	// check size
	if (productImage.size > maxSize) {
		throw new CustomError.BadRequestError(
			'Please upload image smaller than 1KB'
		);
	}

	// create a path in uploads folder
	const imagePath = path.join(
		__dirname,
		'../public/uploads/' + `${productImage.name}`
	);
	// moving image data to the imagePath in uploads folder
	// the .mv() method is provided by express-fileupload library
	await productImage.mv(imagePath);
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = { uploadProductImage };
