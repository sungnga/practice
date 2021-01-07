import React, { useState, useRef } from 'react';

function CreatePost({ user, handleAddPost }) {
	const [content, setContent] = useState('');
	const [image, setImage] = useState(null);
	const imageInputRef = useRef();

	function handleSubmit(event) {
		event.preventDefault();
		const post = { content, image, user };
		handleAddPost(post);
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
