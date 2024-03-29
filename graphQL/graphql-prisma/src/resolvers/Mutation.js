import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getUserId from '../utils/getUserId';
import generateToken from '../utils/generateToken';
import hashPassword from '../utils/hashPassword';

// ======= JSON Web Token ========
//
// CREATE A TOKEN:
// jwt.sign() method creates a new token
// It takes 2 arguments:
// 	- 1st arg is a payload object and it can have anything we want
// 	- 2nd arg is a secret and it's used to verify the integrity of a token. It's only going to live on the Node.js server. The secret can be anything
// What's returned from this method is a token and save it to a token variable
// const token = jwt.sign({ id: 46 }, 'mysecret')
// console.log(token)

// VERIFY A TOKEN:
// The jwt.verify() method is to verify that a token was created by a particular server
// This method decodes the token and also verifies that the token was created with a specific secret. This is how to ensure that the tokens we're reading are tokens created by that particular server
// This method takes 2 arguments:
//	- 1st arg is the token we want to verify
//  - 2nd arg is the secret
// If the token wasn't created with the same secret, this verify will fail
// This method returns the token, the decoded data object, and the decoded and verified data object
// The decoded data contains the payload when the token was created and the 'issued at' timestamp
// The client cannot tamper with the token because the client won't ever know that secret, therefore they can never be able to generate the same token. Only the server that generated the token knows the secret
// const decoded = jwt.verify(token, 'mysecret')
// console.log(decoded)

// COMPARE PASSWORD:
// The bcrypt.compare() method compares the plain-text password with the hashed password
// This method takes 2 arguments:
// - 1st arg is the password
// - 2nd arg is the hashed password
// This is an async operation. The resolved value that comes back is either true or false
// const dummy = async () => {
// 	const email = 'nga@example.com'
// 	const password = 'nga12345'

// 	const hashedPassword = '$2a$10$d0oMRA4j67oNN8z1tOKG3u.8JvZZtCsuYD1nRRGTg7IsJ/lnDOFaW'

// 	const isMatch = await bcrypt.compare(password, hashedPassword)
// 	console.log(isMatch)
// }
// dummy()
// ======================================

const Mutation = {
	// This function is an async operation
	// Destructure the prisma instance from context param
	async createUser(parent, args, { prisma }, info) {
		// Call the hashPassword method to hash the plain text password
    // Store the hashed value in password variable
		const password = await hashPassword(args.data.password)

		// This method takes 2 args:
		// - 1st arg is the data the client provides when they try to create a user
		// - Here, we use the spread operator to spread the existing data the client provides
		// - But for the password property, we take its value and pass it through the bcrypt.hash() method and return the hashed version here
		// - 2nd arg is the info object, what the client wants in return
		// This prisma .createUser() method returns a promise
		// Our createUser() resolve function can return the value coming back from the promise
		const user = await prisma.mutation.createUser({
			data: {
				...args.data,
				password
			}
		});

		const token = generateToken(user.id);

		// What we want to return from this function is an object that contains the user information and the generated auth token
		return { user, token };
	},
	async login(parent, args, { prisma }, info) {
		const user = await prisma.query.user({
			where: {
				email: args.data.email
			}
		});

		if (!user) {
			throw new Error('Unable to login');
		}

		const isMatch = await bcrypt.compare(args.data.password, user.password);

		if (!isMatch) {
			throw new Error('Unable to login');
		}

		const token = generateToken(user.id);

		return { user, token };
	},
	async deleteUser(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		// 1st arg is the operation arguments
		// 2nd arg is the info object, what the client wants back in return
		return prisma.mutation.deleteUser({ where: { id: userId } }, info);
	},
	// Destructure request from context param
	async updateUser(parent, args, { prisma, request }, info) {
		// Call the getUserId function and pass in the request
		const userId = getUserId(request);

		// Check if the password is a string
		// If it is, we're going to hash the password
		if (typeof args.data.password === 'string') {
			args.data.password = await hashPassword(args.data.password)
		}

		// The userId comes from authentication
		return prisma.mutation.updateUser(
			{
				where: {
					id: userId
				},
				data: args.data
			},
			info
		);
	},
	// Destructure request from context param
	createPost(parent, args, { prisma, request }, info) {
		// Call the getUserId function and pass in the request
		// This method validates the client token. If it's successful, it'll return the user id
		const userId = getUserId(request);

		// This code only runs if there's a userId, which means, the user is an authenticated user
		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: userId
						}
					}
				}
			},
			info
		);
	},
	async deletePost(parent, args, { prisma, request }, info) {
		// Check to see if this is an authenticated user
		const userId = getUserId(request);
		// Check to see if there is a post created by this authenticated user
		// Only the author of the post can delete the post
		const postExists = await prisma.exists.Post({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!postExists) {
			throw new Error('Unable to delete post');
		}

		// This code only runs if postExists is true, meaning that this post can be deleted by this authorized user
		return prisma.mutation.deletePost({ where: { id: args.id } }, info);
	},
	async updatePost(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);

		const postExists = await prisma.exists.Post({
			id: args.id,
			author: {
				id: userId
			}
		});
		// Check if this is a published post
		const isPublished = await prisma.exists.Post({
			id: args.id,
			published: true
		});

		if (!postExists) {
			throw new Error('Unable to update post');
		}

		// If published post exists and the post is about to be unpublished
		if (isPublished && args.data.published === false) {
			await prisma.mutation.deleteManyComments({
				where: {
					post: {
						id: args.id
					}
				}
			});
		}

		return prisma.mutation.updatePost(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	async createComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		// Allow comments on published posts only
		// Check if the post is published
		const postExists = await prisma.exists.Post({
			id: args.data.post,
			published: true
		});

		if (!postExists) {
			throw new Error('Unable to find post');
		}

		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: userId
						}
					},
					post: {
						connect: {
							id: args.data.post
						}
					}
				}
			},
			info
		);
	},
	async deleteComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const commentExists = await prisma.exists.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!commentExists) {
			throw new Error('Unable to delete comment');
		}

		return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
	},
	async updateComment(parent, args, { prisma, request }, info) {
		const userId = getUserId(request);
		const commentExists = await prisma.exists.Comment({
			id: args.id,
			author: {
				id: userId
			}
		});

		if (!commentExists) {
			throw new Error('Unable to update comment');
		}

		return prisma.mutation.updateComment(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	}
};

export { Mutation as default };
