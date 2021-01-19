import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const typeDefs = gql`
	type Song {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}

	input SongInput {
		id: uuid!
		title: String!
		artist: String!
		thumbnail: String!
		duration: Float!
		url: String!
	}

	type Query {
		queue: [Song]!
	}

	type Mutation {
		addOrRemoveFromQueue(input: SongInput!): [Song]!
	}
`;

const client = new ApolloClient({
	link: new WebSocketLink({
		uri: 'wss://ngala-music-share.hasura.app/v1/graphql',
		options: {
			reconnect: true
		}
	}),
	cache: new InMemoryCache(),
	typeDefs
});

// Initialize data
const data = {
	queue: []
};

client.writeQuery({ data });

// // Instantiate a new client
// const client = new ApolloClient({
// 	uri: 'https://ngala-music-share.hasura.app/v1/graphql',
// 	cache: new InMemoryCache()
// });

export default client;
