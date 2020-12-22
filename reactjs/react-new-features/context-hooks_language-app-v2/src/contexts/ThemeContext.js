import React, { createContext } from 'react';
import useToggleState from '../hooks/useToggleState';

// Creating a context object. Save it to a variable
// Every context object comes with a Provider and a Consumer
export const ThemeContext = createContext();

// Define a Provider component
// The Provider contains the state that other components can subscribe to have access to this state and any context changes
export function ThemeProvider(props) {
	// Using custom hook to toggle state
	const [isDarkMode, toggleTheme] = useToggleState(false);

	// Any components inside the Provider wrapper will have access to the value prop and subscribe to context changes
	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
}

// NOTES
// Every Context object comes with a Provider React component that
// allows consuming components to subscribe to context changes
// Accepts a `value` prop to be passed to consuming components that
// are descendants of this provider
// One provider can be connected to many consumers
// Providers can be nested to override values deeper within the tree
// All consumers that are descendants of a Provider will re-render whenever the Provider's `value` prop changes
