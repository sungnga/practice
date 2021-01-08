# NOTES

### SETTING UP A REACT PROJECT
- To create a project with create-react-app, run in the terminal: `npx create-react-app react-social-media-app --use-npm`
- To run the app in development mode: `npm start`
- Open http://localhost:3000 to view it in the browser

**The index.js file:**
- The index.js file is the entry point for our web application
- This file lives at the root of src directory
- In index.js file:
  ```js
  import ReactDOM from 'react-dom';
  import App from './App'

  const rootNode = document.getElementById('root');
  ReactDOM.render(<App />, rootNode);
  ```

**The Parent Component App.js:**
- The App.js component is the parent component in our application
- All of the other components are child components of the parent App component
- The App.js component lives at the root of src directory
- We use this parent component as the root element in the HTML index.html file 
- In src/App.js file:
  - For every component we make we want to import React so that we can use JSX
  ```js
  import React from 'react';

  function App() {
    return <div>App</div>;
  }

  export default App;
  ```


### REACT HOOKS

**Option 1 in using useContext hook:**
- In App.js file:
  - Import CreateContext from React
  - Call `createContext()` to create a context
  - What's returned is a context object which contains a consumer and a provider.  
    - Name the context object anything you want
    - Also need to export this context object in order for other components to consume
  - Use `<UserContext.Provider />` like a component and wrap around any components you want to provide context
  - The provider has a value props that you can use to specify the props that other components can consume
    - `<UserContext.Provider value={user}>`
  ```js
  import React, { useState, useEffect, useCallback, createContext } from 'react';

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
  ```
- In Post.js file:
  - The Post component is consuming the user context created by the App parent component
  - Import the useContext hook from React
  - Import the context object before consuming it
  - Call useContext() hook and pass in the context object as an argument
  - What's returned is the value props specified by the context provider
  ```js
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
  ```