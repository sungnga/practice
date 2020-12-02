const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
// Execute cookieParser
// This string is going to be used by cookieParse to sign a cookie
app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
	const { name = 'No-name' } = req.cookies;
	res.send(`Hey there, ${name}`);
});

// Sending cookies
app.get('/setname', (req, res) => {
	res.cookie('name', 'stevie chicks');
	res.cookie('animal', 'harlequin shrimp');
	res.send('OK SENT YOU A COOKIE!!');
});

app.get('/getsignedcookie', (req, res) => {
	// Specify signed set to true
	res.cookie('fruit', 'grape', { signed: true });
	res.send('OK SIGNED YOUR FRUIT COOKIE!');
});

// To access regular cookies and signed cookies
app.get('/verifyfruit', (req, res) => {
	console.log(req.cookies);
	console.log(req.signedCookies);
	res.send(req.cookies);
});

app.listen(3000, () => {
	console.log('Serving app on port 3000');
});
