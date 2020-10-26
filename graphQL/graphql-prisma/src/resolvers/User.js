import getUserId from '../utils/getUserId';

const User = {
	// email resolver function
	// This function returns either a string, an email, or null
	// parent arg is the user object
	email(parent, args, { request }, info) {
		// Check if the user is authenticated
		// Authentication is optional here. If a user is not authenticated, it'll return null
		const userId = getUserId(request, false);

		// console.log(parent)

		// Check to see if the authenticated user id matches up with parent.id
		// If it does, then the user is trying to select their own email
		// If it doesn't, then they're trying to select a different user's email. So return null
		if (userId && userId === parent.id) {
			return parent.email;
		} else {
			return null;
		}
	}
};

export { User as default };
