# NOTES

### SETTING UP A REACT PROJECT
-------------------------------
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
----------------
**1st pattern in using useContext hook:**
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

**The Reducer:**
- A **reducer** is a pure function, a plain JS function. A reducer does not perform any side-effect and it's an synchronous operation. Given a certain input, we always get a predictable output
- The name of the reducer we give usually depends on the state the reducer is managing. For example, a reducer that manages user state we call it a userReducer
- Every reducer receives 2 pieces of input:
  - A **previous state**
  - An **action**. Action is like an event
- Based on the input, the reducer returns a new state: **(state, action) -> newState**
- The **action** is an object and it contains type and payload properties
  - **Type** property is a string that determines what type of state we want to perform
    - We get to determine what the type should be
    - By convention the string is all in uppercase separated by underscores
    - For example, `LOGIN_USER`
  - **Payload** property is an object that contains the values/data that's passed along with the action
- Since a reducer can have many types of conditions, we use a switch statement as compared to using an if statement
  - The switch statement is according to the action type
  - The case is the value of action type property
  - The case returns an **object** which contains the new state and any existing states
  - There's a default case that returns the previous state
  ```js
  const initialState = { user: '' };

  function userReducer(state, action) {
    switch (action.type) {
      case 'LOGIN_USER': {
        return {
          ...state,
          user: action.payload.username
        };
      }
      case 'LOGOUT_USER': {
        return {
          ...state,
          user: ''
        };
      }
      default:
        return state;
    }
  }

  const loginAction = { type: 'LOGIN_USER', payload: { username: 'Nga' } };
  const logoutAction = { type: 'LOGOUT_USER' };

  console.log(userReducer(initialState, logoutAction));
  ```

