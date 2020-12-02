const express = require('express');
const app = express();
const session = require('express-session');

const sessionOptions = {
	secret: 'thisisnotagoodsecret',
	resave: false,
	saveUninitialized: false
};
// Instantiate session and pass in options
app.use(session(sessionOptions));

// Adding count to session
app.get('/viewcount', (req, res) => {
	if (req.session.count) {
		req.session.count += 1;
	} else {
		req.session.count = 1;
	}
	res.send(`You have viewed this page ${req.session.count} times`);
});

// Adding username to session
app.get('/register', (req, res) => {
	const { username = 'Anonymous' } = req.query;
	req.session.username = username;
	res.redirect('/greet');
});

app.get('/greet', (req, res) => {
	const { username } = req.session;
	res.send(`Welcome back, ${username}`);
});

app.listen(3000, () => {
	console.log('Serving app on port 3000');
});
