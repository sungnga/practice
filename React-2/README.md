## SETTING UP A REACT PROJECT
- To create a project with create-react-app, run in the terminal: `npx create-react-app <project-name> --use-npm`
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


## ADVANCED REACT HOOKS

### State management using useContext hook:
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

### Concept of the Reducer:
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

### State management using useContext hook with useReducer hook:
- In App.js file:
  - We can use PostContext to manage our posts state
    - To create a PostContext: `export const PostContext = createContext();`
    - When creating a PostContext, we can provide a default value in the form of an object
      - Set posts property to an empty array. This initializes the posts state as an empty array
    - Export the PostContext
  - Import postReducer
  - Pass in the postReducer to the useReducer() hook as 1st arg
  - In the App component:
    - Call useContext() hook and pass in the PostContext to use post context. And what we get back is the initialPostState
    - Pass this initialPostState to the useReducer() hook as 2nd arg
    - What we get back from the useReducer() hook is a state and a dispatch function
    - Wrap the `<PostContext.Provider />` component around any components that want to consume its context. Set the value props to an object that contains the state and dispatch
    ```js
    import React, { createContext, useContext } from 'react';
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
    ```
- In postReducer.js file:
  - Write a postReducer function using a switch statement
  - Then define cases for ADD_POST and DELETE_POST, and a default case
  ```js
  function postReducer(state, action) {
    switch (action.type) {
      case 'ADD_POST': {
        const newPost = action.payload.post;
        return { posts: [newPost, ...state.posts] };
      }
      case 'DELETE_POST': {
        const deletedPostId = action.payload.id;
        return { posts: state.posts.filter((post) => post.id !== deletedPostId) };
      }
      default:
        return state;
    }
  }

  export default postReducer;
  ```
- In CreatePost.js file:
  - The CreatePost component will consume the PostContext
  - Import PostContext
  - Call useContext() hook and pass in PostContext as an argument. Then what we get back is the state and dispatch properties. We can destructure the dispatch function from it
  - In the handleSubmit function:
    - Call the dispatch function and pass in an object as an argument
    - In this object, specify the type property to ADD_POST and set the payload property to the post data that we get from the post form
    ```js
    import { PostContext } from '../App';

    const { dispatch } = useContext(PostContext);

    function handleSubmit(event) {
      event.preventDefault();
      const post = { content, image, user };
      dispatch({ type: 'ADD_POST', payload: { post } });
      // handleAddPost(post);
      // setPosts(prevPosts => ([post, ...prevPosts]));
      setContent('');
      // Clear out image input after submit
      imageInputRef.current.value = '';
    }
    ```
- To delete a post, in Post.js file:
  - Add a Delete button
  - Now we only want to show the Delete button to the currentUser who made the post
    - `{isCurrentUser && <button>Delete</button>}`
  - Import PostContext from App.js
  - Then call the useContext() hook and pass in the PostContext. What we get back is a state and dispatch and we can destructure the dispatch function
  - To delete a post, we want to call the postReducer's dispatch function to dispatch the DELETE_POST action type. The reducer will then update the posts state based on the action type we provide to the dispatch function
  - Write a handleDeletePost function that calls the dispatch function to delete a post
    - In the dispatch function, pass in an object that contains the action type of DELETE_POST and a payload of the post id
  - In the Delete button onClick event handler, call the handleDeletePost function
  ```js
  import { PostContext } from '../App';

  function Post({ user, content, image, id }) {
    const { dispatch } = useContext(PostContext);

    function handleDeletePost() {
      dispatch({ type: 'DELETE_POST', payload: { id } });
    }

    return (
      {isCurrentUser && <button onClick={handleDeletePost}>Delete</button>}
    )
  }
  ```


## HASURA - Real-time GraphQL APIs
- Website: https://hasura.io/
- Hasura
  - provides us a database
  - we can configure it by describing the data we're going to be using
  - generates a GraphQL API to interact with our database

## APOLLO CLIENT
- Apollo GraphQL docs: https://www.apollographql.com/docs/react/
- First we need to create a react app before installing apollo client and graphql
- Install: `npm install @apollo/client graphql`