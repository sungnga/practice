import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import Form from './Form';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Navbar />
				<Form />
			</Fragment>
		);
	}
}

export default App;
