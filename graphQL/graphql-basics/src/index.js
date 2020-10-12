import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [
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
const posts = [
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

// Type definitions (schema)
// Describes the operations and data structures
// The schema also defines what the data looks like
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
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
	Post: {
		author(parent, args, ctx, info) {
			// Return the correct author for the post
			// parent arg is the element in the posts array. parent arg is post data
			// Looping over elements in users array to find and return the user with matching id
			return users.find((user) => {
				return user.id === parent.author;
			});
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => {
				return post.author === parent.id;
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
