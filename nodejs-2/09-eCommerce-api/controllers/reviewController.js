const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
	// destructure product and assign an alias to productId
	const { product: productId } = req.body;

	// check if the submitted product exists
	const isValidProduct = await Product.findOne({ _id: productId });
	if (!isValidProduct) {
		throw new CustomError.NotFoundError(`No product with id: ${productId}`);
	}

	// check if the review has already been submitted by
	// this user on this product
	const alreadySubmitted = await Review.findOne({
		product: productId,
		user: req.user.userId
	});
	if (alreadySubmitted) {
		throw new CustomError.BadRequestError(
			'Already submitted review for this product'
		);
	}

	// add user property to req.body
	req.body.user = req.user.userId;
	// create review
	const review = await Review.create(req.body);

	res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
	res.send('get all reviews');
};

const getSingleReview = async (req, res) => {
	res.send('get single review');
};

const updateReview = async (req, res) => {
	res.send('update review');
};

const deleteReview = async (req, res) => {
	res.send('delete review');
};

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	updateReview,
	deleteReview
};
