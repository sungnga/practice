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
  - In the ApolloProvider component, pass the client props and set to the client object
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