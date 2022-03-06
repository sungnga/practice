const express = require('express');
// create a router instance from the Router class
const router = express.Router();
let { people } = require('../data');

// the base route '/api/people' is already setup in express middleware express.use()
// no need to write the base route here
router.get('/', (req, res) => {
	res.status(200).json({ success: true, data: people });
});

// Handling a POST request using Javascript
router.post('/', (req, res) => {
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

router.post('/postman', (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res
			.status(400)
			.json({ success: false, msg: 'Please provide name value' });
	}
	// return the existing people array and append name to it
	res.status(201).json({ success: true, data: [...people, name] });
});

// the name after the : can be anything
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
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

module.exports = router;
