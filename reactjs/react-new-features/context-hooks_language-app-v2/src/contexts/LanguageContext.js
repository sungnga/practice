import React, { createContext, useState } from 'react';

// Creating a context object. Save it to a variable
// Every context object comes with a Provider and a Consumer
export const LanguageContext = createContext();

// Define a Provider component
export function LanguageProvider(props) {
	const [language, setLanguage] = useState('french');

	const changeLanguage = (e) => setLanguage(e.target.value);

	return (
		<LanguageContext.Provider value={{ language, changeLanguage }}>
			{props.children}
		</LanguageContext.Provider>
	);
}
