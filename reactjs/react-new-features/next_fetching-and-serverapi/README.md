## NOTES ON NEXT.JS

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