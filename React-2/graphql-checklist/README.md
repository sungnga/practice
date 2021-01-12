# NOTES ON APOLLO REACT HOOKS

## SETUP PROJECT
- Create a react project: `npx create-react-app graphql-checklist --use-npm`
- Install apollo and graphql: `npm install @apollo/client graphql`
- In src folder, only have index.js and App.js files
- Starter code in index.js file:
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  ReactDOM.render(<App />, document.getElementById('root'));
  ```
- Starter code in App.js file:
  ```js
  import React from 'react';

  function App() {
    return <h1>App</h1>;
  }

  export default App;
  ```
- To start the project, run: `npm run start`
- Open http://localhost:3000 to view it in the browser


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
- **Create an update mutation on client-side React:**
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
- **Create an insert mutation on client-side React:**
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
- **Create a delete mutation on client-side React:**
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