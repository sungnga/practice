const express = require('express');
const router = express.Router();

// import and destructure the controllers
const {
	getPeople,
	createPerson,
	createPersonPostman,
	updatePerson,
	deletePerson
} = require('../controllers/people');

// -----METHOD 1 OF SETTING UP ROUTE REQUESTS-----
router.get('/', getPeople);
router.post('/', createPerson);
router.post('/postman', createPersonPostman);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

// -----METHOD 2 OF SETTING UP ROUTE REQUESTS-----
// chaining the request methods that have the same routes
// note that the base route is omitted here
router.route('/').get(getPeople).post(createPerson);
router.route('/postman').post(createPersonPostman);
router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
