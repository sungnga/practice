import React, { useState, useEffect, useCallback, createContext } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

export const UserContext = createContext();

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
		<UserContext.Provider value={user}>
			<Header user={user} setUser={setUser} />
			<CreatePost user={user} handleAddPost={handleAddPost} />
			<PostList posts={posts} />
		</UserContext.Provider>
	);
}

export default App;
