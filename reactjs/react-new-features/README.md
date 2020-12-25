## NOTES: React Hooks, Context API, Reducers, Next.js 

### USING CREATE REACT APP
- Create-react-app application is designed to get us up and running with a bare bone react app quickly
- To create a React project: `npx create-react-app <projectName> --use-npm`
- It will generate a few things:
  - create a new directory
  - generate all the boilerplate files 
  - install all of the npm modules necessary
- cd into the project directory
- Run: `npm start`
- Create-react-app is using Babel configuration and Webpack configuration behind the scenes. These tools are abstracted away

### REACT HOOKS
- A hook is nothing more than a function
- React hook is a function that lets you tap into react features, like state or lifecycle methods
- React ships with its own set of hooks we can use as building blocks and we can also create our own hooks, ie our own functions to customize behavior further
- So no longer are they called stateless functional component, they're now just called FUNCTIONAL COMPONENTS because it is possible to use state inside of them
useState is a hook function that we can call to allow us to use state inside a component

**useState:**
- Built-in React hook: useState is a function that allows us to use component state in our stateless functional components, something we could not do in the past
- useState manages component state
- In a functional component, state does not have to be an object. It can be a string, number, boolean, object, etc
  ```javascript
  const array = useState(0)
  <p> The current count is {array[0]} </p>
  ```
- What comes back from useState is an array of two items:
  - the first is the current state value that's going to change over time
  - the second is a function we can call in order to update the state 
- It is common to destructure the array and give it a name for the item at that index: 
  ```javascript
  const [count, setCount] = useState(0)
  <p> The current count is {count} </p>
  ```
- 4 pieces to useState:
  - define the state: useState(10)
  - get access to its current value: const [count, setCount]
  - render it: {count}
  - call the function to update the state: onClick={() => setCount(count + 1)}

**useState vs setState:**
- If you want to keep track of multiple states, you don't need to use a state object. You can just call useState multiple times on different things you want to keep track of
- Three things to note about state:
  - State doesn't need to be an object with useState
  - You can call useState as many times as you need in a given component for all of the different things you want to track
  - when you are using useState and you update the state, it completely replaces what was there before as opposed to how state worked in the past with objects where the data was merged. This makes things less error prone and it allows us to break up our big state objects into individual values

**useEffect hook:**
- useEffect allows us to do something in functional components that we previously we not able to do: lifecycle methods in clase-based components
- Import: `import {useEffect} from 'react'`
- useEffect is something we call and we pass to it a function. And this function is similar to a combination of componentDidMount and componentDidUpdate
- It's going to run once right away and it's going to run after changes to your component state or props
- It's a useful tool to have because now we can do what we were able to do with lifecycle methods that we can do right in our functional components
  ```javascript
  const [count, setCount] = useState(props.count)
  useEffect(() => {
    console.log('useEffect ran')
    document.title = count
  }, [count])
  ```
- What we've done using useEffect is we've allowed us to synchronize our props and our state with whatever we want to
- In this case, we are using it to synchronize the count state with the document title 

**3 ways to use useEffect:**
- 1. If we don't pass in a dependency array as 2nd arg to useEffect, the function (1st arg) runs if anything changes at all
  - `useEffect(() => {...})`
- 2. We can optionally pass in a dependency array as a 2nd arg. In here, we can explicitly list out our dependencies to update or take into effect when their state changes
  - This means that the function (1st arg) runs once when the component first mounts and runs on updates for that list of dependencies 
  - `useEffect(() => {...}, [dependencies_array])`
- 3. We can provide a dependency array but leave it empty
  - This means the function (1st arg) runs once when the component first mounts, but never runs on updates
  - `useEffect(() => {...}, [])`

- We can call useEffect multiple times for each specific feature, each with their own set of dependencies
- In general, it's a good idea to provide the 2nd arg, because we should be explicitly about what our effect depends on
  ```javascript
  const App = (props) => {
    // Returns an array of 2 items
    const [count, setCount] = useState(props.count)
    const [text, setText] = useState('')

    useEffect(() => {
      console.log('This should only run once!')
    }, [])

    useEffect(() => {
      console.log('useEffect ran')
      document.title = count
    }, [count])

    return (
      <div>
        <p>The current {text || 'count'} is {count}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(props.count)}>reset</button>
        <input value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
    )
  }

  App.defaultProps = {
    count: 10
  }

  //Cleaning up Effects (similar to componentDidUnmount):
  //After an item is removed, we can unmount it by returning a function
  useEffect(() => {
    console.log('setting up effect')
    return () => {
      console.log('cleaning up')
    }
  }, [])
  ```

**The 3 main features of useEffect:**
1. registering the effect itself: 1st arg function
2. registering a cleanup function, which is optional
3. registering dependencies array, which is optional
This allows us to get similar behavior to what we had before, but this is a more ideal way
Being able to call useEffect multiple time with different dependencies allows us to keep complex components simple and easy to work with

### REDUCERS

**useReducer:**
1. First, we need to define a reducer function before we can call useReducer
  - This reducer function looks identical to the type of reducers we're already used to creating w/ Redux
  ```javascript  
  const notesReducer = (state, action) => {
    switch (action.type) {
      case 'POPULATE_NOTES':
        return action.notes
      case 'ADD_NOTE':
        return [
          ...state,
          {title: action.title, body: action.body}
        ]
      case 'REMOVE_NOTE':
        return state.filter((note) => note.title !== action.title)
      default:
        return state
    }
  }
  ```
2. Then call the useReducer:
  - `const [notes, dispatch] = useReducer(notesReducer, [])`
  - useReducer takes in a reducer function and a state
  - useReducer returns an array of state and dispatch

3. Lastly, dispatch the action type:
  ```javascript
  dispatch({
    type: 'ADD_NOTE',
    title,
    body
  })
  ```

### CONTEXT API

**Context API and useContext Hook:**
- Context provides a way to pass data through the component tree without having to pass props down manually at every level
- In a typical React application, data is psssed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application
- Context provides a way to share values like these btwn components w/out having to explicitly pass a prop through every level of the tree

**1. To create a context (object):**
- Create a folder called context inside src directory. Create a notes-context.js in there
  ```javascript
  import React from 'react'
  const NotesContext = React.createContext()
  export { NotesContext as default }
  ```
**2. To use the context:**
- The context object that's created above needs to be accessible in the component that's providing things and on the component that's consuming things
- That's why we have it in its own separate file

- **2A. In the component that provides the context:**
  - Import the context in NoteApp.js: `import NotesContext from '../context/notes-context'`
  - Render the context component as the main root tag in JSX and pass in the Provider property: `<NotesContext.Provider></NotesContext.Provider>`
  - With this in place, we are providing the context value to anyone in here and their children and children's children who wants to consume it
  - we do this by setting the value property as an object with a list of props that other components can have access to: `<NotesContext.Provider value={{ notes, dispatch }}></..>`
  ```javascript
  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteForm />
    </NotesContext.Provider>
  );
  ```
- **2B. In the component that consumes the context:**
  - We use useContext hook to access the data
  - Import useContext Hook: `import React, { useContext } from 'react'`
  - Extract the props name you want to access the data, destructure it: `const { notes } = useContext(NotesContext)`
  - Then use the props as you like
  - Here's an example to access to the notes data using useContext hook:
  ```javascript
  import React, { useContext } from 'react'
  import NotesContext from '../context/notes-context'
  const NoteList = () => {
    const { notes } = useContext(NotesContext)

    return (
      notes.map((note) => {
        return (
          <Note key={note.title} note={note} />
        )
      })
    )
  }
  ```

**React.memo**
- `React.memo` is a higher order component. It's similar to `React.PureComponent` but for function components instead of classes
- If your function component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result
  ```js
  import React, { memo } from "react";
  function MyComponent(props) {
    //render using props
  };
  export default memo(MyComponent);
  ```
- In computing, **memoization** or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occurs again


### NEXT.JS

**Setting up a Next.js project:**
- Create a project directory. Then cd into it
- Create a package.json file. Run: `npm init -y`
- Install react, react-dom, and next packages: `npm i react react-dom next`
- In package.json file:
  - Lets specify some scripts for next
  - `npm run dev` will start development mode (Use this when building the app)
  - `npm run build` will build the app for production
  - `npm run start` will start the server
  ```js
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
  ```
- At the root of the project, create a directory called pages. It's important that this directory exists, because next.js is going to look for this folder
- In pages directory, create a file called index.js. This is the standard starting page and it's considered the home page of the application
- In pages/index.js file:
  - Write a functional component and export default it
  - Can name the component anything you like, but what's important to Next.js is the name of the file, index.js

**Basic routing in Next.js:**
- The unique thing about the `pages` directory is that Next.js will use the name of the file in this directory and generate a corresponding route
- For example, the route for index.js file is "/" and about.js file is "/about"
- In each file, write a component and export default it. The name of the component can be anything you want

**Next's Link component:**
- In a Next.js application, the initial page load is being rendered on the server-side. When a page refreshes or loads for the first time, it makes a request to the server and the webpage/HTML is rendered on the server-side and sends back to the browser. However, we don't want to make a request to the server and have the page refreshes every time we want to visit another page or click on a link. We still want a single-page application experience of client-side routing
- Next.js comes with a Link component that we can use to have the page be rendered on the client-side. This won't send a request to the server
- Import Link component: `import Link from "next/link";`
  - Use the Link component anywhere to direct users to a different page
  - It takes an href attribute
  - The Link components requires an anchor tag or any other elements such as a button, as long as it accepts an onClick attribute. Link component automatically passes the onClick event to the tag that it wraps around
  ```js
	<div>
		<Link href='/about'>
			<a>About Page</a>
		</Link>
		<Link href='/contact'>
			<button>Contact Page</button>
		</Link>
	</div>
  ```

**Overriding the default _app.js:**
- Next.js docs: https://nextjs.org/docs/advanced-features/custom-app
- Next.js uses the `App` component to initialize pages. You can override it and control the page initialization. Which allows you to do things like:
  - Persisting layout between page changes
  - Keeping state when navigating pages
  - Custom error handling using componentDidCatch
  - Inject additional data into pages
  - Add global CSS
- Lets say if we want to add some functionality that is consistent or common between all of our pages such as a navbar or a footer, we need to override the default `App`
- **To override the existing default _app.js in .next folder:**
  - In pages folder, create an _app.js file
  - Paste in the following code
  - Then import and render any components before or after the `<Component />` to persist throughout the app 
  - The example here is adding a Navbar component to every page
  ```js
  import App, { Container } from 'next/app';
  import Navbar from '../components/Navbar';

  function MyApp({ Component, pageProps }) {
    return (
      <Container>
        <Navbar />
        <Component {...pageProps} />
      </Container>
    );
  }

  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  MyApp.getInitialProps = async (appContext) => {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  };

  export default MyApp;
  ```

**The getInitialProps method:**
- Docs: https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
- `getInitialProps` enables server-side rendering in a page and allows you to do initial data population, it means sending the page with the data already populated from the server. This is especially useful for SEO
- NOTE: `getInitialProps` is deprecated. If using Next.js 9.3 or newer, it's recommended to use `getStaticProps` or `getServerSideProps` instead of `getInitialProps`
- These new data fetching methods allow you to have a granular choice between static generation and server-side rendering
- Static generation vs. server-side rendering: https://nextjs.org/docs/basic-features/pages
- In pages/index.js file:
  - Using the getInitialProps async method
  - This method must return an object
  ```js
  const Index = () => {
    return (
      <div>
        <h1>Our index page!!</h1>
      </div>
    );
  };
  Index.getInitialProps = async () => {
    return {props: console.log('GET INITIAL PROPS 2.0')}
  } 

  export default Index;
  ```
- Example of using the `getServerSideProps` method:
  ```js
  function Page({ data }) {
    // Render data...
  }

  // This gets called on every request
  export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
  }

  export default Page
  ```

**Two forms of pre-rendering for Next.js:**
- **Static Generation (Recommended):** The HTML is generated at **build time** and will be reused on each request. To make a page use Static Generation, either export the page component, or export `getStaticProps` (and `getStaticPaths` if necessary). It's great for pages that can be pre-rendered ahead of a user's request. You can also use it with Client-side Rendering to bring in additional data
- **Server-side Rendering:** The HTML is generated on **each request**. To make a page use Server-side Rendering, export `getServerSideProps`. Because Server-side Rendering results in slower performance than Static Generation, use this only if absolutely necessary

**Fetching posts with getServerSideProps method:**
- Install axios: `npm i axios`
- In pages/index.js file:
  - The getServerSideProps() is an async function and must return an object
  - Also the return object must have the `props` as the key
  - The Index component receives posts as a props
  - Map over the posts array and display the post titles in a list
  ```js
  import axios from 'axios';

  const Index = ({ posts }) => {
    // console.log(posts)
    return (
      <div>
        <h1>Our index page!!</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  };
  export async function getServerSideProps() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const { data } = res;
    return { props: { posts: data } };
  }

  export default Index;
  ```

**Context Object:**
- Docs: https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
- `getServerSideProps` receives a single argument called `context`, it's an object with the following properties:
  - `pathname` - Current route. That is the path of the page in `/pages`
  - `query` - Query string section of URL parsed as an object
  - `asPath` - String of the actual path (including the query) shown in the browser
  - `req` - HTTP request object (server only)
  - `res` - HTTP response object (server only)
  - `err` - Error object if any error is encountered during the rendering

**Query strings in Next:**
- We can add on query parameters to our routes. For example, we can use the query string property of context object to add an id parameter to the route/URL to make a request for a post with that id
- Since the `getServerSideProps` method receives the context object as an argument, we can call this method and return the query property as an object. We can then pass this query as props to our Post component
- In the pages/index.js file:
  - Create a link for each post using Link component to direct to the post page
  ```js
  <ul>
    {posts.map((post) => (
      <li key={post.id}>
        <Link href={`/post?id=${post.id}`}><a>{post.title}</a></Link>
      </li>
    ))}
  </ul>
  ```
- In pages/post.js file:
  - Write a getServerSideProps function that returns the query property as an object. This is an async function
  - This function takes context object as an argument, but we only want the query property. So destructure and just pass in query as an argument
  - Write a Post component that receives the query object as props. Then render a simple text to display the post id
  ```js
  const Post = ({ query }) => <h1>You are looking at post #{query.id}</h1>;

  export async function getServerSideProps({ query }) {
    return { props: { query: query } };
  }

  export default Post;
  ```

**useRouter Hook:**
- Docs: https://nextjs.org/docs/api-reference/next/router
- Another option to get query strings is to use the `useRouter` hook. We can use this hook to get access to the router object inside any component
  ```js
  import { useRouter } from 'next/router';

  export default function Post() {
    const router = useRouter();

    return <h1>You are looking at post #{router.query.id}</h1>;
  }
  ```

**Create custom server-side routes with Express:**
- Install Express: `npm i express`
- **Setup Express server:**
  - At the root of the project directory, create a file called expressServer.js that sets up Express with Next.js
  - In expressServer.js file:
    - This is just setting up Express with Next.js and not accepting any requests yet
    ```js
    const express = require('express');
    const next = require('next');
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      const server = express();

      server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Now serving on localhost:3000');
      });
    });
    ```
- **Modify the scripts in package.json file to run the expressServer**
  ```
  "scripts": {
    "dev": "node expressServer.js",
    "build": "next build",
    "start": "NODE_ENV=production node expressServer.js"
  }
  ```
  - Run: `npm run dev` to start up the express server
- **Hand all incoming requests to Next.js**
  - In expressServer.js file:
    ```js
    // For every request that comes in, call the handle() method
    // and pass in the req and res objects to Next.js
    // Next.js will handle the requests
    server.get('/p/:id', (req, res) => {
      app.render(req, res, '/post', { id: req.params.id });
    });
    ```
- **To add a custom server-side route:**
  - Define all custom routes just above the code that lets Next.js handles all incoming request
  - Follow this pattern when creating a custom route
  - First, define the route definition
  - Then call app.render() method to pass off the request to Next.js
  - 3rd arg is the route name defined in pages directory. It's telling Next to render this page for this route request
  - 4th arg is a query object that we want to provide with the request
  - In the Post component, we have access to query.id. So we can pass in the id key here
  - In express, we have access to the req.params object
  req.params.id is coming from the route definition "/p/:id"
  - Set the value for the id key to the id from req.params
  - We can even just pass in the entire req.params object as a 4th arg
    ```js
    server.get('/p/:id', (req, res) => {
      app.render(req, res, '/post', { id: req.params.id });
    });
    ```
- Final code example for defining custom server-side route with Express. In expressServer file:
  ```js
  const express = require('express');
  const next = require('next');

  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const server = express();

    server.get('/p/:id', (req, res) => {
      app.render(req, res, '/post', { id: req.params.id });
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Now serving on localhost:3000');
    });
  });
  ```