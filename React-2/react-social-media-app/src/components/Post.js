import React, { Fragment, useContext } from 'react';
import { UserContext } from '../App';

function Post({ user, content, image }) {
	const currentUser = useContext(UserContext);
	const isCurrentUser = currentUser === user;

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
		</Fragment>
	);
}

export default Post;
