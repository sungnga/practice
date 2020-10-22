import cuid from 'cuid';

const Mutation = {
	// This function is an async operation
	// Destructure the prisma instance of context param
	async createUser(parent, args, { prisma }, info) {
		// Check to see if the email the client provides already exists
		// This returns a boolean value
		const emailTaken = await prisma.exists.User({ email: args.data.email })
		
		if (emailTaken) {
			throw new Error('Email taken');
		}

		// This method takes 2 args:
		// - 1st arg is the data the client provides when they try to create a user
		// - 2nd arg is the info object, what the client wants in return
		// This prisma .createUser() method returns a promise
		// Our createUser() resolve function can return the value coming back from the promise
		// Since we're returning the value, we can leave off the await keyword in front of the method and add the return keyword
		return prisma.mutation.createUser({ data: args.data }, info)
	},
	async deleteUser(parent, args, { prisma }, info) {
		const userExists = await prisma.exists.User({ id: args.id })

		if (!userExists) {
			throw new Error('User not found')
		}

		// 1st arg is the operation arguments
		// 2nd arg is the info object, what the client wants back in return
		return prisma.mutation.deleteUser({where: {id: args.id}}, info)
	},
	updateUser(parent, args, { db }, info) {
		// Destructure id and data properties from args
		const { id, data } = args;
		// Find the user
		const user = db.users.find((user) => user.id === id);

		if (!user) {
			throw new Error('User not found');
		}

		if (typeof data.email === 'string') {
			const emailTaken = db.users.some((user) => user.email === data.email);

			if (emailTaken) {
				throw new Error('Email taken');
			}

			user.email = data.email;
		}

		if (typeof data.name === 'string') {
			user.name = data.name;
		}

		if (typeof data.age !== 'undefined') {
			user.age === data.age;
		}

		return user;
	},
	createPost(parent, args, { db, pubsub }, info) {
		const userExists = db.users.some((user) => user.id === args.data.author);

		if (!userExists) {
			throw new Error('User not found');
		}

		// Create a post
		const post = {
			id: cuid(),
			...args.data
		};

		// Add the new post to the posts array
		db.posts.push(post);

		if (args.data.published) {
			pubsub.publish('post', {
				post: {
					mutation: 'CREATED',
					data: post
				}
			});
		}

		return post;
	},
	deletePost(parent, args, { db, pubsub }, info) {
		const postIndex = db.posts.findIndex((post) => post.id === args.id);

		// If post.id and the given post id doesn't match, it'll return -1
		if (postIndex === -1) {
			throw new Error('Post not found');
		}

		// Destructure the post that was deleted in the posts array
		const [deletedPost] = db.posts.splice(postIndex, 1);

		db.comments = db.comments.filter((comment) => comment.post !== args.id);

		if (deletedPost.published) {
			pubsub.publish('post', {
				post: {
					mutation: 'DELETED',
					data: deletedPost
				}
			});
		}

		return deletedPosts[0];
	},
	updatePost(parent, args, { db, pubsub }, info) {
		const { id, data } = args;
		const post = db.posts.find((post) => post.id === id);
		const originalPost = { ...post };

		if (!post) {
			throw new Error('Post not found');
		}

		if (typeof data.title === 'string') {
			post.title = data.title;
		}

		if (typeof data.body === 'string') {
			post.body = data.body;
		}

		if (typeof data.published === 'boolean') {
			post.published = data.published;

			if (originalPost.published && !post.published) {
				// deleted
				pubsub.publish('post', {
					post: {
						mutation: 'DELETED',
						data: originalPost
					}
				});
			} else if (!originalPost.published && post.published) {
				// created
				pubsub.publish('post', {
					post: {
						mutation: 'CREATED',
						data: post
					}
				});
			}
		} else if (post.published) {
			// updated
			pubsub.publish('post', {
				post: {
					mutation: 'UPDATED',
					data: post
				}
			});
		}

		return post;
	},
	createComment(parent, args, { db, pubsub }, info) {
		const userExists = db.users.some((user) => user.id === args.data.author);
		const postExists = db.posts.some(
			(post) => post.id === args.data.post && post.published
		);

		if (!userExists || !postExists) {
			throw new Error('Unable to find user and post');
		}

		// Create a comment
		const comment = {
			id: cuid(),
			...args.data
		};

		db.comments.push(comment);
		// Publish the comment to subscribers using the .publish() method on pubsub
		// This method takes 2 args
		// - 1st arg is a string channel name
		// - 2nd arg is an object of the data being sent
		pubsub.publish(`comment ${args.data.post}`, {
			comment: {
				mutation: 'CREATED',
				data: comment
			}
		});

		return comment;
	},
	deleteComment(parent, args, { db, pubsub }, info) {
		// Does the comment we want to delete exist in the comments array?
		const commentIndex = db.comments.findIndex(
			(comment) => comment.id === args.id
		);

		if (commentIndex === -1) {
			throw new Error('Comment not found');
		}

		const [deletedComment] = db.comments.splice(commentIndex, 1);
		pubsub.publish(`comment ${deletedComment.post}`, {
			comment: {
				mutation: 'DELETED',
				data: deletedComment
			}
		});

		return deletedComment;
	},
	updateComment(parent, args, { db, pubsub }, info) {
		const { id, data } = args;
		const comment = db.comments.find((comment) => comment.id === id);

		if (!comment) {
			throw new Error('Comment not found');
		}

		if (typeof data.text === 'string') {
			comment.text = data.text;
		}

		pubsub.publish(`comment ${comment.post}`, {
			comment: {
				mutation: 'UPDATED',
				data: comment
			}
		});

		return comment;
	}
};

export { Mutation as default };
