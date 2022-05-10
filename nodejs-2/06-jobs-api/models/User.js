const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: [true, 'Please provide email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide valid email'
		],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6
	}
});

// ---Mongoose middleware---
// marking the callback as async function, we don't need to call next() in this middleware
UserSchema.pre('save', async function () {
	// .genSalt() method generates random byte
	// the value is how many rounds it generates. 10 is default
	const salt = await bcrypt.genSalt(10);
	// this keyword refers to the UserSchema object
	this.password = await bcrypt.hash(this.password, salt);
});

// 1st arg is the name of the model we give
module.exports = mongoose.model('User', UserSchema);
