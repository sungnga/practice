import React, { Fragment, useContext } from 'react';
import { UserContext, PostContext } from '../App';

function Post({ user, content, image, id }) {
	const { dispatch } = useContext(PostContext);
	const currentUser = useContext(UserContext);
	const isCurrentUser = currentUser === user;

	function handleDeletePost() {
		dispatch({ type: 'DELETE_POST', payload: { id } });
	}

	return (
		<Fragment>
			{image && (
				<img
					alt='post cover'
					style={{ height: 100, width: 200, objectFit: 'cover' }}
					src={URL.createObjectURL(image)}
				/>
			)}
			<p>{content}</p>
			<div style={{ color: isCurrentUser && 'green' }}>{user}</div>
			<div>
				{isCurrentUser && <button onClick={handleDeletePost}>Delete</button>}
			</div>
		</Fragment>
	);
}

export default Post;
