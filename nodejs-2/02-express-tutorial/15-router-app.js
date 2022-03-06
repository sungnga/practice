const express = require('express');
const app = express();

// import the router module for people routes
const people = require('./routes/people');
// import the router module for auth route
const auth = require('./routes/auth');

// static assets
app.use(express.static('./methods-public'));

// parse the form data
// and add the value to req.body property in POST method
// express.urlencoded() is express built-in middleware
// that parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// parse json data
// this middleware makes it possible for the json data
// be available in req.body in POST method
app.use(express.json());

// the base route is how the route is going to start
// 1st arg is the base route
// 2nd arg is the people routes from routes/people.js module
app.use('/api/people', people);
app.use('/login', auth);

app.listen(5000, () => {
	console.log('Server is listening on port 5000');
});

// ------ HTTP METHODS ------
// app.get - read data - get data
// app.post - insert data - send data
// app.put - update data - path params + send data
// app.delete - delete data - path params

// app.all - handles all http methods
// app.use - responsible for middleware
// app.listen - the port the server is listening on
