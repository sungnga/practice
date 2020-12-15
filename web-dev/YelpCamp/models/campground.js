const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const Review = require('./review');
const Schema = mongoose.Schema;

// https://res.cloudinary.com/sungnga/image/upload/w_300/v1607650818/YelpCamp/ggpykgwvqxmk1ehnbl37.jpg

const ImageSchema = new Schema({
	url: String,
	filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
	// 'this' refers to individual image
	return this.url.replace('/upload', '/upload/w_150');
});

const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema(
	{
		title: String,
		images: [ImageSchema],
		geometry: {
			type: {
				type: String,
				enum: ['Point'], // 'geometry.type' must be 'Point'
				required: true
			},
			coordinates: {
				type: [Number],
				required: true
			}
		},
		price: Number,
		description: String,
		location: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		reviews: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Review'
			}
		]
	},
	opts
);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
	// 'this' refers to individual campground
	return `
	<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
	<p>${this.description.substring(0, 25)}...</p>
	`;
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
	if (doc) {
		await Review.deleteMany({
			_id: {
				$in: doc.reviews
			}
		});
	}
});

module.exports = mongoose.model('Campground', CampgroundSchema);
