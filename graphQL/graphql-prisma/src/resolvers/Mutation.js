import bcrypt from 'bcryptjs';

const Mutation = {
	// This function is an async operation
	// Destructure the prisma instance from context param
	async createUser(parent, args, { prisma }, info) {
		// Password validation
		if (args.data.password.length < 8) {
			throw new Error('Password must be 8 characters or longer');
		}

		// The bcrypt.hash() method takes in plain text and returns the hashed version
		// It takes 2 arguments:
		//	- 1st arg is the plain text password
		//	- 2nd arg is a salt, we provide the length of salt we want to use
		// A salt is a random series of chars that are hashed along with the string being hashed, making the hash password more secure
		// This method returns a promise. That promise resolves with the hash value
		// We're going to await that promise
		// Store the hash value in a password variable
		const password = await bcrypt.hash(args.data.password, 10);

		// This method takes 2 args:
		// - 1st arg is the data the client provides when they try to create a user
		// - Here, we use the spread operator to spread the existing data the client provides
		// - But for the password property, we take its value and pass it through the bcrypt.hash() method and return the hashed version here
		// - 2nd arg is the info object, what the client wants in return
		// This prisma .createUser() method returns a promise
		// Our createUser() resolve function can return the value coming back from the promise
		// Since we're returning the value, we can leave off the await keyword in front of the method and add the return keyword
		return prisma.mutation.createUser(
			{
				data: {
					...args.data,
					password
				}
			},
			info
		);
	},
	async deleteUser(parent, args, { prisma }, info) {
		// const userExists = await prisma.exists.User({ id: args.id });

		// 1st arg is the operation arguments
		// 2nd arg is the info object, what the client wants back in return
		return prisma.mutation.deleteUser({ where: { id: args.id } }, info);
	},
	async updateUser(parent, args, { prisma }, info) {
		return prisma.mutation.updateUser(
			{
				where: {
					id: args.id
				},
				data: args.data
			},
			info
		);
	},
	async createPost(parent, args, { prisma }, info) {
		return prisma.mutation.createPost(
			{
				data: {
					title: args.data.title,
					body: args.data.body,
					published: args.data.published,
					author: {
						connect: {
							id: args.data.author
						}
					}
				}
			},
			info
		);
	},
	async deletePost(parent, args, { prisma }, info) {
		return prisma.mutation.deletePost({ where: { id: args.id } }, info);
	},
	async updatePost(parent, args, { prisma }, info) {
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
	createComment(parent, args, { prisma }, info) {
		return prisma.mutation.createComment(
			{
				data: {
					text: args.data.text,
					author: {
						connect: {
							id: args.data.author
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
	deleteComment(parent, args, { prisma }, info) {
		return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
	},
	updateComment(parent, args, { prisma }, info) {
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
