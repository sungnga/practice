require('dotenv').config();
// this middleware automatically applies the async-await to all of the controllers
// so we don't need to use the try-catch block in the controllers
require('express-async-errors');

// express
const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');

// database
const connectDB = require('./db/connect');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
// parse json data
// this middleware makes it possible for the json data
// be available in req.body in POST and UPDATE methods
app.use(express.json());

// testing the root route
app.get('/', (req, res) => {
	res.send('Home page');
});

// the 404 error handler is placed after all the routes and before other error handlers
// because this middleware doesn't call next(). Everything ends after this
app.use(notFoundMiddleware);
// the errorHandler middleware goes last because this middleware is only invoked
// inside an existing route
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		// connect to MongoDB
		await connectDB(process.env.MONGO_URL);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};
start();
