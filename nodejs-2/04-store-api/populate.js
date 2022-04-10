require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

// an array of products
const jsonProducts = require('./products.json');

const start = async () => {
	try {
		// connect to DB
		// pass in the connection string
		await connectDB(process.env.MONGO_URI);

		// delete any existing products in DB
		await Product.deleteMany();

		// populate the products array in DB
		await Product.create(jsonProducts);

		console.log('Success!!');
		// if successful, exit the process
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
start();

// In the terminal and at root of project, run: node populate
// This will connect to MongoDB and populate the products array in 04-STORE-API collection
