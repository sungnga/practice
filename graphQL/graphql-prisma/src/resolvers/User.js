import getUserId from '../utils/getUserId';

const User = {
	// email resolver function
	// This function returns either a string, an email, or null
	// parent arg is the user object
	email: {
		// The fragment makes sure Prisma fetches certain data about, in this case, the User, when a specific resolver runs
		// It forces Prisma to get the user id from the database even the client didn't request it
		fragment: 'fragment userId on User { id }',
		resolve(parent, args, { request }, info) {
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
	},
	posts: {
		// Ensure that we always have access to the user id
		fragment: 'fragment userId on User { id }',
		resolve(parent, args, { prisma }, info) {
			return prisma.query.posts({
				where: {
					published: true,
					author: {
						id: parent.id
					}
				}
			});
		}
	}
};

export { User as default };
