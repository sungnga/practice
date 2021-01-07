import React from 'react';
import Post from './Post';

function PostList({ posts }) {
	// Spread in the post object as props to Post child component
	return posts.map((post, idx) => <Post {...post} key={idx} />);
}

export default PostList;
