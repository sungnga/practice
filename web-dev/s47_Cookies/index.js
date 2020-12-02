const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
// Execute cookieParser
app.use(cookieParser());

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

app.listen(3000, () => {
	console.log('Serving app on port 3000');
});
