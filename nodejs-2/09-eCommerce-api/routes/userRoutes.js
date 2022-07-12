const express = require('express');
const router = express.Router();
const {
	authenticateUser,
	authorizePermissions
} = require('../middleware/authentication');

const {
	getAllUsers,
	getSingleUser,
	showCurrentUser,
	updateUser,
	updateUserPassword
} = require('../controllers/userController');

// 1st arg is 1st middleware - authenticateUser
// 2nd arg is 2nd middleware - authorizePermissions. This middleware is invoked right away
// 3rd arg is the controller - getAllUsers
router
	.route('/')
	.get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers);

router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);

// the order of these routes matter!
// put routes with :id params last
router.route('/:id').get(authenticateUser, getSingleUser);

module.exports = router;
