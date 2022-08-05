const mongoose = require('mongoose');
const validator = require('validator');
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
		unique: true,
		required: [true, 'Please provide email'],
		validate: {
			validator: validator.isEmail,
			message: 'Please provide valid email'
		}
	},
	password: {
		type: String,
		required: [true, 'Please provide password'],
		minlength: 6
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default: 'user'
	}
});

// hash the password before saving the document
// this is a hook
UserSchema.pre('save', async function () {
	// console.log(this.modifiedPaths());
	// console.log(this.isModified('name'));

	// if password isn't modified/updated, return early
	// this prevents re-hashing the password when update user info
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// creating a method to call on the user instance
// once the user instance is created, it has this method
// make sure to use simple function instead of arrow function
// so that this.password points to User instance
UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
