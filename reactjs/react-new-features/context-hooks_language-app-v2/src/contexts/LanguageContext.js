import React, { createContext, Component } from 'react';

// Creating a context object. Save it to a variable
// Every context object comes with a Provider and a Consumer
export const LanguageContext = createContext();

// Define a Provider component
export class LanguageProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { language: 'french' };
		this.changeLanguage = this.changeLanguage.bind(this);
	}

	changeLanguage(e) {
		this.setState({ language: e.target.value });
	}

	render() {
		return (
			<LanguageContext.Provider
				value={{ ...this.state, changeLanguage: this.changeLanguage }}
			>
				{this.props.children}
			</LanguageContext.Provider>
		);
	}
}

// withLanguageContext is a higher order component
// that returns the component that it takes in,
// but now has a new prop, which contains the context/state of the LanguageProvider component
// along with all the existing props it has
// This higher oder component helps us out when we want to consume multiple contexts in a component
// For example, in Navbar component, we want to consume ThemeContext and LanguageContext
export const withLanguageContext = (Component) => (props) => (
	<LanguageContext.Consumer>
		{(value) => <Component languageContext={value} {...props} />}
	</LanguageContext.Consumer>
);
