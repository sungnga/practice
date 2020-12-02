const express = require('express');
const app = express();

app.get('/greet', (req, res) => {
	res.send('HEY THERE!')
})

// Sending cookies
app.get('/setname', (req, res) => {
	res.cookie('name', 'stevie chicks')
	res.cookie('animal', 'harlequin shrimp')
	res.send('OK SENT YOU A COOKIE!!')
})

app.listen(3000, () => {
	console.log('Serving app on port 3000');
});
