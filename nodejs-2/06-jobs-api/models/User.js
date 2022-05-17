const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// ---Generate token---
// Creating instance method
// NOTE: do not use arrow function. Use simple function!
// This keyword refers to UserModel object
UserSchema.methods.createJWT = function () {
	// 1st arg is the payload object. Try to keep payload small
	// 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
	// 3rd arg is options object. Set when this token will expire
	return jwt.sign(
		{ userId: this._id, name: this.name },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

// ---Compare password---
UserSchema.methods.comparePassword = async function (candidatePassword) {
	// this.password is accessing the document(user) password in DB
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

// 1st arg is the name of the model we give
module.exports = mongoose.model('User', UserSchema);
