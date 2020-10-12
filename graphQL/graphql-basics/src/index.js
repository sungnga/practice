import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
// Describes the operations and data structures
// The schema also defines what the data looks like
const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`

// Resolvers (functions)
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!'
    },
    name() {
      return 'Nga La'
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})