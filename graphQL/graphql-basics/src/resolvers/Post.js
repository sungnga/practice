const Post = {
	author(parent, args, { db }, info) {
		// Return the correct author for the post
		// parent arg is the element in the posts array. parent arg is post data
		// Looping over elements in users array to find and return the user with matching id
		return db.users.find((user) => {
			return user.id === parent.author;
		});
	},
	comments(parent, args, { db }, info) {
		return db.comments.filter((comment) => {
			return comment.post === parent.id;
		});
	}
};

export { Post as default };
