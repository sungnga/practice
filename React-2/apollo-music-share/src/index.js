import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import App from './App';
import theme from './theme';
import client from './graphql/client';

ReactDOM.render(
	<ApolloProvider client={client}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<App />
		</MuiThemeProvider>
	</ApolloProvider>,
	document.getElementById('root')
);
