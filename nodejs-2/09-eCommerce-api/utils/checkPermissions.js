const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
	// console.log(requestUser);
	// console.log(resourceUserId);
	// console.log(typeof resourceUserId);

	// if request user role is admin, return early
	if (requestUser.role === 'admin') return;
	// resourceUserId is an object. Need to convert it to a string
	// request user id is equal to resource user id
	if (requestUser.userId === resourceUserId.toString()) return;

	// if none of above conditions is met, throw error
	throw new CustomError.UnauthorizedError(
		'Not authorized to access this route'
	);
};

module.exports = checkPermissions;
