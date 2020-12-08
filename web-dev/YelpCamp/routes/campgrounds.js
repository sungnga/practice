const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middleware');
const { campgroundSchema } = require('../schemas.js');
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

// Validate middleware for Campground
const validateCampground = (req, res, next) => {
	const { error } = campgroundSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(',');
		throw new ExpressError(msg, 400);
	} else {
		next();
	}
};

// Middleware that checks if campground author matches the currentUser in the session
const isAuthor = async (req, res, next) => {
	const { id } = req.params;
	const campground = await Campground.findById(id);
	if (!campground.author.equals(req.user._id)) {
		req.flash('error', 'You do not have permission to do this!');
		return res.redirect(`/campgrounds/${id}`);
	}
	next();
};

router.get(
	'/',
	catchAsync(async (req, res) => {
		const campgrounds = await Campground.find({});
		res.render('campgrounds/index', { campgrounds });
	})
);

router.get('/new', isLoggedIn, (req, res) => {
	res.render('campgrounds/new');
});

router.post(
	'/',
	isLoggedIn,
	validateCampground,
	catchAsync(async (req, res, next) => {
		// res.send(req.body)
		// if (!req.body.campground) {
		// 	throw new ExpressError('Invalid campground data', 400);
		// }
		const campground = new Campground(req.body.campground);
		campground.author = req.user._id;
		await campground.save();
		req.flash('success', 'Successfully made a new campground!');
		res.redirect(`/campgrounds/${campground._id}`);
	})
);

router.get(
	'/:id',
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id)
			.populate('reviews')
			.populate('author');
		// console.log(campground)
		if (!campground) {
			req.flash('error', 'Cannot find that campground!');
			return res.redirect('/campgrounds');
		}
		res.render('campgrounds/show', { campground });
	})
);

router.get(
	'/:id/edit',
	isLoggedIn,
	isAuthor,
	catchAsync(async (req, res) => {
		const campground = await Campground.findById(req.params.id);
		if (!campground) {
			req.flash('error', 'Cannot find that campground!');
			return res.redirect('/campgrounds');
		}
		res.render('campgrounds/edit', { campground });
	})
);

router.put(
	'/:id',
	isLoggedIn,
	isAuthor,
	validateCampground,
	catchAsync(async (req, res) => {
		// res.send('It works!')
		const { id } = req.params;
		const campground = await Campground.findByIdAndUpdate(
			id,
			{ ...req.body.campground },
			{ new: true }
		);
		req.flash('success', 'Successfully updated campground!');
		res.redirect(`/campgrounds/${campground._id}`);
	})
);

router.delete(
	'/:id',
	isLoggedIn,
	isAuthor,
	catchAsync(async (req, res) => {
		const { id } = req.params;
		await Campground.findByIdAndDelete(id);
		req.flash('success', 'Successfully deleted campground');
		res.redirect('/campgrounds');
	})
);

module.exports = router;
