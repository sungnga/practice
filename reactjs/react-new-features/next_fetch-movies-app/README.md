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
  - Can name the component anything you like, but what's important to next.js is the name of the file, index.js