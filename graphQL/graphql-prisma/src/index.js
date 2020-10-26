import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';

// Create a pubsub instance from PubSub constructor function
const pubsub = new PubSub();

// Initialize server
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers,
	context(request) {
		return {
			db,
			pubsub,
			prisma,
			request
		};
	},
	fragmentReplacements
});

// Start the server
server.start(() => {
	console.log('The server is up!');
});
