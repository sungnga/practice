import React, {
	useState,
	useEffect,
	useReducer,
	createContext,
	useContext
} from 'react';
import Login from './components/Login';
import Header from './components/Header';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';
import postReducer from './postReducer';

export const UserContext = createContext();
export const PostContext = createContext({
	posts: []
});

function App() {
	const initialPostState = useContext(PostContext);
	// state is an object that contains posts state
	// dispatch is a function
	const [state, dispatch] = useReducer(postReducer, initialPostState);
	const [user, setUser] = useState('Nga');
	// const [posts, setPosts] = useState([]);

	useEffect(() => {
		document.title = user ? `${user}'s Feed` : 'Please login';
	}, [user]);

	// const handleAddPost = useCallback(
	// 	(newPost) => {
	// 		setPosts([...posts, newPost]);
	// 	},
	// 	[posts]
	// );

	if (!user) {
		return <Login setUser={setUser} />;
	}
	return (
		<PostContext.Provider value={{ state, dispatch }}>
			<UserContext.Provider value={user}>
				<Header user={user} setUser={setUser} />
				<CreatePost user={user} />
				<PostList posts={state.posts} />
			</UserContext.Provider>
		</PostContext.Provider>
	);
}

export default App;
