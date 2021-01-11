import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: 'https://ngala-todo-graphql.hasura.app/v1/graphql',
	cache: new InMemoryCache()
});

ReactDOM.render(<App />, document.getElementById('root'));
