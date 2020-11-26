const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost:27017/relationshipDB', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('MONGO CONNECTION OPEN!');
	})
	.catch((err) => {
		console.log('OH NO MONGO CONNECTION ERROR!');
		console.log(err);
	});

// Set id to false if you don't want Mongoose to auto-generate one
const userSchema = new mongoose.Schema({
	first: String,
	last: String,
	addresses: [
		{
			_id: { id: false },
			street: String,
			city: String,
			state: String,
			country: String
		}
	]
});

const User = mongoose.model('User', userSchema);

// Create a new user from the User model
// Then use push method to push an address to the new user
// Call .save() to save the new user to DB
// Don't forget to invoke the makeUser function
const makeUser = async () => {
	const u = new User({
		first: 'Harry',
		last: 'Potter'
	});
	u.addresses.push({
		street: '123 Sesame St.',
		city: 'New York',
		state: 'NY',
		country: 'USA'
	});
	const res = await u.save();
	console.log(res);
};

// Add another address to a user
const addAddress = async (id) => {
	const user = await User.findById(id);
	user.addresses.push({
		street: '555 Folsom St.',
		city: 'San Francisco',
		state: 'CA',
		country: 'USA'
	});
	const res = await user.save();
	console.log(res);
};

// makeUser();
addAddress('5fbf2bad11bf1dd6e8202c9f');
