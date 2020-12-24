// import React, { Component } from 'react';

// class Index extends Component {
// 	constructor(props) {
// 		super(props);
// 		// When sending a request, it's running both on the server and the client-side
// 		console.log('FETCHING YOUR DATA IN CONSTRUCTOR')
// 	}
// 	static async getInitialProps() {
// 		return { RES: console.log('FETCHING YOUR DATA IN GETINITIALPROPS') };
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1>Our index page!!</h1>
// 			</div>
// 		);
// 	}
// }

const Index = () => {
	return (
		<div>
			<h1>Our index page!!</h1>
		</div>
	);
};
Index.getInitialProps = async () => {
	return {res: console.log('GET INITIAL PROPS 2.0')}
} 

export default Index;
