import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';

// Create a pubsub instance from PubSub constructor function
const pubsub = new PubSub();

// Initialize server
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Mutation,
		Subscription,
		User,
		Post,
		Comment
	},
	context: {
		db,
		pubsub,
		prisma
	}
});

// Start server
server.start(() => {
	console.log('The server is up!');
});
