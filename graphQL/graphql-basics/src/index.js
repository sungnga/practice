import { GraphQLServer } from 'graphql-yoga';
import cuid from 'cuid';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
let users = [
	{
		id: '1',
		name: 'Nga',
		email: 'nga@example.com',
		age: 66
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com'
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@example.com'
	}
];

// Demo post data
let posts = [
	{
		id: '10',
		title: 'GraphQL 101',
		body: 'A book about GraphQL',
		published: false,
		author: '1'
	},
	{
		id: '11',
		title: 'Nodejs Mastery',
		body: 'Advanced Node',
		published: true,
		author: '1'
	},
	{
		id: '12',
		title: 'Javascript',
		body: 'A book about Javascript',
		published: true,
		author: '2'
	}
];

let comments = [
	{
		id: '100',
		text: 'Great book!',
		author: '2',
		post: '12'
	},
	{
		id: '101',
		text: 'I learned a lot from this book',
		author: '3',
		post: '12'
	},
	{
		id: '102',
		text: 'The author did an amazing job of explaining complex concepts',
		author: '2',
		post: '10'
	},
	{
		id: '103',
		text: 'Love love this book',
		author: '1',
		post: '11'
	}
];

// Type definitions (schema)
// Describes the operations and data structures
// The schema also defines what the data looks like
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  `;

// Resolvers (functions)
const resolvers = {
	Query: {
		users(parent, args, ctx, info) {
			// If no query argument provided, just return regular users array of objects
			if (!args.query) {
				return users;
			}

			// If query arg is provided, use .filter() method on users array to filter users based on given query arg
			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase());
			});
		},
		comments(parent, args, ctx, info) {
			return comments;
		},
		me() {
			return {
				id: '11233455',
				name: 'Mike',
				email: 'maike@example.com',
				age: 99
			};
		},
		posts(parent, args, ctx, info) {
			if (!args.query) {
				return posts;
			}

			return posts.filter((post) => {
				const isTitleMatch = post.title
					.toLowerCase()
					.includes(args.query.toLowerCase());
				const isBodyMatch = post.body
					.toLowerCase()
					.includes(args.query.toLowerCase());
				return isTitleMatch || isBodyMatch;
			});
		}
	},
	Mutation: {
		createUser(parent, args, ctx, info) {
			// The some method will return true if some users have this email. False if no user has this email
			const emailTaken = users.some((user) => user.email === args.data.email);

			// Send an error message to the client
			if (emailTaken) {
				throw new Error('Email taken.');
			}

			const user = {
				id: cuid(),
				...args.data
			};

			// Add the new user to the users array using .push method
			users.push(user);

			// Return user so the client can get values off of it
			return user;
		},
		deleteUser(parent, args, ctx, info) {
			// Find the user we want to delete
			// .find method returns the actual element in the array
			// .findIndex returns the index of that element in the array
			// Return true if the user id matches the args id and store the user index in userIndex
			const userIndex = users.findIndex((user) => user.id === args.id);

			if (userIndex === -1) {
				throw new Error('User not found');
			}

			// The .splice method removes a certain number of element, start at a specific index
			// - 1st arg is the index to start the remove
			// - 2nd arg is how many elements to remove
			// - it returns the removed items in an array
			const deletedUsers = users.splice(userIndex, 1);

			// Updating the posts array by deleting all associated posts and comments made by this user
			posts = posts.filter((post) => {
				const match = post.author === args.id;

				if (match) {
					comments = comments.filter((comment) => comment.post !== post.id);
				}

				return !match;
			});
			// Updating the comments array by removing all the comments made by this user
			comments = comments.filter((comment) => comment.author !== args.id);

			// Return the deleted users
			return deletedUsers[0];
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.data.author);

			if (!userExists) {
				throw new Error('User not found');
			}

			// Create a post
			const post = {
				id: cuid(),
				...args.data
			};

			// Add the new post to the posts array
			posts.push(post);

			return post;
		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some((user) => user.id === args.data.author);
			const postExists = posts.some(
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

			comments.push(comment);

			return comment;
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			// Return the correct author for the post
			// parent arg is the element in the posts array. parent arg is post data
			// Looping over elements in users array to find and return the user with matching id
			return users.find((user) => {
				return user.id === parent.author;
			});
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.post === parent.id;
			});
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => {
				return post.author === parent.id;
			});
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.author === parent.id;
			});
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author;
			});
		},
		post(parent, args, ctx, info) {
			return posts.find((post) => {
				return post.id === parent.post;
			});
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('The server is up!');
});
