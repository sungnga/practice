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

