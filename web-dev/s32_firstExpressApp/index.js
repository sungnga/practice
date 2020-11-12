const express = require('express');
const app = express();
//console.dir(app);

// app.use(() => {
// 	console.log('We got a new request!');
// 	resizeBy.send({ color: 'violet' });
// });

app.get('/', (req, res) => {
	res.send('This is the home page!');
});

app.get('/cats', (req, res) => {
	res.send('Meow!');
});

app.get('/dogs', (req, res) => {
	res.send('Woof!');
});

// Path parameters
app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params;
  // console.log(subreddit, postId)
	res.send(`<h1>Browsing the ${subreddit} subreddit with post Id ${postId}</h1>`);
});

// Query string
app.get('/search', (req, res) => {
	const { q } = req.query;
	res.send(`<h1>Search results for: ${q}</h1>`);
});

app.listen(3000, () => {
	console.log('Server is running on port 3000!');
});
