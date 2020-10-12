import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
// Describes the operations and data structures
// The schema also defines what the data looks like
const typeDefs = `
  type Query {
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
        id: '123',
        title: 'GraphQL 101',
        body: '',
        published: false
      }
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
