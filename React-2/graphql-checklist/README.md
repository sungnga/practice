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


### CONFIGURE APOLLO CLIENT
- To use Apollo, we need to configure it
- We need to setup our client by instantiating a new client in index.js file
- Our client is going to keep track of all of our settings, what endpoint we're going to be making request to, and it's going to create our cache
- Go to Hasura GraphQL API and copy the GraphQL Endpoint and set to the `uri` property
- In index.js file:
  ```js
  import { ApolloClient, InMemoryCache } from '@apollo/client';

  const client = new ApolloClient({
    uri: 'https://ngala-todo-graphql.hasura.app/v1/graphql',
    cache: new InMemoryCache()
  });
  ```

