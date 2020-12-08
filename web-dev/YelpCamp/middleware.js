const ExpressError = require('./utils/ExpressError');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const Campground = require('./models/campground');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
	// console.log('REQ.USER...', req.user)
	if (!req.isAuthenticated()) {
		//store the url they are requesting!
		// console.log(req.path, req.originalUrl)
		req.session.returnTo = req.originalUrl;
		req.flash('error', 'You must be signed in');
		return res.redirect('/login');
	}
	next();
};

// Validate middleware for Campground
module.exports.validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
	throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

// Middleware that checks if campground author matches the currentUser in the session
module.exports.isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do this!');
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
};

// Middleware that checks if review author matches the currentUser in the session
module.exports.isReviewAuthor = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do this!');
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
};

// Validate middleware for Review
module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};
