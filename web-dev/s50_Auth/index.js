const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();
const User = require('./models/user');

mongoose
	.connect('mongodb://localhost:27017/authDemo', {
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

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' }));

const requireLogin = (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect('/login');
	}
	next();
};

app.get('/', (req, res) => {
	res.send('THIS IS THE HOME PAGE');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', async (req, res) => {
	// res.send(req.body)
	const { username, password } = req.body;
	const user = new User({ username, password });
	// The new user's password being hashed before saving to DB
	await user.save();
	req.session.user_id = user._id;
	res.redirect('/secret');
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', async (req, res) => {
	const { username, password } = req.body;
	// Custom User model method that finds and validates a user
	const foundUser = await User.findAndValidate(username, password);
	if (foundUser) {
		req.session.user_id = foundUser._id;
		res.redirect('/secret');
	} else {
		res.redirect('/login');
	}
});

app.post('/logout', (req, res) => {
	req.session.user_id = null;
	// req.session.destroy();
	res.redirect('/login');
});

app.get('/secret', requireLogin, (req, res) => {
	res.render('secret');
});

app.get('/topsecret', requireLogin, (req, res) => {
	res.send('top secret!!!!!!!!');
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
