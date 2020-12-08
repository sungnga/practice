const Campground = require('../models/campground');

// Campgrounds index
module.exports.index = async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render('campgrounds/index', { campgrounds });
};

// Render new form
module.exports.renderNewForm = (req, res) => {
	res.render('campgrounds/new');
};

// Create campground
module.exports.createCampground = async (req, res, next) => {
	// res.send(req.body)
	// if (!req.body.campground) {
	// 	throw new ExpressError('Invalid campground data', 400);
	// }
	const campground = new Campground(req.body.campground);
	campground.author = req.user._id;
	await campground.save();
	req.flash('success', 'Successfully made a new campground!');
	res.redirect(`/campgrounds/${campground._id}`);
};

// Show campground
module.exports.showCampground = async (req, res) => {
	const campground = await Campground.findById(req.params.id)
		.populate({
			path: 'reviews',
			populate: {
				path: 'author'
			}
		})
		.populate('author');
	// console.log(campground)
	if (!campground) {
		req.flash('error', 'Cannot find that campground!');
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/show', { campground });
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	if (!campground) {
		req.flash('error', 'Cannot find that campground!');
		return res.redirect('/campgrounds');
	}
	res.render('campgrounds/edit', { campground });
};

// Update campground
module.exports.updateCampground = async (req, res) => {
	// res.send('It works!')
	const { id } = req.params;
	const campground = await Campground.findByIdAndUpdate(
		id,
		{ ...req.body.campground },
		{ new: true }
	);
	req.flash('success', 'Successfully updated campground!');
	res.redirect(`/campgrounds/${campground._id}`);
};

// Delete campground
module.exports.deleteCampground = async (req, res) => {
	const { id } = req.params;
	await Campground.findByIdAndDelete(id);
	req.flash('success', 'Successfully deleted campground');
	res.redirect('/campgrounds');
};
