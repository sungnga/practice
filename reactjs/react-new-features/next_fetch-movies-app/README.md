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
- NOTE: If using Next.js 9.3 or newer, it's recommended to use `getStaticProps` or `getServerSideProps` instead of `getInitialProps`
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