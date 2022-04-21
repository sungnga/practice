## SECTION 5: JWT BASICS
- Folder directory: /05-jwt-basics/

### Goals of this project
- Learn how to generate JWT (Json Web Token) for user authentication and allow access to certain data and routes

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/05-JWT-Basics/starter
- cd into project directory: `cd 05-jwt-basics`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, mongoose, http-status-codes, and jsonwebtoken libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

**Things that are already included in this project:**
- Express server has been setup
- We're using the express-async-errors package to setup our async error middleware. We have notFoundMiddleware and errorHandlerMiddleware already created to handle request errors
- All the static files in the public folder is served using express app
- Setup port to either listen to process.env.PORT or port 3000

### [02. Setup the controllers]()
- File: controllers/main.js
  - Setup two routes for dashboard and login
  ```js
  const login = async (req, res) => {
    res.send('Fake login/Register/Signup Route');
  };

  const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, John Doe`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
  };

  module.exports = { login, dashboard };
  ```
- File: routes/main.js
  - Instantiate a new `router` object from express.Router() class
  - Create and export two routes for dashboard and login. The base endpoint is setup in app.js file
  - The login route is a POST require because the client must provide the username and password
  ```js
  const express = require('express');
  const router = express.Router();

  const { login, dashboard } = require('../controllers/main');

  router.route('/dashboard').get(dashboard);
  // client must provide username and password
  router.route('/login').post(login);

  module.exports = router;
  ```
- File: app.js
  - Require in the mainRouter object
  - Setup the base route endpoint and pass in the mainRouter object as 2nd arg
  ```js
  const mainRouter = require('./routes/main');

  // base route
  app.use('/api/v1', mainRouter);
  ```