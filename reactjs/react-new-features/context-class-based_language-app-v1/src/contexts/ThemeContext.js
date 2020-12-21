import React, { Component, createContext } from 'react';

// Creating a context object. Save it to a variable
// Every context object comes with a provider and consumer
export const ThemeContext = createContext();

// Define a Provider component
// The Provider contains the state that components subscribed to this Provider can consume
export class ThemeProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { isDarkMode: true };
	}
  render() {
    // Anything inside the Provider wrapper will have access to the value prop
    // and subscribe to context changes
		return (
			<ThemeContext.Provider
				value={{ ...this.state, tastesLikeChicken: true }}
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
