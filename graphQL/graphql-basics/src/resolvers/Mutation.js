import cuid from 'cuid';

const Mutation = {
	createUser(parent, args, { db }, info) {
		// The some method will return true if some users have this email. False if no user has this email
		const emailTaken = db.users.some((user) => user.email === args.data.email);

		// Send an error message to the client
		if (emailTaken) {
			throw new Error('Email taken.');
		}

		const user = {
			id: cuid(),
			...args.data
		};

		// Add the new user to the users array using .push method
		db.users.push(user);

		// Return user so the client can get values off of it
		return user;
	},
	deleteUser(parent, args, { db }, info) {
		// Find the user we want to delete
		// .find method returns the actual element in the array
		// .findIndex method returns the index of that element in the array
		// Return true if the user id matches the args id and store the user index in userIndex
		const userIndex = db.users.findIndex((user) => user.id === args.id);

		if (userIndex === -1) {
			throw new Error('User not found');
		}

		// The .splice method removes a certain number of element, start at a specific index
		// - 1st arg is the index to start the remove
		// - 2nd arg is how many elements to remove
		// - it returns the removed items in an array
		const deletedUsers = db.users.splice(userIndex, 1);

		// Updating the posts array by deleting all associated posts and comments made by this user
		db.posts = db.posts.filter((post) => {
			const match = post.author === args.id;

			if (match) {
				db.comments = db.comments.filter((comment) => comment.post !== post.id);
			}

			return !match;
		});
		// Updating the comments array by removing all the comments made by this user
		db.comments = db.comments.filter((comment) => comment.author !== args.id);

		// Return the deleted users
		return deletedUsers[0];
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
			pubsub.publish('post', { post });
		}

		return post;
	},
	deletePost(parent, args, { db }, info) {
		const postIndex = db.posts.findIndex((post) => post.id === args.id);

		// If post.id and the given post id doesn't match, it'll return -1
		if (postIndex === -1) {
			throw new Error('Post not found');
		}

		const deletedPosts = db.posts.splice(postIndex, 1);

		db.comments = db.comments.filter((comment) => comment.post !== args.id);

		return deletedPosts[0];
	},
	updatePost(parent, args, { db }, info) {
		const { id, data } = args;
		const post = db.posts.find((post) => post.id === id);

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
		pubsub.publish(`comment ${args.data.post}`, { comment });

		return comment;
	},
	deleteComment(parent, args, { db }, info) {
		// Does the comment we want to delete exist in the comments array?
		const commentIndex = db.comments.findIndex(
			(comment) => comment.id === args.id
		);

		if (commentIndex === -1) {
			throw new Error('Comment not found');
		}

		const deletedComments = db.comments.splice(commentIndex, 1);

		return deletedComments[0];
	},
	updateComment(parent, args, { db }, info) {
		const { id, data } = args;
		const comment = db.comments.find((comment) => comment.id === id);

		if (!comment) {
			throw new Error('Comment not found');
		}

		if (typeof data.text === 'string') {
			comment.text = data.text;
		}

		return comment;
	}
};

export { Mutation as default };
