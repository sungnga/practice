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
	// passing in an empty object means find all reviews
	// the .populate() method reference other collections
	// path option is the property name that reference the collection from ReviewSchema model
	// selection option is to select the properties to populate
	const reviews = await Review.find({}).populate({
		path: 'product',
		select: 'name company price'
	});

	res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
	// destructure the query params id and assign it to an alias
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
	}

	res.status(StatusCodes.OK).json({ review });
};

const updateReview = async (req, res) => {
	const { id: reviewId } = req.params;
	const { rating, title, comment } = req.body;

	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
	}

	checkPermissions(req.user, review.user);

	review.rating = rating;
	review.title = title;
	review.comment = comment;

	await review.save();

	res.status(StatusCodes.OK).json({ review });
};

const deleteReview = async (req, res) => {
	const { id: reviewId } = req.params;

	const review = await Review.findOne({ _id: reviewId });
	if (!review) {
		throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
	}

	checkPermissions(req.user, review.user);

	await review.remove();

	res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
};

module.exports = {
	createReview,
	getAllReviews,
	getSingleReview,
	updateReview,
	deleteReview
};
