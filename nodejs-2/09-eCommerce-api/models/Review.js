const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
	{
		rating: {
			type: Number,
			min: 1,
			max: 5,
			required: [true, 'Please provide rating']
		},
		title: {
			type: String,
			trim: true,
			required: [true, 'Please provide review title'],
			maxlength: 100
		},
		comment: {
			type: String,
			required: [true, 'Please provide review text']
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true
		},
		product: {
			type: mongoose.Schema.ObjectId,
			ref: 'Product',
			required: true
		}
	},
	{ timestamps: true }
);

// setup compound index - an index that entails multiple fields
// a user can only leave one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
