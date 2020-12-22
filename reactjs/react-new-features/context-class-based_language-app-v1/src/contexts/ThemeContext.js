import React, { Component, createContext } from 'react';

// Creating a context object. Save it to a variable
// Every context object comes with a Provider and a Consumer
export const ThemeContext = createContext();

// Define a Provider component
// The Provider contains the state that other components can subscribe to have access to this state and any context changes
export class ThemeProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { isDarkMode: true };
		this.toggleTheme = this.toggleTheme.bind(this);
	}

	toggleTheme() {
		this.setState({ isDarkMode: !this.state.isDarkMode });
	}

	render() {
		// Any components inside the Provider wrapper will have access to the value prop and subscribe to context changes
		return (
			<ThemeContext.Provider
				value={{ ...this.state, toggleTheme: this.toggleTheme }}
			>
				{this.props.children}
			</ThemeContext.Provider>
		);
	}
}

// NOTES
// Every Context object comes with a Provider React component that
// allows consuming components to subscribe to context changes
// Accepts a `value` prop to be passed to consuming components that
// are descendants of this provider
// One provider can be connected to many consumers
// Providers can be nested to override values deeper within the tree
// All consumers that are descendants of a Provider will re-render whenever the Provider's `value` prop changes

// TO CONSUME THE CONTEXT:
// Go to any of the consuming component, set the contextType to the name of the context object
//   import ThemeContext context object. Then set the contextType
//   static contextType = ThemeContext;
// The `value` prop can be accessed using this.context
//   const { isDarkMode } = this.context
// Now the state/dataset stored in the context Provider can be used anywhere in the component that subscribes to it
// Another way to consume a context is by using MyContext.Consumer
// Look in Navbar.js and LanguageContext.js files to see how this used
