## SECTION 4: STORE API
- Folder directory: /04-store-api/

### Goals of this project
- We will learn about filtering, sorting, and dynamically populating our database
- We are in charge of the store API and we are providing options for the clients to query the store database
- Clients can make HTTP calls to search for products, search by category, filter by company name, filter by price, etc.

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/04-store-api/starter
- cd into project directory: `cd 04-store-api`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, and mongoose libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Setup basic Express app]()
- File: app.js
  - The error middleware have already prepared for us, so we can use it here in `app.use()`
  - Write an async start function that starts the Express server only if we successfully connect to the database. We will connect to the database later
  - We going to setup the PORT variable here using dotenv
  ```js
  require('dotenv').config();

  const express = require('express');
  const app = express();

  const notFoundMiddleware = require('./middleware/not-found');
  const errorMiddleware = require('./middleware/error-handler');

  // middleware
  app.use(express.json());

  // root
  app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
  });

  // products route

  // async errors
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  const port = process.env.PORT || 3000;

  const start = async () => {
    try {
      // connectDB
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  start();
  ```
