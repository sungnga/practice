import { ApolloClient, InMemoryCache } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

const client = new ApolloClient({
	link: new WebSocketLink({
		uri: 'wss://ngala-music-share.hasura.app/v1/graphql',
		options: {
			reconnect: true
		}
	}),
	cache: new InMemoryCache()
});
// // Instantiate a new client
// const client = new ApolloClient({
// 	uri: 'https://ngala-music-share.hasura.app/v1/graphql',
// 	cache: new InMemoryCache()
// });

export default client;
