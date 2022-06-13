require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload');
// use version 2
const cloudinary = require('cloudinary').v2;

// cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET
});

// database
const connectDB = require('./db/connect');

// product router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'));
// to get access to all the data in req.body
app.use(express.json());
// the express-fileupload lib first parses the upload image file
// then creates a temp directory in the project and stores the parsed file
app.use(fileUpload({ useTempFiles: true }));

app.get('/', (req, res) => {
	res.send('<h1>File Upload Starter</h1>');
});

// use productRouter as middleware
// the root route
app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);

		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
