const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

let comments = [
	{
		id: uuidv4(),
		username: 'Todd',
		comment: 'lol that is so funny!'
	},
	{
		id: uuidv4(),
		username: 'Skylar',
		comment: 'I like to go birdwatching'
	},
	{
		id: uuidv4(),
		username: 'Skateboy',
		comment: 'Plz delete your account, Todd'
	},
	{
		id: uuidv4(),
		username: 'onlysayswoof',
		comment: 'woof woof'
	}
];

app.get('/comments', (req, res) => {
	res.render('comments/index', { comments });
});

// This route serves up the form
app.get('/comments/new', (req, res) => {
	res.render('comments/new');
});

// This route takes the data from the form and sends it to the server
app.post('/comments', (req, res) => {
	const { username, comment } = req.body;
	comments.push({ username, comment, id: uuidv4() });
	res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/show', { comment });
});

// Setup a form to edit a comment
app.get('/comments/:id/edit', (req, res) => {
	const { id } = req.params;
	const comment = comments.find((c) => c.id === id);
	res.render('comments/edit', { comment });
});

// Update a comment
app.patch('/comments/:id', (req, res) => {
	const { id } = req.params;
	const newCommentText = req.body.comment;
	const foundComment = comments.find((c) => c.id === id);
	foundComment.comment = newCommentText;
	res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
	const { id } = req.params;
	comments = comments.filter((c) => c.id !== id)
	res.redirect('/comments')
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
