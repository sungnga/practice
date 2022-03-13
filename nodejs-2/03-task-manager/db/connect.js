const mongoose = require('mongoose');

// make sure to provide your password here. Else it'll not connect to DB
// 03-TASK-MANAGER is the name of the database
const connectionString = 'PASTE_MONGODB_CONNECTION_STRING_HERE';

// invoke mongoose.connect() in app.js file, not here
const connectDB = (url) => {
	// connecting our application to MongoDB that we setup
	// mongoose.connect() method returns a promise
	return mongoose.connect(connectionString);
};

module.exports = connectDB;
