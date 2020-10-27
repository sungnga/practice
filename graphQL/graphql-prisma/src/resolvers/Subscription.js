import getUserId from '../utils/getUserId';

// The property name needs to match up with the name of the subscription defined in type definition
// Unlike Query and Mutation, the value for comment is not a method, it's an object
// On this object, setup a subscribe() method
// - The subscribe method runs every time someone tries to subscribe to count
// - It's a resolver method, so has all the regular arguments a resolver method gets
// - Destructure the prisma instance from context argument
// - Call the .comment() subscription method on prisma.subscription
// - Just like the query and mutation methods, this method takes 2 arguments
//	- 1st arg is the operation arguments
//	- 2nd arg is the info object

const Subscription = {
	comment: {
		subscribe(parent, { postId }, { prisma }, info) {
			return prisma.subscription.comment(
				{
					where: {
						node: {
							post: {
								id: postId
							}
						}
					}
				},
				info
			);
		}
	},
	post: {
		subscribe(parent, args, { prisma }, info) {
			return prisma.subscription.post(
				{
					where: {
						node: {
							published: true
						}
					}
				},
				info
			);
		}
	},
	myPost: {
		subscribe(parent, args, { prisma, request }, info) {
			const userId = getUserId(request);

			return prisma.subscription.post(
				{
					where: {
						node: {
							author: {
								id: userId
							}
						}
					}
				},
				info
			);
		}
	}
};

export { Subscription as default };
