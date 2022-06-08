const path = require('path');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
	console.log(req.files);
	let productImage = req.files.image;

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
