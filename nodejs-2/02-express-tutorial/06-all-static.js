const express = require('express');
const path = require('path');
// Invoke the express method to instantiate the app object
const app = express();

// Setup static and middleware
// app.use - responsible for middleware
// Static is Express's built-in middleware
// The 'public' folder stores static assets. The server doesn't need to change
app.use(express.static('./public'));

// app.get('/', (req, res) => {
// 	// The __dirname provides absolute path
// 	// Can also use path.join()
// 	res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// 	// Adding this index.html file to static assets folder 'public'
// });

app.all('*', (req, res) => {
	res.status(404).send('resource not found');
});

app.listen(5000, () => {
	console.log('Server is listening on port 5000');
});

// ------ HTTP METHODS ------
// app.get - read data
// app.post - insert data
// app.put - update data
// app.delete - delete data

// app.all - handles all http methods
// app.use - responsible for middleware
// app.listen - the port the server is listening on
