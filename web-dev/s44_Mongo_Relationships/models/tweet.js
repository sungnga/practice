const mongoose = require('mongoose');
const { Schema } = mongoose;

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

const userSchema = new Schema({
	username: String,
	age: Number
});

const tweetSchema = new Schema({
	text: String,
	likes: Number,
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
	// const u = new User({ username: 'chickenfan99', age: 66 });
	// const tweet1 = new Tweet({ text: 'omg I love my chicken!', likes: 2 });
	// tweet1.user = u;
	// u.save();
	// tweet1.save();

	const user = await User.findOne({ username: 'chickenfan99' });
	const tweet2 = new Tweet({ text: 'bock bock bock', like: 888 });
	tweet2.user = user;
	tweet2.save();
};
// makeTweets();

// If you only want a specific property and not the entire info of a document, pass in the property name as the next argument
const findTweet = async () => {
	const t = await Tweet.find({}).populate('user', 'username');
	console.log(t);
};
findTweet();
