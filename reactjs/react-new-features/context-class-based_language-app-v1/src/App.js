import React, { Component } from 'react';
import Navbar from './Navbar';
import Form from './Form';
import PageContent from './PageContent';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

class App extends Component {
	render() {
		// All components wrapped inside the ThemeProvider are subscribed to context changes
		return (
			<ThemeProvider>
				<LanguageProvider>
					<PageContent>
						<Navbar />
						<Form />
					</PageContent>
				</LanguageProvider>
			</ThemeProvider>
		);
	}
}

export default App;
