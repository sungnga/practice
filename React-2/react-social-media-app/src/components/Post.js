import React, { Fragment } from 'react';

function Post({ user, content, image }) {
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
			<div>{user}</div>
		</Fragment>
	);
}

export default Post;
