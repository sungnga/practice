import { Prisma } from "prisma-binding";

const Query = {
	users(parent, args, { prisma }, info) {
		// prisma.query is an object
		// .users() is one of the prisma query methods
		// The 2nd arg to a query method can be nothing/null, string, or an object
		// We're going to provide an object as a 2nd arg and this object is provided by the client when they make a query operation and it is stored inside the info object param
		// So we pass in the info object as a 2nd arg here
		// What we get back from this query method is a promise
		// A resolver method, like users(), can return the value from the data we get back
		return prisma.query.users(null, info)

		// // If no query argument provided, just return regular users array of objects
		// if (!args.query) {
		// 	return db.users;
		// }

		// // If query arg is provided, use .filter() method on users array to filter users based on given query arg
		// return db.users.filter((user) => {
		// 	return user.name.toLowerCase().includes(args.query.toLowerCase());
		// });
	},
	posts(parent, args, { prisma }, info) {
		return prisma.query.posts(null, info)

		// if (!args.query) {
		// 	return db.posts;
		// }

		// return db.posts.filter((post) => {
		// 	const isTitleMatch = post.title
		// 		.toLowerCase()
		// 		.includes(args.query.toLowerCase());
		// 	const isBodyMatch = post.body
		// 		.toLowerCase()
		// 		.includes(args.query.toLowerCase());
		// 	return isTitleMatch || isBodyMatch;
		// });
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
