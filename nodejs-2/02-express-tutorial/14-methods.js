const express = require('express');
const app = express();
// destructure people array from data.js file
let { people } = require('./data');

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

app.get('/api/people', (req, res) => {
	res.status(200).json({ success: true, data: people });
});

// Handling a POST request using Javascript
app.post('/api/people', (req, res) => {
	console.log(req.body); //to see the parsed json data
	const { name } = req.body;
	if (!name) {
		return res
			.status(400)
			.json({ success: false, msg: 'Please provide name value' });
	}
	// the form value is stored in the person key
	res.status(201).json({ success: true, person: name });
});

// Handling a POST request
app.post('/login', (req, res) => {
	console.log(req.body); //to see the value submitted from form
	const { name } = req.body;
	if (name) {
		return res.status(200).send(`Welcome ${name}`);
	}
	res.status(401).send('Please provide credential');
});

// the name after the : can be anything
app.put('/api/people/:id', (req, res) => {
	const { id } = req.params; //get the value in the route params
	const { name } = req.body; //we have access to json data because of express.json() middleware

	// find the person in people array that matches with the id in route params
	const person = people.find((person) => person.id === Number(id));

	// if person not found, send back a 404 status code and a message
	if (!person) {
		return (
			res
				// 404 status is if we can't find the resource
				.status(404)
				.json({ success: false, msg: `No person with id ${id}` })
		);
	}
	const newPeople = people.map((person) => {
		// if the person id in people array matches the id in the params
		// update the person's name to the name provided from the PUT request
		if (person.id === Number(id)) {
			person.name = name;
		}
		return person;
	});
	res.status(200).json({ success: true, data: newPeople });
});

// provide the item to be deleted in the route params
app.delete('/api/people/:id', (req, res) => {
	// find the person in people array that matches with the id in route params
	const person = people.find((person) => person.id === Number(req.params.id));

	// if person not found, send back a 404 status code and a message
	if (!person) {
		return (
			res
				// 404 status is if we can't find the resource
				.status(404)
				.json({ success: false, msg: `No person with id ${req.params.id}` })
		);
	}
	// delete or filter out the person in the people array with the matching id
	const newPeople = people.filter(
		(person) => person.id !== Number(req.params.id)
	);
	return res.status(200).json({ success: true, data: newPeople });
});

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
