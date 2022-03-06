const express = require('express');
// create a router instance from express.Router class
const router = express.Router();

// the base route '/login' is already setup in express middleware express.use()
// no need to write the base route here
router.post('/', (req, res) => {
	console.log(req.body); //to see the value submitted from form
	const { name } = req.body;
	if (name) {
		return res.status(200).send(`Welcome ${name}`);
	}
	res.status(401).send('Please provide credential');
});

module.exports = router;
