const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

const comments = [
	{
		username: 'Todd',
		comment: 'lol that is so funny!'
	},
	{
		username: 'Skylar',
		comment: 'I like to go birdwatching'
	},
	{
		username: 'Skateboy',
		comment: 'Plz delete your account, Todd'
	},
	{
		username: 'onlysayswoof',
		comment: 'woof woof'
	},
]

app.get('/comments', (req, res) => {
	res.render('comments/index', {comments})
})

app.get('/tacos', (req, res) => {
	res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
	console.log(req.body);
	const { meat, qty } = req.body;
	res.send(`Ok, here are your ${qty} ${meat}`);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000!');
});
