import React from 'react';
import Navbar from './Navbar';
import Form from './Form';
import PageContent from './PageContent';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

export default function App() {
	// All components wrapped inside the ThemeProvider and LanguageProvider are subscribed to the Provider's context changes
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
