const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10
		const camp = new Campground({
			author: '5fceca2958a83af9fc5afbc5',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi minus, eaque quas soluta quisquam quasi fugit repudiandae nostrum neque eveniet suscipit delectus voluptatibus, veritatis odio. Aspernatur dolore totam sapiente?',
			price,
			images: [
				{
					url: 'https://res.cloudinary.com/sungnga/image/upload/v1607641943/YelpCamp/nwviq3razmyjps6juu9j.jpg',
					filename: 'YelpCamp/nwviq3razmyjps6juu9j'
				},
				{
					url: 'https://res.cloudinary.com/sungnga/image/upload/v1607641944/YelpCamp/ajexdvpepfnbdih0szx2.jpg',
					filename: 'YelpCamp/ajexdvpepfnbdih0szx2'
				},
				{
					url: 'https://res.cloudinary.com/sungnga/image/upload/v1607641945/YelpCamp/llstngonktbnbzcspfen.jpg',
					filename: 'YelpCamp/llstngonktbnbzcspfen'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
