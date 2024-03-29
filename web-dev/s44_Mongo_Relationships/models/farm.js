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

const productSchema = new mongoose.Schema({
	name: String,
	price: Number,
	season: {
		type: String,
		enum: ['Spring', 'Summer', 'Fall', 'Winter']
	}
});

const farmSchema = new mongoose.Schema({
	name: String,
	city: String,
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
// 	{ name: 'Goddess Melon', price: 5.99, season: 'Summer' },
// 	{ name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
// 	{ name: 'Napa Cabbage', price: 2.99, season: 'Spring' }
// ]);

const makeFarm = async () => {
	const farm = new Farm({
		name: 'Full Belly Farms',
		city: 'Guinda, CA'
	});
	const melon = await Product.findOne({ name: 'Goddess Melon' });
	farm.products.push(melon);
	await farm.save();
	console.log(farm);
};
// makeFarm();

const addProduct = async () => {
	const farm = await Farm.findOne({ name: 'Full Belly Farms' });
	const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
	farm.products.push(watermelon);
	await farm.save();
	console.log(farm);
};
// addProduct();

// First, we want to call the .findOne() method on Farm model to find a farm by its name
// If it exists, it will return the info of the farm
// However, the products property, it will return an array of object ids. They are reference to products in the Product model
// To get and display the details of those products, chain on the .populate() method and pass in the property/ies you want to populate the data
// products is the property we want to populate 
Farm.findOne({ name: 'Full Belly Farms' })
  .populate('products')
  .then(farm => console.log(farm))

