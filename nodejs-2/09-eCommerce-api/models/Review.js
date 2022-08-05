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

// creating a static method to call on the model schema. Review model has this method
// calculate product's average rating
// calculate product's total number of reviews
ReviewSchema.statics.calculateAverageRating = async function (productId) {
	const result = await this.aggregate([
		{ $match: { product: productId } },
		{
			$group: {
				_id: null,
				averageRating: { $avg: '$rating' },
				numOfReviews: { $sum: 1 }
			}
		}
	]);
	console.log(result);

	// update the product's averageRating and numOfReviews properties
	// use this.model() method to access/reference a different model
	// ?. is JS optional chaining
	// if there's no averageRating or numOfReviews, set to 0
	try {
		await this.model('Product').findOneAndUpdate(
			{ _id: productId },
			{
				averageRating: Math.ceil(result[0]?.averageRating || 0),
				numOfReviews: result[0]?.numOfReviews || 0
			}
		);
	} catch (error) {
		console.log(error);
	}
};

// this is a save hook
// this hook is triggered when a POST or PATCH request is made: createReview, updateReview
ReviewSchema.post('save', async function () {
	// the calculateAverageRating method is called on the Review model
	await this.constructor.calculateAverageRating(this.product);
});

// this is a remove hook
// this hook is triggered when a DELETE request is made: deleteReview
ReviewSchema.post('remove', async function () {
	// the calculateAverageRating method is called on the Review model
	await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
