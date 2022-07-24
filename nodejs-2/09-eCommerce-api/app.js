require('dotenv').config();
// this middleware automatically applies the async-await to all of the controllers
// so we don't need to use the try-catch block in the controllers
require('express-async-errors');

// express
const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes.js');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
// parse json data
// this middleware makes it possible for the json data
// be available in req.body in POST and UPDATE methods
app.use(express.json());
// middleware to parse a cookie
app.use(cookieParser(process.env.JWT_SECRET));

// file upload
// make the public folder as a public folder
app.use(express.static('./public'));
app.use(fileUpload());

// testing the root route
app.get('/', (req, res) => {
	res.send('Home page');
});

// testing cookie parser
app.get('/api/v1', (req, res) => {
	// console.log(req.cookies);
	console.log(req.signedCookies);
	res.send('Home page');
});

// setup the root route and router as middleware
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);

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
