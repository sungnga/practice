const mongoose = require('mongoose');

// invoke mongoose.connect() in app.js file, not here
const connectDB = (url) => {
	// connecting our application to MongoDB
	// mongoose.connect() method returns a promise
	return mongoose.connect(url);
};

module.exports = connectDB;
