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
- In a Next.js application, the initial page load is being rendered on the server-side. When a page refreshes or loads for the first time, it makes a request to the server and the webpage is rendered on the server-side and sends back to the browser. However, we don't want to make a request to the server and have the page refreshes every time we want to visit another page or click on a link. We still want a single-page application experience of client-side routing
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

