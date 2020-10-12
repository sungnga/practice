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
    published: false
  },
  {
    id: '11',
    title: 'Nodejs Mastery',
    body: 'Advanced Node',
    published: true
  },
  {
    id: '12',
    title: 'Javascript',
    body: 'A book about Javascript',
    published: true
  }
]

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
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
  `;

// Resolvers (functions)
const resolvers = {
	Query: {
    users(parent, args, ctx, info) {
      // If no query argument provided, just return regular users array of objects
      if (!args.query) {
        return users
      }

      // If query arg is provided, use .filter() method on users array to filter users based on given query arg
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
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
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
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
