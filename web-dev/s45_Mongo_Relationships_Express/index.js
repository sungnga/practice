const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const AppError = require('./AppError');
const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose
	.connect('mongodb://localhost:27017/farmStand2', {
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// FARM ROUTES
app.get('/farms', async (req, res) => {
	const farms = await Farm.find({});
	res.render('farms/index', { farms });
});

app.get('/farms/:id', async (req, res) => {
	const farm = await Farm.findById(req.params.id);
	res.render('farms/show', { farm });
});

app.get('/farms/new', (req, res) => {
	res.render('farms/new');
});

app.post('/farms', async (req, res) => {
	const farm = new Farm(req.body);
	await farm.save();
	res.redirect('/farms');
});

// Serves a new product form for a particular farm
app.get('/farms/:id/products/new', (req, res) => {
	const { id } = req.params;
	res.render('products/new', { categories, id });
});

app.post('/farms/:id/products', async (req, res) => {
	// res.send(req.body)
	const { id } = req.params;
	// Find the farm in the database based on farm id
	const farm = await Farm.findById(id);
	const { name, price, category } = req.body;
	// Create a new product based on the data we get from req.body
	const product = new Product({ name, price, category });
	// Push the new product to farm.products array
	farm.products.push(product);
	// Going the other way, add the farm to the new product.farm property
	product.farm = farm;
	// Save farm to the database. This farm now has a new product
	await farm.save();
	// Save the new product to the database
	await product.save();
	res.send(farm);
});

// PRODUCT ROUTES
const categories = ['fruit', 'vegetable', 'dairy'];

// async utility function
// This function takes a function as an argument
// It returns a new function
// This new function is simply executes the function passed in to wrapAsync()
// and chains on a .catch() to catch the error
// If there's an error, it calls next()
function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

app.get('/products', async (req, res) => {
	const { category } = req.query;
	if (category) {
		const products = await Product.find({ category });
		res.render('products/index', { products, category });
	} else {
		const products = await Product.find({});
		res.render('products/index', { products, category: 'All' });
	}
});

app.get('/products/new', (req, res) => {
	res.render('products/new', { categories });
});

app.post('/products', async (req, res, next) => {
	try {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.redirect(`/products/${newProduct._id}`);
	} catch (e) {
		next(e);
	}
});

app.get('/products/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			throw new AppError('Product Not Found', 404);
		}
		res.render('products/detail', { product });
	} catch (e) {
		next(e);
	}
});

app.get('/products/:id/edit', async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return next(new AppError('Product Not Found', 404));
		}
		res.render('products/edit', { product, categories });
	} catch (e) {
		next(e);
	}
});

app.put(
	'/products/:id',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body, {
			runValidators: true,
			new: true
		});
		// console.log(req.body);
		res.redirect(`/products/${product._id}`);
	})
);

app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.redirect('/products');
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong' } = err;
	res.status(status).send(message);
});

app.listen(3000, () => {
	console.log('App is listening on port 3000!');
});
