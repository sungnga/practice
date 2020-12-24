import axios from 'axios';
import Link from 'next/link'

// import React, { Component } from 'react';
// class Index extends Component {
// 	constructor(props) {
// 		super(props);
// 		// When sending a request, it's running both on the server and the client-side
// 		// So don't fetch inside a constructor
// 		// console.log('FETCHING YOUR DATA IN CONSTRUCTOR');
// 	}
// 	static async getInitialProps() {
// 		const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
// 		const { data } = res;
// 		return { posts: data };
// 	}

// 	render() {
// 		const { posts } = this.props;
// 		return (
// 			<div>
// 				<h1>Our index page!!</h1>
// 				<ul>
// 					{posts.map((post) => (
// 						<li key={post.id}>{post.title}</li>
// 					))}
// 				</ul>
// 			</div>
// 		);
// 	}
// }

const Index = ({ posts }) => {
	// console.log(posts)
	return (
		<div>
			<h1>Our index page!!</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/post?id=${post.id}`}><a>{post.title}</a></Link>
					</li>
				))}
			</ul>
		</div>
	);
};
export async function getServerSideProps() {
	const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
	const { data } = res;
	return { props: { posts: data } };
}

export default Index;
