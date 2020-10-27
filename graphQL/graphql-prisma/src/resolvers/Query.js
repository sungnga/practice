import { Prisma } from 'prisma-binding';
import getUserId from '../utils/getUserId';

// prisma.query is an object
// .users() is one of the prisma query methods
// The 2nd arg to a query method can be nothing/null, string, or an object
// We're going to provide an object as a 2nd arg and this object is provided by the client when they make a query operation and it is stored inside the info object param
// So we pass in the info object as a 2nd arg here
// What we get back from this query method is a promise
// A resolver method, like users(), can return the value from the data we get back

const Query = {
	users(parent, args, { prisma }, info) {
		// Provide operation arguments to prisma
		const opArgs = {
			first: args.first,
			skip: args.skip
		};

		// Check if the client provides a query argument in query operation
		// To know which operation arguments to provide, refer to the schema tab in the GraphQL Playground
		// We're looking for the 'where' argument
		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query
					}
				]
			};
		}

		return prisma.query.users(opArgs, info);
	},
	async myPosts(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const opArgs = {
			where: {
				author: {
					id: userId
				}
			}
		};

		if (args.query) {
			opArgs.where.OR = [
				{
					title_contains: args.query
				},
				{
					body_contains: args.query
				}
			];
		}

		return prisma.query.posts(opArgs, info);
	},
	posts(parent, args, { prisma }, info) {
		// We're only getting posts where published is true
		const opArgs = {
			first: args.first,
			skip: args.skip,
			where: {
				published: true
			}
		};

		if (args.query) {
			opArgs.where.OR = [
				{
					title_contains: args.query
				},
				{
					body_contains: args.query
				}
			];
		}

		return prisma.query.posts(opArgs, info);
	},
	comments(parent, args, { prisma }, info) {
		return prisma.query.comments(null, info);
	},
	async me(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		return prisma.query.user({
			where: {
				id: userId
			}
		});
	},
	// Mark this as an async function
	async post(parent, args, { prisma, request }, info) {
		// Check if the user is an authenticated user
		// If the user is authenticated, userId will get set to their string id
		// If the user is not authenticated, userId will get set to null
		const userId = getUserId(request, false);

		// Get the post by id. It also makes sure that the post is either published or owned by the authenticated user
		const posts = await prisma.query.posts(
			{
				where: {
					id: args.id,
					OR: [
						{
							published: true
						},
						{
							author: {
								id: userId
							}
						}
					]
				}
			},
			info
		);

		if (posts.length === 0) {
			throw new Error('Post not found');
		}

		return posts[0];
	}
};

export { Query as default };
