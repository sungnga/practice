const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require('../cloudinary');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

const upload = multer({ storage });

router
	.route('/')
	.get(catchAsync(campgrounds.index))
	.post(
		isLoggedIn,
		upload.array('image'),
		validateCampground,
		catchAsync(campgrounds.createCampground)
	);
	// .post(upload.array('image'), (req, res) => {
	// 	console.log(req.body, req.files);
	// });

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
	.route('/:id')
	.get(catchAsync(campgrounds.showCampground))
	.put(
		isLoggedIn,
		isAuthor,
		upload.array('image'),
		validateCampground,
		catchAsync(campgrounds.updateCampground)
	)
	.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
	'/:id/edit',
	isLoggedIn,
	isAuthor,
	catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
