import React, { Fragment, useState, useEffect } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';

function App() {
	const [user, setUser] = useState('Nga');

	useEffect(() => {
		document.title = user ? `${user}'s Feed` : 'Please login';
	}, [user]);

	if (!user) {
		return <Login setUser={setUser} />;
	}
	return (
		<Fragment>
			<Header user={user} setUser={setUser} />
		</Fragment>
	);
}

export default App;
