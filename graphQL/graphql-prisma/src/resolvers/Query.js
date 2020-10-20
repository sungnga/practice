const Query = {
	users(parent, args, { db }, info) {
		// If no query argument provided, just return regular users array of objects
		if (!args.query) {
			return db.users;
		}

		// If query arg is provided, use .filter() method on users array to filter users based on given query arg
		return db.users.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts;
		}

		return db.posts.filter((post) => {
			const isTitleMatch = post.title
				.toLowerCase()
				.includes(args.query.toLowerCase());
			const isBodyMatch = post.body
				.toLowerCase()
				.includes(args.query.toLowerCase());
			return isTitleMatch || isBodyMatch;
		});
	},
	comments(parent, args, { db }, info) {
		return db.comments;
	},
	me() {
		return {
			id: '11233455',
			name: 'Mike',
			email: 'maike@example.com',
			age: 99
		};
	},
	post() {
		return {
			id: '34',
			title: 'GraphQL 101',
			body: '',
			published: false
		};
	}
};

export { Query as default };
