import React, { useState, useRef, useContext } from 'react';
import { PostContext } from '../App';

function CreatePost({ user }) {
	const { dispatch } = useContext(PostContext);
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const imageInputRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();
		const post = { content, image, user, id: Date.now() };
		dispatch({ type: 'ADD_POST', payload: { post } });
		// handleAddPost(post);
		// setPosts(prevPosts => ([post, ...prevPosts]));
		setContent('');
		// Clear out image input after submit
		imageInputRef.current.value = '';
	}
	return (
		<div>
			<h1>Create New Post</h1>
			<form onSubmit={handleSubmit}>
				<input
					onChange={(event) => setContent(event.target.value)}
					type='text'
					placeholder='Add Post Content'
					value={content}
				/>
				<input
					onChange={(event) => setImage(event.target.files[0])}
					type='file'
					ref={imageInputRef}
				/>
				<button type='submit'>Submit Post</button>
			</form>
		</div>
	);
}

export default CreatePost;
