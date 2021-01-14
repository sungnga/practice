import { ApolloClient, InMemoryCache } from '@apollo/client';

// Instantiate a new client
const client = new ApolloClient({
	uri: 'https://ngala-music-share.hasura.app/v1/graphql',
	cache: new InMemoryCache()
});

export default client;
