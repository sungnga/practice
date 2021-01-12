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


## GRAPHQL, APOLLO CLIENT, REACT HOOKS, AND HASURA

### HASURA - Real-time GraphQL APIs
- Website: https://hasura.io/
- Hasura
  - provides us a database
  - we can configure it by describing the data we're going to be using
  - generates a GraphQL API to interact with our database

### APOLLO CLIENT
- Apollo GraphQL docs: https://www.apollographql.com/docs/react/
- First we need to create a react app before installing apollo client and graphql
- Install apollo client and graphql: `npm install @apollo/client graphql`

### Configure Apollo Client:
- To use Apollo, we need to configure it
- We need to setup our client by instantiating a new client in index.js file
- Our client is going to keep track of all of our settings, what endpoint we're going to be making request to, and it's going to create our cache
- Go to Hasura GraphQL API and copy the GraphQL server's Endpoint/URl as the `uri` property of the constructor's configuration object
- In index.js file:
  ```js
  import { ApolloClient, InMemoryCache } from '@apollo/client';

  const client = new ApolloClient({
    uri: 'https://ngala-todo-graphql.hasura.app/v1/graphql',
    cache: new InMemoryCache()
  });
  ```

### Connect our client to React:
- We connect Apollo Client to React with the `ApolloProvider` component. The `ApolloProvider` is similar to React's `Context.Provider`. It wraps our React app and places the client on the context, which enables us to access it from anywhere in our component tree
- In index.js file:
  - Import ApolloProvider component from @apollo/client
  - Wrap the ApolloProvider component around the App component
  - In the ApolloProvider component, pass the client props and set it to the client instance we just created
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';
  import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

  const client = new ApolloClient({
    uri: 'https://ngala-todo-graphql.hasura.app/v1/graphql',
    cache: new InMemoryCache()
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById('root')
  );
  ```

### Requesting data using useQuery hook:
- Once our `ApolloProvider` is hooked up, we're ready to start requesting data with useQuery. useQuery is a React hook that use the Hooks API to share GraphQL data with our UI
- First, pass our GraphQL query (wrapped in the gql function) to the useQuery hook. When our component renders and the useQuery hook runs, a result object is returned that contains `loading`, `error`, and `data` properties:
  - Apollo Client tracks error and loading state for us, which are reflected in the `loading` and `error` properties
  - When the result of our query comes back, it's attached to the `data` property
- Import the gql function to parse the query string into a query document
- In App.js file:
  - Import useQuery hook and gql function
  - By convention, the name of the query is written in uppercase and separated by underscores
  - Inside the App component and at the very top, call useQuery() and pass in the name of the query we're requesting
  - What we get back are the data, loading, and error properties and we can destructure those 
  - Write an if statement to handle the loading state and when there's an error
  - In the data property is our todos array
  ```js
  import React from 'react';
  import { useQuery, gql } from '@apollo/client';

  const GET_TODOS = gql`
    query getTodos {
      todos {
        done
        id
        text
      }
    }
  `;

  function App() {
    const { data, loading, error } = useQuery(GET_TODOS);

    if (loading) return <div>Loading todos...</div>;
    if (error) return <div>Error fetching todos!</div>;

    return (
      <div>
        {data.todos.map((todo) => (
          <p key={todo.id}>
            <span>{todo.text}</span>
            <button>&times;</button>
          </p>
        ))}
      </div>
    );
  }

  export default App;
  ```

### Add Styles with Tachyons:
- Tachyons docs: https://tachyons.io
  - Copy and paste the CDN link into index.html file
- In App.js file:
  - Add styles to our checklist app
  ```js
	return (
		<div className='vh-100 code flex flex-column items-center bg-purple white pa3 fl-1'>
			<h1 className='f2-l'>
				GraphQL Checklist{' '}
				<span role='img' aria-label='Checkmark'>
					✅
				</span>
			</h1>
			{/* Todo Form */}
			<form className='mb3'>
				<input
					className='pa2 f4 b--dashed'
					type='text'
					placeholder='Write your todo'
				/>
				<button className='pa2 f4 bg-green white' type='submit'>
					Create
				</button>
			</form>
			{/* Todo List */}
			<div className='flex flex-column items-center justify-center'>
				{data.todos.map((todo) => (
					<p key={todo.id}>
						<span className='pointer list pa1 f3'>{todo.text}</span>
						<button className='bg-transparent pointer bn f4'>
							<span className='red'>&times;</span>
						</button>
					</p>
				))}
			</div>
		</div>
	);
  ```

### Mutations with useMutation hook:
- Before executing any query, mutation, or subscription within the React app, it's best to first write it out and execute it within the Hasura GraphQL console
- **To update todos of done field in Hasura GraphiQL console:**
  - Use query variables to pass dynamic values to the query or mutation
  - To accept input values for a query or mutation, next to the name of the mutation add parenthesis and declare the variables
    - give the name of the query variable prefix with `$`. For example, `$id`
    - then specify its type and whether it is required or not
    - in our example, we want to provide the id and the done field to our mutation
    ```js
    mutation toggleTodo($id: uuid!, $done: Boolean!) {
      update_todos(where: {id: {_eq: $id}}, _set: {done: $done}) {
        returning {
          text
          id
          done
        }
      }
    }
    ```
  - In the Query Variables panel, provide the values to the query variables in json format
    ```js
    {
      "id": "88f202d8-b37f-4741-a25a-39f620ef2c22",
      "done": true
    }
    ```
  - Then execute the mutation to update the todo based on id
- **Create an update mutation on client-side React UI:**
  - In App.js file:
    - First, create a variable that holds the update mutation. In our case, call it TOGGLE_TODO
    - Then pass TOGGLE_TODO to useMutation() hook inside App component
    - What we get back from useMutation is a toggleTodo function in an array and we can destructure that
    - This toggleTodo function returns a promise since this is an async operation
    - So when the todo item is clicked, execute the handleToggleTodo function
    - Write a handleToggleTodo function that 
      - accepts a todo id and done properties as arguments
      - executes the toggleTodo function
      - make handleToggleTodo function an async function because toggleTodo resolves in a promise
      - Pass in, as an object, the values for the id and done fields to the variables key
      - what we get back from the data is the todo object which contains the id, text, and done fields
    - Lastly, in rendering todo list, toggle the todo with a strike when the user double-clicks it
    ```js
    const TOGGLE_TODO = gql`
      mutation toggleTodo($id: uuid!, $done: Boolean!) {
        update_todos(where: { id: { _eq: $id } }, _set: { done: $done }) {
          returning {
            text
            id
            done
          }
        }
      }
    `;

    const [ toggleTodo ] = useMutation(TOGGLE_TODO);

    async function handleToggleTodo(todo) {
      const data = await toggleTodo({
        variables: { id: todo.id, done: !todo.done }
      });
      console.log(data);
    }

    {data.todos.map((todo) => (
      <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id}>
        <span className={`pointer list pa1 f3 ${todo.done && 'strike'}`}>
          {todo.text}
        </span>
        <button className='bg-transparent pointer bn f4'>
          <span className='red'>&times;</span>
        </button>
      </p>
    ))}
    ```

### Insert todos Mutations:
- In Hasura GraphiQL console:
  - For add todo mutation, we need to provide value for text field
  - To pass in the input value dynamically, we can declare a variable and pass in that
  - So we can declare the text variable and set it to String type and it's required
  ```js
  mutation addTodo($text: String!) {
    insert_todos(objects: {text: $text}) {
      returning {
        done
        id
        text
      }
    }
  }
  ```
- In the Query Variables panel, provide the values to the query variable in json format
  ```js
  {
    "text": "Pick up library books"
  }
  ```
- **Create an insert mutation on client-side React UI:**
  - When the todo form is submitted, we want to call the addTodo mutation function to add a todo in the database. Then we want to call the getTodos query function to refetch the todos items and display them on the page
  - In App.js file:
    - First, create a variable that holds the insert mutation. In our case, call it ADD_TODO
    - Then pass ADD_TODO to useMutation() hook inside App component
    - What we get back from useMutation is an addTodo function in an array and we can destructure that
    - Create a todoText state and initialize to an empty string
    - Upon submitting the todo form, call handleAddTodo function to handle the form
    - Note that we're storing the input value in todoText state
    - Write a handleAddTodo function executes the addTodo mutation function
      - This is an async operation to add a new todo to the database
      - Pass in, as an object, the value for the text field to the addTodo function
      - As a 2nd arg, we want to pass in the `refetchQueries` key and we want to query the `GET_TODOS`, because we want to render the new todo onto the page once the insert mutation is completed
    - Lastly in the useMutation() hook, we want to clear the input form once the mutation is completed
      - What we get back
    ```js
    import React, { useState } from 'react';
    import { useQuery, useMutation, gql } from '@apollo/client';

    const ADD_TODO = gql`
      mutation addTodo($text: String!) {
        insert_todos(objects: { text: $text }) {
          returning {
            done
            id
            text
          }
        }
      }
    `;

    const [todoText, setTodoText] = useState('');
    // Clear form input after mutation
    const [addTodo] = useMutation(ADD_TODO, {
      onCompleted: () => setTodoText('')
    });

    async function handleAddTodo(event) {
      event.preventDefault();
      if (!todoText.trim()) return;
      const data = await addTodo({
        variables: { text: todoText },
        refetchQueries: [{ query: GET_TODOS }]
      });
      console.log('added todo', data);
      // setTodoText('')
    }

    <form onSubmit={handleAddTodo} className='mb3'>
      <input
        className='pa2 f4 b--dashed'
        type='text'
        placeholder='Write your todo'
        onChange={(event) => setTodoText(event.target.value)}
        value={todoText}
      />
      <button className='pa2 f4 bg-green white' type='submit'>
        Create
      </button>
    </form>
    ```

### Delete todos Mutations:
- In Harsura GraphiQL console:
  ```js
  mutation deleteTodo($id: uuid!) {
    delete_todos(where: {id: {_eq: $id}}) {
      returning {
        done
        id
        text
      }
    }
  }
  ```
- In the Query Variables panel:
  - Provide the todo id we want to delete
  ```js
  {
    "id": "eef4d14e-f72a-4479-be77-db49a88c7940"
  }
  ```
- **Create a delete mutation on client-side React UI:**
  - In App.js file:
    - First, create a variable that holds the delete mutation. In our case, call it DELETE_TODO
    - Then pass DELETE_TODO to useMutation() hook inside App component
    - What we get back from useMutation is an deleteTodo function in an array and we can destructure that
    - When a user clicks on the X button, execute the handleDeleteTodo function which accepts the todo object as an argument
    - Write an async handleDeleteTodo function that
      - accepts the todo id as an argument
      - executes the deleteTodo mutation function to delete a todo based on id in the database
      - also pops up a confirm window to confirm that the user wants to delete the todo
      - the mutation function returns the data object which contains the deleted todo
    - Lastly, in the deleteTodo mutation function we want to manually update the cache data
      - first call the readQuery() method on cache to get the previous data object
      - then use the filter() method on the todos array to filter the todo by id
      - then call the writeQuery() method on cache to update the todos array data
    ```js
    const DELETE_TODO = gql`
      mutation deleteTodo($id: uuid!) {
        delete_todos(where: { id: { _eq: $id } }) {
          returning {
            done
            id
            text
          }
        }
      }
    `;

    const [deleteTodo] = useMutation(DELETE_TODO);

    async function handleDeleteTodo(todo) {
      const isConfirmed = window.confirm('Do you want to delete this todo?');
      if (isConfirmed) {
        const data = await deleteTodo({
          variables: { id: todo.id },
          update: (cache) => {
            const prevData = cache.readQuery({ query: GET_TODOS });
            const newTodos = prevData.todos.filter((t) => t.id !== todo.id);
            cache.writeQuery({ query: GET_TODOS, data: { todos: newTodos } });
          }
        });
        console.log('deleted todo', data);
      }
    }

    <button
      onClick={() => handleDeleteTodo(todo)}
      className='bg-transparent pointer bn f4'
    >
      <span className='red'>&times;</span>
    </button>
    ```


## MATERIAL UI


## RESOURCES
- Apollo GraphQL: https://www.apollographql.com/docs/react/
- Hasura: https://hasura.io/
- Tachyons: https://tachyons.io
  - Copy and paste the CDN link into index.html file
- Material UI docs: https://material-ui.com/