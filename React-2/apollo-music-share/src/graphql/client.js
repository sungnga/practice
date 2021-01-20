import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { GET_QUEUED_SONGS } from './queries';

const client = new ApolloClient({
	link: new WebSocketLink({
		uri: 'wss://ngala-music-share.hasura.app/v1/graphql',
		options: {
			reconnect: true
		}
	}),
	cache: new InMemoryCache(),
	typeDefs: gql`
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
	`,
	resolvers: {
		Mutation: {
			addOrRemoveFromQueue: (_, { input }, { cache }) => {
				const queryResult = cache.readQuery({
					query: GET_QUEUED_SONGS
				});
				if (queryResult) {
					// destructure the queue property on data object
					const { queue } = queryResult;
					const isInQueue = queue.some((song) => song.id === input.id);
					// newQueue contains the updated queue array
					const newQueue = isInQueue
						? queue.filter((song) => song.id !== input.id)
						: [...queue, input];
					cache.writeQuery({
						query: GET_QUEUED_SONGS,
						data: { queue: newQueue }
					});
					return newQueue;
				}
				// return an empty array if there's no queryResult
				return [];
			}
		}
	}
});

const hasQueue = Boolean(localStorage.getItem('queue'));

// Initialize data
const data = {
	queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
};

client.writeQuery({
	query: GET_QUEUED_SONGS,
	data
});

// // Instantiate a new client
// const client = new ApolloClient({
// 	uri: 'https://ngala-music-share.hasura.app/v1/graphql',
// 	cache: new InMemoryCache()
// });

export default client;
