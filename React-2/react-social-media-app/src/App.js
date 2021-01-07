import React, { Fragment, useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
	const [user, setUser] = useState('Nga');
	const [posts, setPosts] = useState([]);
	console.log(posts);

	useEffect(() => {
		document.title = user ? `${user}'s Feed` : 'Please login';
	}, [user]);

	const handleAddPost = useCallback(
		(newPost) => {
			setPosts([...posts, newPost]);
		},
		[posts]
	);

	if (!user) {
		return <Login setUser={setUser} />;
	}
	return (
		<Fragment>
			<Header user={user} setUser={setUser} />
			<CreatePost user={user} handleAddPost={handleAddPost} />
			<PostList posts={posts} />
		</Fragment>
	);
}

export default App;
