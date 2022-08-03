const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'Please provide product name'],
			maxlength: [100, 'Name can not be more than 100 characters']
		},
		price: {
			type: Number,
			required: [true, 'Please provide product price'],
			default: 0
		},
		description: {
			type: String,
			required: [true, 'Please provide product description'],
			maxlength: [1000, 'Description can not be more than 1000 characters']
		},
		image: {
			type: String,
			default: '/uploads/example.jpeg'
		},
		category: {
			type: String,
			required: [true, 'Please provide product category'],
			enum: ['office', 'kitchen', 'bedroom']
		},
		company: {
			type: String,
			required: [true, 'Please provide company'],
			enum: {
				values: ['ikea', 'liddy', 'marcos'],
				message: '{VALUES} is not supported'
			}
		},
		colors: {
			type: [String],
			default: ['#222'],
			required: true
		},
		featured: {
			type: Boolean,
			default: false
		},
		freeShipping: {
			type: Boolean,
			default: false
		},
		inventory: {
			type: Number,
			required: true,
			default: 15
		},
		averageRating: {
			type: Number,
			default: 0
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// setup virtual property for reviews
ProductSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'product',
	justOne: false
});

// remove all associated reviews when deleting a product
ProductSchema.pre('remove', async function (next) {
	// this keyword refers to the product instance
	// the .model() method lets you access a different model
	// delete all review docs that matches the product id
	// product is the property on the Review model
	await this.model('Review').deleteMany({ product: this._id });
});

module.exports = mongoose.model('Product', ProductSchema);
