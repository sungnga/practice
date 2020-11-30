const mongoose = require('mongoose');
const { model } = require('./campground');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	body: String,
	rating: Number
});

module.exports = mongoose.model('Review', reviewSchema);
