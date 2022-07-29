## SECTION 9: E-COMMERCE API
- Folder directory: /09-eCommerce-api/

### Goals of this project
- Build an e-commerce api
- Send json web token (JWT) via cookies
- How to implement role-based authorization
- What are Virtuals and how to use them
- How to use MongoDB aggregate pipeline
- How to publish docs via docgen package

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/10-e-commerce-api
- cd into project directory: `cd 08-send-email`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, http-status-codes,jsonwebtoken, helmet, cors, joi, express-rate-limit, rate-limiter, validator, mongoose, morgan and cookie-parser libraries. This will also generate the package-lock.json file
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Setup basic Express server]()
- [] import express and assign to variable
- [] setup start port variable (5000) and start function
- File: app.js
  ```js
  // express
  const express = require('express');
  const app = express();

  const port = process.env.PORT || 5000;

  const start = async () => {
    try {
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```

### [03. Connect to database]()
- [X] get connection string from MongoDB
- [X] setup .env with MONGO_URL variable and assign the value
- [X] import 'dotenv' and setup package
- [X] import connect() and invoke in the starter
- [X] restart the server
- [X] mongoose V6 info
- File: .env
  - In the connection string, give the database a name and provide the password
  ```js
  MONGO_URL=<connection_string>
  ```
- File: db/connect.js
  ```js
  const mongoose = require('mongoose');

  const connectDB = (url) => {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  };

  module.exports = connectDB;
  ```
- File: app.js
  - Import the dotenv package
  - Import the connectDB function
  - In the start function and inside the try block, invoke the connectDB() method and pass in the process.env.MONGO_URL as an argument
  ```js
  require('dotenv').config();

  // express
  const express = require('express');
  const app = express();

  // database
  const connectDB = require('./db/connect');

  const port = process.env.PORT || 5000;
  const start = async () => {
    try {
      // connect to MongoDB
      await connectDB(process.env.MONGO_URL);
      app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  start();
  ```

### [04. Setup basic routes and middleware]()
- [X] setup / GET Route
- [X] setup express.json() middleware
- [X] setup 404 and errorHandler middleware
- [X] import 'express-async-errors' package
  - This middleware automatically applies the async-await to all of the controllers
  - So we don't need to use the try-catch block in the controllers
- **404 vs ErrorHandler Middleware**
  - The 404 error handler is placed after all the routes and before other error handlers because this middleware doesn't call next(). Everything ends after this
  - The errorHandler middleware goes last because this middleware is only invoked inside an existing route
- File: app.js
  ```js
  // this middleware automatically applies the async-await to all of the controllers
  // so we don't need to use the try-catch block in the controllers
  require('express-async-errors');

  // middleware
  const notFoundMiddleware = require('./middleware/not-found');
  const errorHandlerMiddleware = require('./middleware/error-handler');

  // parse json data
  // this middleware makes it possible for the json data
  // be available in req.body in POST and UPDATE methods
  app.use(express.json());

  // testing the root route
  app.get('/', (req, res) => {
    res.send('Home page');
  });

  // the 404 error handler is placed after all the routes and before other error handlers
  // because this middleware doesn't call next(). Everything ends after this
  app.use(notFoundMiddleware);
  // the errorHandler middleware goes last because this middleware is only invoked
  // inside an existing route
  app.use(errorHandlerMiddleware);
  ```

### [05. Using Morgan package for debugging]()
- Morgan is a useful tool to help with debugging while in development. It logs useful route request information and prints it to the console. It tells the type of request method, the route path being made, the status code, and how long the request takes
- Docs: https://www.npmjs.com/package/morgan
- Install Morgan: `npm i morgan`
- File: app.js
  - Install morgan package
  ```js
  const morgan = require('morgan');

  app.use(morgan('tiny'));
  ```
- **Testing Morgan:**
  - Keep the terminal open
  - Go to the browser and make a request to the home page: `http://localhost:5000/`. You see this printed in the console: `GET / 304 - - 20.431 ms`
  - Make a request to this route: `http://localhost:5000/apple`. You should see this printed in the console: `GET /apple 404 20 - 4.403 ms`

### [06. Setup UserSchema model]()
- We have two types of users in our UserSchema model:
  - Admin user - can perform CRUD operations on product
  - Regular user - can checkout, cannot add or modify product
- When we create a new user instance we want to specify their role, whether they're an admin user or regular user
- [X] create models folder and User.js file
- [X] create schema with name,email, password, role (all type:String)
- [X] export mongoose model
- File: models/User.js
  - This is a basic UserSchema model with no validations
  ```js
  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, 'Please provide email']
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    }
  });

  module.exports = mongoose.model('User', UserSchema);
  ```

### [07. Using Validator package]()
- [Validator docs](https://www.npmjs.com/package/validator)
- Install Validator: `npm i validator`
- In our UserSchema model, we want to validate the email that the client provides. One approach is to use Mongoose's built-in validators. We can also define our custom validators. We're going to use a very popular package called Validator
- Validator package:
  - It validates and sanitizes strings only
  - It comes with many validation functions 
- File: models/User.js
  - Import validator package
  - Add the mongoose's validate property and in this object, set the validator.email function to the validator property. Include an error message to the user as well if the email is invalid
  ```js
  const validator = require('validator');

  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email'
    }
  },
  ```

### [08. Setup structure for auth controllers and routes]()
- [X] create controllers folder
- [X] add authController file
- [X] export (register,login,logout) functions
- [X] res.send('some string value')
- [X] create routes folder
- [X] setup authRoutes file
- [X] import all controllers
- [X] setup three routes
- [X] post('/register') post('/login') get('/logout')
- [X] import authRoutes as authRouter in the app.js
- [X] setup app.use('/api/v1/auth', authRouter)
- File: controllers/authController.js
  - Setup the basic structure for the three auth controllers
  ```js
  const register = async (req, res) => {
    res.send('register user');
  };

  const login = async (req, res) => {
    res.send('login user');
  };

  const logout = async (req, res) => {
    res.send('logout user');
  };
  module.exports = { register, login, logout };
  ```
- File: routes/authRoutes.js
  - Setup the routes for the three auth controllerss
  ```js
  const express = require('express');
  const router = express.Router();

  const { register, login, logout } = require('../controllers/authController');

  router.post('/register', register);
  router.post('/login', login);
  router.get('/logout', logout);

  module.exports = router;
  ```
- File: app.js
  ```js
  // routers
  const authRouter = require('./routes/authRoutes.js');

  app.use('/api/v1/auth', authRouter);
  ```

### [09. Setup Postman environment, test routes]()
- Postman environment is a way to setup different environment variables for different projects. For example, some projects may be localhost:3000 and others may be using localhost:5000
- **Setup Postman environment:**
  - Click on the Eye icon and in the Environment section, click on the Add button
  - Give the environment a name. Call it: Dev Environment
    - Add a VARIABLE value: URL
    - Add an INITIAL VALUE: http://localhost:5000/api/v1
    - Add a CURRENT VALUE: http://localhost:5000/api/v1
    - Click the Save icon
- **Setup Auth routes:**
  - Create a new Collection and give the project a name: Node.js-eCommerce-api
  - In the collection, create an Auth folder
  - In the Auth folder, create three auth routes
  - Create a 'Logout User' route:
    - This is a GET method
    - The path is: {{URL}}/auth/logout
    - In the Environment dropdown menu, select: Dev Environment
    - Click on the Send button. If everything is setup properly, we should get back "logout user"
  - Create a 'Register User' route:
    - This is a POST method
    - The path is: {{URL}}/auth/register
    - The Environment is: Dev Environment
    - Click on the Send button. If everything is setup properly, we should get back "register user"
  - Create a 'Login User' route:
    - This is a POST method
    - The path is: {{URL}}/auth/login
    - The Environment is: Dev Environment
    - Click on the Send button. If everything is setup properly, we should get back "login user"

### [10. Initial setup for register controller]()
- [X] create user
- [X] send response with entire user (only while testing)
- [] check if email already in use (schema and controller)
- [] ignore 'role'
- [] alternative 'admin' setup
- File: controllers/authController.js
  - For the time being, let's implement the register controller where it creates a new user instance and send back the user object with the information the client provided. We'll handle email validation and the role later
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  const register = async (req, res) => {
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  };
  ```
- **Register a user using Postman:**
  - Make a POST request in the register user route: {{URL}}/auth/register
  - In the Body tab, select raw data and JSON format. Provide the values for name, email, and password properties
    ```js
    {
      "name": "james",
      "email": "james1234@example.com",
      "password": "james1234"
    }
    ```
  - If the register controller is setup properly, we should get back a user object
    ```js
    {
      "user": {
        "name": "james",
        "email": "james1234@example.com",
        "password": "james1234",
        "role": "user",
        "_id": "62b6a254bd58e369430076ce",
        "__v": 0
      }
    }
    ```

### [11. Implement register controller: unique email]()
- [X] check if email already in use (schema and controller)
- We can validate the email to make sure that it is unique in two places:
  - Use Mongoose in the UserSchema model to add a `unique` property to the `email` object. Note that this DOES NOT validate the email, but rather checks to see if the email is unique. It'll throw an error if the value of email isn't unique
  - In the register controller, check to see if the email already exists in the User collection. If it does, we throw our CustomError class with an error message
- File: models/User.js
  ```js
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email'
    }
  },
  ```
- File: controllers/authController.js
  - Destructure the email property from req.body
  - Call the User.findOne() method and pass in the email property to find the email in the User collection
  - Write an if statement that checks if the email already exists, throw a CustomError class
  ```js
  const register = async (req, res) => {
    const { email } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ user });
  };
  ```

### [12. Implement register controller: setting role]()
- [X] ignore 'role'
- [X] alternative 'admin' setup
- In our current setup in the UserSchema model, when we register a new user, it'll be assigned as a regular user role by default. Also in front-end, when a person registers as a new user, he or she doesn't get to choose a role either. We can, however, go to User collection in MongoDB to change a user role. In a more real life scenario, we can setup the project where we can change a user's permission and role
- In this project, we want to make the first registered user as an admin user. We can set this up in the register controller
- File: controllers/authController.js
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    // the value of isFirstAccount is either truthy or falsy
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role });

    res.status(StatusCodes.CREATED).json({ user });
  };
  ```

### [13. Handle password]()
- [X] UserSchema.pre('save') - hook
- [X] use simple function instead of arrow function - this points to User instance
- [X] bcrypt.genSalt() method - number of rounds
- [X] bcrypt.hash() method
- Before saving the user object as a document in the database, we want to first hash the user password. We use a package called bcryptjs to help us with this
- Install bcryptjs: `npm i bcryptjs`
- File: models/User.js
  ```js
  const bcrypt = require('bcryptjs');

  // hash the password before saving the document
  // this is a hook
  UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  // make sure to use simple function instead of arrow function
  // so that this.password points to User instance
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };
  ```
- **Testing hash password using Postman:**
  - Register a new user in the register user route: {{URL}}/auth/register
  - Provide user name, email, and password information
    ```js
    {
      "name": "james",
      "email": "james1234@example.com",
      "password": "james1234"
    }
    ```
  - If hashing password is setup correctly, we should get back a user object containing the hashed password
    ```js
    {
      "user": {
        "name": "james",
        "email": "james1234@example.com",
        "password": "$2a$10$hSFHpaZrqoVzL4hst6.bTuERLXt.g9BUoxHDCVegv6w9wkbkHE3/q",
        "role": "admin",
        "_id": "62baa22c497b3555b890fa22",
        "__v": 0
      }
    }
    ```
  - Go to MongoDB dashboard page and navigate to the project's "users" collection. There should be a user document created with the hashed password

### [14. JWT setup in authController]()
- [X] initial jwt setup in authController
- [X] require 'jsonwebtoken' package
- [X] create jwt - jwt.sign(payload,secret,options)
- Let's issue json web token to users so we can start restricting access to certain resources
- We're going to start setting up the jsonwebtoken in the authController and later we will refactor the code into a utils folder so we can use it in multiple places
- Install jsonwebtoken package: `npm i jsonwebtoken`
- File: controllers/authController.js
  - Import jsonwebtoken package
  - Inside the register controller:
    - Once a user instance has been created, we want to create a tokenUser object which doesn't contain the user email and password
    - Then call the jwt.sign() method to issue the token to the tokenUser. This method takes three arguments
    - This register controller returns an object that contains the user object and the token property
  ```js
  const jwt = require('jsonwebtoken');

  const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    // the value of isFirstAccount is either truthy or falsy
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role });
    // after a user instance has been created, create a tokenUser object
    // tokenUser doesn't contain email and password
    const tokenUser = { name: user.name, userId: user._id, role: user.role };
    const token = jwt.sign(tokenUser, 'jwtSecret', { expiresIn: '1d' });

    // return a user object and token property
    res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
  };

  const login = async (req, res) => {
    res.send('login user');
  };
  ```
- **Testing jwt in Postman:**
  - Register a new user in the Register user route
  - Provide the information for name, email, and password
  - If a new user has been successfully created, we should get back an object that looks like this:
    ```js
    {
      "user": {
        "name": "susan",
        "userId": "62bbe39c579f855ba5659e6c",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VzYW4iLCJ1c2VySWQiOiI2MmJiZTM5YzU3OWY4NTViYTU2NTllNmMiLCJyb2xlIjoidXNlciIsImlhdCI6MTY1NjQ4MDY2OCwiZXhwIjoxNjU2NTY3MDY4fQ.erMeBSfmHJguy8Muj4U_tTGrawn9Di11ara68IDHBII"
    }
    ```

### [15. Refactor JWT setup]()
- [X] add variables in .env - JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [X] restart the server !!!!
- [X] refactor code, create jwt functions in utils folder
  - [X] require 'jsonwebtoken' package
  - [X] create jwt - jwt.sign(payload,secret,options)
  - [X] verify jwt - jwt.verify(token,secret)
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response
- [] add signed and secure flags to cookie
- Let's refactor the create JWT function and the verify JWT function so they are in a utils folder. This way we can use them as many time as we need in our project
- Once we have the createJWT function in the utils folder, we will make use of it in the auth register controller 
- File: .env
  - Add JWT_SECRET and JWT_LIFETIME variables
  ```js
  JWT_SECRET=<jwtSecret>
  JWT_LIFETIME=30d
  ```
- File: utils/jwt.js
  ```js
  const jwt = require('jsonwebtoken');

  const createJWT = ({ payload }) => {
    // the jwt.sign() method takes 3 args
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME
    });

    return token;
  };

  const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

  module.exports = { createJWT, isTokenValid };
  ```
- File: utils/index.js
  - Destructure both jwt function from jwt.js file
  - Then export both functions in index.js file in utils folder
  - This index.js file serves as entry point to all functions that we export here
  ```js
  const { createJWT, isTokenValid } = require('./jwt');

  module.exports = { createJWT, isTokenValid };
  ```
- File: controllers/authController.js
  - Import the createJWT util function from utils folder
  - In the register controller, use the createJWT function to issue a token to the new user
  ```js
  const { createJWT } = require('../utils');

  const user = await User.create({ name, email, password, role });
  // after a user instance has been created, create a tokenUser object
  // tokenUser doesn't contain email and password
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // issue jwt to the new user using the createJWT util function
  const token = createJWT({ payload: tokenUser });
  ```

### [16. Setup cookies in register controller]()
- [X] Setup cookies in register controller
- Up to this point in our register controller, once a new user has been created and a jwt has been issued, it sends back the user object and the token. Now, we want to store the token in the cookies instead. The register controller returns the user object and the cookie. The advantage of storing the token in a cookie is we can set it up in such a way that only the web browser(http) has access to it and the browser will automatically send the cookie upon the next http request
- The Express package comes with the `res.cookie()` method to send a cookie as a response in a controller
  - `res.cookie(name, value, [, options])`
  - name parameter is the name of the cookie
  - value parameter is the token - may be a string or object converted to json
  - options parameter is an object: expires, httpOnly, maxAge, path, secure, signed
- File: controllers/authController.js
  - In the res.status().json() response, remove the token property from the json response
  - In the register controller, call the res.cookie() method to send a cookie as a response. Provide the three necessary arguments
    - name of the cookie
    - the token as the value
    - in the option param - set the cookie expiration date and httpOnly
  ```js
  // milliseconds * seconds * minutes * hours
  const oneDay = 1000 * 60 * 60 * 24;

  // sending a cookie as a response
  // store token in cookie
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay)
  });

  // return a user object and token property
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
  ```
- **Testing cookies in Postman:**
  - Register a new user in the Register user route: {{URL}}/auth/register
  - Provide the user name, email, and password
  - We should get back a user object in the Body response tab
  - In the Cookies response tab, we get back the name of the token, the token value, expiration date and HttpOnly set to true

### [17. Parse cookies]()
- Now that we're able to deliver the jwt in a cookie, we want to retrieve the jwt coming back from the browser on a server. We want to see if the front-end really attaches a cookie for the upcoming requests. To do this, we need to use an external package, a middleware called cookie-parser, to parse the cookie
- Install cookie-parser: `npm i cookie-parser`
- After installing and using the middleware, we have access to the cookies in `req.cookies`
- File: app.js
  - Import the cookie-parser package
  - Call app.use() method to use the cookie-parser middleware
  - In the home test route, console log req.cookies to see what we get. This is what the server gets from the front-end when a request is made
  ```js
  const cookieParser = require('cookie-parser');

  // middleware to parse a cookie
  app.use(cookieParser());

  // testing cookie parser
  app.get('/api/v1', (req, res) => {
    console.log(req.cookies);
    res.send('Home page');
  });
  ```
- **Testing cookie-parser using Postman:**
  - First, make a POST request to Register user route: {{URL}}/auth/register
  - In the Body content, provide the user information: name, email, and password
  - This creates a new user instance and the token is stored in the cookie response
  - Second, let's retrieve the token in cookie sent from the browser on the backend server
  - Make a GET request to the home page: {{URL}}
  - If the cookie-parser middleware is setup correctly, we should see the token property in an object printed out in the console. This is what the server gets from the front-end
    ```js
    {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmdhIiwidXNlcklkIjoiNjJiZmNkZTk5Y2I2Nzc3YTIzYjk0MzViIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTY3MzcyNTcsImV4cCI6MTY1OTMyOTI1N30.e35rb84gSRGtGDAOj7UQ95ijSxfcUxnE9N8d3sdFSs8'
    }
    GET /api/v1 200 9 - 4.813 ms
    ```

### [18. Refactor cookies setup]()
- [X] refactor cookie code
- [X] setup func attachCookiesToResponse
- [X] accept payload(res, tokenUser)
- [X] create token, setup cookie
- [X] optionally send back the response
- In this step we're going to refactor the cookie setup as a util function and then use it in the register controller. We will also use this function in other places of the project in the future. The functionality of this function is first create a jwt by calling the createJWT() method that we created earlier and then call the res.cookie() method (provided by Express) to attach the jwt to the cookie response
- File: utils/jwt.js
  - Create a attachCookiesToResponse util function that accepts a res object and user object as payload
  - In this function:
    - First, create a jwt by calling the createJWT() method that we created earlier. It takes a user object as payload
    - Second, setup the cookie and attach the jwt to the cookie as a response by calling the res.cookie() method. Setup the three parameters
    - We don't need to return anything from this function
    - Export the function
  ```js
  const attachCookiesToResponse = ({ res, user }) => {
    const token = createJWT({ payload: user });

    // milliseconds * seconds * minutes * hours
    const oneDay = 1000 * 60 * 60 * 24;

    // sending a cookie as a response
    // store token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay)
    });
  };

  module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
  ```
- File: utils/index.js
  - Destructure the attachCookiesToResponse function from jwt.js file
  - Then export the function in this index.js file
  ```js
  const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');

  module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
  ```
- File: controllers/authController.js
  - Import the attachCookiesToResponse util function
  - In the register controller, call the attachCookiesToResponse function and pass in the res object and the user object as payload. The res object comes from the register controller
  - This controller still returns the user object and the user token is attached in the res.cookie response
  ```js
  const { attachCookiesToResponse } = require('../utils');

  const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    // the value of isFirstAccount is either truthy or falsy
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role });
    // after a user instance has been created, create a tokenUser object
    // tokenUser doesn't contain email and password
    const tokenUser = { name: user.name, userId: user._id, role: user.role };

    attachCookiesToResponse({ res, user: tokenUser });

    // return a user object
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
  };
  ```

### [19. Add signed and secure flags to cookie setup]()
- [X] add signed and secure flags to cookie setup
- Let's finish setting up the res.cookie with the signed and secure flags
- The secure flag marks the cookie to be used with HTTPS only. It restricts browsers to send cookies only over HTTPS. Set this flag to true when in production mode
- The signed flag indicates if the cookie is signed. It detects if the cookie has been tempered
- File: utils/jwt.js
  - In the attachCookiesToResponse function and inside the res.cookie() method:
    - Add the secure flag in the options argument. Set this flag to true if process.env.NODE_ENV is equal to 'production'
    - Add the signed flag and set it true
    ```js
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true
    });
    ```
- File: app.js
  - In the cookieParser middleware, we need to pass in our signature
  - **To access the signed cookie, it's now in `req.signedCookies`, not `req.cookies`**
  ```js
  app.use(cookieParser(process.env.JWT_SECRET));

  // testing cookie parser
  app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('Home page');
  });
  ```

### [20. Implement login controller]()
- [X] check if email and password exist, if one missing return 400
- [X] find user, if no user return 401
- [X] check password, if does not match return 401
- [X] if everything is correct, attach cookie
  and send back the same response as in register
- File: controllers/authController.js
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');
  const { attachCookiesToResponse } = require('../utils');

  const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomError.BadRequestError('Please provide email and password');
    }

    // find user by email in DB
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');
    }

    // comparePassword is a method we created in UserSchema model
    // user instance has access to this method
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');
    }

    const tokenUser = { name: user.name, userId: user._id, role: user.role };

    attachCookiesToResponse({ res, user: tokenUser });

    // return a user object
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };
  ```
- **Testing login controller in Postman:**
  - Make a POST request in Login user route: {{URL}}/auth/login
  - In the Body tab, provide the email and password credentials of a user we already registered
    ```js
    {
      "email": "chris@example.com",
      "password": "secret"
    }
    ```
  - If the login controller is setup properly, we should get back the user object that has their name, userId, and role. We should also get back the user token in cookies response
  - To see the user token on the server, make a GET request to the home route and the user token should be printed in the console

### [21. Implement logout controller]()
- [X] set token cookie equal to some string value
- [X] set expires:new Date(Date.now())
- When implementing the logout controller, there are two things we need to do. First thing is we need to set the value of token property in the cookie to a different value. Second set the cookie expiration date to something very small
- File: controllers/authController.js
  - In the logout controller:
    - Call the res.cookie() method to send a cookie response. Pass in the three arguments
    - 1st arg is the name of the property we want to set a new value. In our case, we stored the user jwt under `token` property when we first created the cookie in the register controller
    - 2nd arg is the value want to set the `token` property to. We essentially temper the cookie response, and therefore, the cookie will be removed
    - 3rd arg is the options. Here, we want to set the httpOnly to true and set the cookie expiration date to a timestamp that is very short
  ```js
  const logout = async (req, res) => {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now())
    });

    // for development purposes, send a json response
    res.status(StatusCodes.OK).json({ msg: 'User logged out' });
  };
  ```
- **Testing the logout controller using Postman:**
  - Make a GET request to the Logout user route: {{URL}}/auth/logout
  - No need to provide any data here
  - If the logout controller is setup properly, we get back a 200 OK status code and response a message. Also, the cookie response has been removed
  - To double check that the cookie has been removed, make a GET request to the home page route. We should not see the token value printed in the console. This means that when we make a subsequent request, the browser did not send a cookie to the server

### [22. Setup user routes structure]()
- [X] add userController file in controllers folder
- [X] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [X] res.send('some string value')
- [X] setup userRoutes file
- [X] import all controllers
- [X] setup just one route - router.route('/').get(getAllUsers);
- [X] import userRoutes as userRouter in the app.js
- [X] setup app.use('/api/v1/users', userRouter)
- All the auth routes we have set up are public routes. Now, let's setup some secured user routes where only authenticated users have access to the routes
- File: controllers/userController.js
  - Setup the basic structure of the five user controllers and export them
  ```js
  // only admin users have access to this route
  const getAllUsers = async (req, res) => {
    res.send('get all users route');
  };

  const getSingleUser = async (req, res) => {
    res.send(req.params);
  };

  const showCurrentUser = async (req, res) => {
    res.send('show current user');
  };

  const updateUser = async (req, res) => {
    res.send(req.body);
  };

  const updateUserPassword = async (req, res) => {
    res.send(req.body);
  };

  module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
  };
  ```
- File: routes/userRoutes.js
  - Setup the routes for the five user controllers
  ```js
  const express = require('express');
  const router = express.Router();

  const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
  } = require('../controllers/userController');

  router.route('/').get(getAllUsers);

  router.route('/showMe').get(showCurrentUser);
  router.route('/updateUser').patch(updateUser);
  router.route('/updateUserPassword').patch(updateUserPassword);

  // the order of these routes matter!
  // put routes with :id params last
  router.route('/:id').get(getSingleUser);

  module.exports = router;
  ```
- File: app.js
  ```js
  const userRouter = require('./routes/userRoutes');

  app.use('/api/v1/users', userRouter);
  ```
- **Setup user routes in Postman:**
  - The base route for user routes is: `'/api/v1/users'`
  - In main project folder, create a folder called User. Setup the five user routes in this folder
  - Create a 'Get all users' route with a GET method: {{URL}}/users
  - Create a 'Get single user' route with a GET method: {{URL}}/users/123
  - Create a 'Show current user' route with a GET method: {{URL}}/users/showMe
  - Create an 'Update user' route with a PATCH method: {{URL}}/users/updateUser
    - In the Body tab, update the name property in json format
  - Create an 'Update user password' route with a PATCH method: {{URL}}/users/updateUserPassword
    - In the Body tab, update the password property in json format
    
### [23. Implement getAllUsers and getSingleUser controllers]()
- [X] Get all users where role is 'user' and remove password
- [X] Get Single User where id matches id param and remove password
- [X] If no user 404
- File: controllers/userController.js
  - Import the User model, the StatusCodes object, and the CustomError class
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  // only admin users have access to this route
  const getAllUsers = async (req, res) => {
    // get all users with role of 'user'
    // then remove the password property from the return array of users
    const users = await User.find({ role: 'user' }).select('-password');

    res.status(StatusCodes.OK).json({ users });
  };

  const getSingleUser = async (req, res) => {
    // find one user that has the match id from req.params.id
    // then remove the password property from the found user object
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ user });
  };
  ```
- **Testing the getAllUsers and getSingleUser controllers using Postman:**
  - Make a GET request in the 'Get all users' route: {{URL}}/users
  - If the getAllUsers controller is setup properly, we should get an array of users from the database
  - Copy the value id of one of the users we got back from the database
    ```js
    {
      "_id": "62c29041dab89f45151942a0",
      "name": "Chris",
      "email": "chris@example.com",
      "role": "user",
      "__v": 0
    }
    ```
  - Make a GET request in the 'Get single user' route and pass in the user id as the params.id: {{URL}}/users/62c29041dab89f45151942a0
  - If the getSingleUser controller is setup properly, we should get back the matching user object. Also test with an incorrect user id

### [24. Authenticate user: authenticateUser middleware]()
- [X] Authenticate user
- The next step we want to take is create a middleware that we can use to protect the user routes. Only authenticated users have access to the resources of these routes
- **This is the user flow cycle:**
  - When a user register to our application, they must provide their name, email and password. The password is encrypted and the user information is stored in the database. A jwt is issued and stored in a signed cookies response. The browser automatically sends this to the server for subsequent requests
  - When a user successfully logged in to our application, a jwt is issued and stored in a signed cookies response. The browser automatically sends this cookie to the server for subsequent requests
  - A protected route has an authenticateUser middleware that verifies the user token before it allows access to the resource
  - When a user logs out, the token is removed from the cookies response
- File: middleware/authentication.js
  - Write an authenticateUser middleware that verifies the user token. If successful, add the authenticated user object to the req object. If unsuccessful, throw an error with an error message
  - The token of the user who is making the request to the protected route is found in req.signedCookies.token
  - Call the isTokenValid util function to verify the token
  - If the token is valid, add the user object to the req object. Add only the name, userId, and role properties to the user object
  - Call next() method because this is a middleware
  ```js
  const CustomError = require('../errors');
  const { isTokenValid } = require('../utils');

  const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    if (!token) {
      throw new CustomError.UnauthenticatedError('Authentication invalid');
    }

    try {
      // verify the token
      // the isTokenValid() util method returns the auth user object
      // destructure the properties
      const { name, userId, role } = isTokenValid({ token });
      // if successful, add user object to the req object w/ these props
      req.user = { name, userId, role };
      next();
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
  };

  module.exports = { authenticateUser };
  ```
- File: routes/userRoutes.js
  - Import the authenticateUser middleware
  - Use the middleware on the getAllUsers and getSingleUser routes
  ```js
  const { authenticateUser } = require('../middleware/authentication');

  // use the middleware on the routes we want to protect
  router.route('/').get(authenticateUser, getAllUsers);
  router.route('/:id').get(authenticateUser, getSingleUser);
  ```
- File: controllers/userController.js
  - In the getAllUsers controller, console log req.user to see if we get back the user object when we make a request to 'Get all users' route
  ```js
  const getAllUsers = async (req, res) => {
    console.log(req.user);

    // get all users with role of 'user'
    // then remove the password property from the return array of users
    const users = await User.find({ role: 'user' }).select('-password');

    res.status(StatusCodes.OK).json({ users });
  };
  ```
- **Testing the authenticateUser middleware using Postman:**
  - First, make sure a user is logged in to our application. Make a POST request to the 'Login user' route: {{URL}}/auth/login
  - If the user is successfully logged in, the jwt has been issued and it's stored in the signed cookies response in res.signedCookies. The browser sends this cookie to the server for subsequent requests
  - Then make a GET request to the 'Get all users' route: {{URL}}/users
  - Since this route is protected with the authenticateUser middleware, only authenticated user has access to the resource
  - If the authentication is successful, we will get back a list of users. Also in the console, it'll print out the authenticated user object
    - `{ name: 'Chris', userId: '62c29041dab89f45151942a0', role: 'user' }`
  - Also test the middleware by not logging in a user and then make a request to the 'Get all users' route. We should get back an error message "Authentication invalid"

### [25. Authorize permissions: authorizePermissions middleware]()
- [X] write a 2nd authentication middleware - checks user roles
- [X] introduce params
- How that we authenticated user in user routes, we also want to set permissions so that only users with certain roles can access certain routes. For example, in our application, only users with admin role have access to the 'getAllUsers' route
- We're going to write a second middleware that checks for the user role before they have access to the route. Note that this second middleware only runs after the first middleware (authenticateUser middleware) is successful, which is authenticate user 
- File: errors/unauthorized.js
  - Write and export an UnauthorizedError class that extends the CustomAPIError class. This error class has a status code of 403, which is a forbidden error
  ```js
  const { StatusCodes } = require('http-status-codes');
  const CustomAPIError = require('./custom-api');

  class UnauthorizedError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.FORBIDDEN; //status code of 403 Forbidden
    }
  }

  module.exports = UnauthorizedError;
  ```
- File: errors/index.js
  - Add the UnauthorizedError class to this index.js file. This file serves as the entry point to all the error classes
  ```js
  const UnauthorizedError = require('./unauthorized');

  module.exports = { UnauthorizedError };
  ```
- File: middleware/authentication.js
  - Write a second middleware, authorizePermissions, that checks for the user role. If it's not an 'admin' user, throw the UnauthorizedError class error
  ```js
  const CustomError = require('../errors');

  // ...roles is a rest operation that collects all the args passed to this middleware
  const authorizePermissions = (...roles) => {
    // this middleware returns a callback function
    // because it's invoked right away in
    // getAllUsers route in userRoutes.js file
    return (req, res, next) => {
      // since this is a 2nd middleware, it has access to the req.user object
      // that was created from the 1st middleware
      if (req.user.role !== 'admin') {
        throw new CustomError.UnauthorizedError(
          'Unauthorized to access this route'
        );
      }

      next();
    };
  };

  module.exports = { authorizePermissions };
  ```
- File: routes/userRoutes.js
  - Import the authorizePermissions middleware
  - Use this middleware as 2nd middleware in the getAllUsers route. Here, we want to pass in the user roles that have permission to access this route. NOTE THAT WE ARE INVOKING THIS SECOND MIDDLEWARE HERE
  ```js
  const {
    authenticateUser,
    authorizePermissions
  } = require('../middleware/authentication');

  // 1st arg is 1st middleware - authenticateUser
  // 2nd arg is 2nd middleware - authorizePermissions. This middleware is invoked right away
  // 3rd arg is the controller - getAllUsers
  router
    .route('/')
    .get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers);
  ```

### [26. Implement showCurrentUser controller]()
- [X] get user from req
- [X] send response with user
- The task of the showCurrentUser controller simply checks to see if there's a user object on the current user page. The route is https://domain/api/v1/users/showMe. For example, if the user is on this page and they decide to refresh the page. This makes a GET request to the 'showMe' route and this controller just checks to see if a user exists on the `req.user` object after the user authentication process is completed. The `req.user` is created only if the authentication is successful, if the token in the signed cookies response is still valid. If the user hasn't logged in or registered or there's no token in the cookies, then there's no `req.user` object. This controller does not need to query the database for the user
- File: routes/userRoutes.js
  - In the 'showMe' route, add the authenticateUser middleware as the first arg
  ```js
  router.route('/showMe').get(authenticateUser, showCurrentUser);
  ```
- File: controllers/userController.js
  - In the showCurrentUser controller, send back the status code of 200 OK and the user object in json format. The user object is found in req.user because we're applying the authenticateUser middleware on the 'showMe' route
  ```js
  const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
  };
  ```
- **Testing the showCurrentUser controller in PostMan:**
  - First, log in a user in the 'Login user' route: {{URL}}/auth/login
  - Then make a GET request to the 'Show current user' route: {{URL}}/users/showMe
  - Don't need to pass in any data
  - If the showCurrentUser controller is setup properly, we should get back the user object, the authenticated user
  - Also test if a user is not logged in. We should get back an error message of "Authentication invalid" and status code of 401 Unauthorized

### [27. Implement updateUserPassword controller]()
- [X] almost identical to login user
- [X] add authenticateUser middleware in the route
- [X] check for oldPassword and newPassword in the body
- [X] if one missing 400
- [X] look for user with req.user.userId
- [X] check if oldPassword matches with user.comparePassword
- [X] if no match 401
- [X] if everything good set user.password equal to newPassword
- [X] await user.save()
- File: routes/userRoutes.js
  - Add the authenticateUser middleware to the updateUserPassword route
  - Adding the middleware serves two things on this route. The first is, we only want authenticated user to access this route. The second is, we get access to the `req.user` object
  ```js
  router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
  ```
- File: controllers/userController.js
  ```js
  const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new CustomError.BadRequestError('Please provide both values');
    }

    const user = await User.findOne({ _id: req.user.userId });

    // we created the comparePassword method in UserSchema model
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
      throw new CustomError.UnauthenticatedError('Invalid credentials');
    }
    user.password = newPassword;

    // the save() method is Mongoose's pre save hook
    // we setup this hook to hash the password before saving the user instance to DB
    await user.save();
    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' });
  };
  ```
- **Testing the updateUserPassword controller using Postman:**
  - First, make sure to login a user in the 'Login user' route: {{URL}}/auth/login
  - Then make a PATCH request to the 'Update user password' route: {{URL}}/users/updateUserPassword
    - In the Body tab, provide the values to the oldPassword and newPassword properties
    ```js
    {
      "oldPassword": "secret",
      "newPassword": "newSecret"
    }
    ```
  - If the updateUserPassword controller is setup properly, we should get back a success message with a 200 OK status code
  - Note that the user password has been hashed and updated in MongoDB database

### [28. Create createTokenUser util function]()
- [X] create a file in utils (createTokenUser)
- [X] setup a function that accepts user object and returns userToken object
- [X] export as default
- [X] setup all the correct imports/exports and refactor existing code
- At this point, we've been creating the `tokenUser` object on the fly at least twice now in our project (in register and login controllers). We are about to do this again. When something we repeat over and over, it's a good idea to create a util function for it so that we can simply call it when we need to use it 
- File: utils/createTokenUser.js
  - Create and export a createTokenUser util function that takes a user object as an argument. It returns an object that has the user name, userId, and role
  ```js
  const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, role: user.role };
  };

  module.exports = { createTokenUser };
  ```
- File: utils/index.js
  - Import and export the createTokenUser util function in the index.js file in the utils folder. This file serves as the entry point to all the util functions
  ```js
  const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
  const { createTokenUser } = require('./createTokenUser');

  module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse,
    createTokenUser
  };
  ```
- Let's refactor our existing code to utilize the createTokenUser function
- File: controllers/authController.js
  - Import the createTokenUser util function
  - In both of the register and login controller, refactor the code for creating the userToken object
  ```js
  // after a user instance has been created, create a tokenUser object
  // tokenUser doesn't contain email and password
  // const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // refactor using the createTokenUser util function
  const tokenUser = createTokenUser(user);
  ```

### [29. Implement updateUser controller]()
- [X] add authenticateUser middleware in the route
- [X] check for name and email in the body
- [X] if one is missing, send 400 (optional)
- [X] use findOneAndUpdate()
- [X] create token user, attachCookiesToResponse and send back the tokenUser
- There are two ways to update a user instance:
  - User.findOneAndUpdate() method
  - User.save() method
- While this controller enables users to update their information, we don't want them to change their role from regular user to admin user. Also, they can't update their password here. We have a separate route for them to update their password
- **IMPORTANT NOTES ABOUT THE UPDATEUSER CONTROLLER**
  - The updateUser controller performs two main tasks. The first is it updates the user document in the database. The second is it updates the user token in the cookies response by calling the attachCookiesToResponse() method
  - Updating the cookies response is important because the authenticateUser middleware looks for the token in the signed cookies response to validate the user. Once the authentication process is successful, the middleware attaches the user object to the req object, hence the user info found in the `req.user` object gets updated 
  - Now when a different controller uses the authenticateUser middleware, the `req.user` object that the middleware generates will have the updated user info
- **Add the authenticateUser middleware to the updateUser route:**
- File: routes/userRoutes.js
  - Add the authenticateUser middleware to the updateUser route
  ```js
  router.route('/updateUser').patch(authenticateUser, updateUser);
  ```
- **updateUser controller using findOneAndUpdate() method:**
- File: controllers/userController.js
  - Import the createTokenUser and attachCookiesToResponse util functions
  - Use the .findOneAndUpdate() method on the User model to update the user instance. We find the user in the database by their id
  - After we update the user instance in DB, we want to update the user info in `req.user` object on the front-end by updating the user token in the cookies response
  - Call the createTokenUser() util method to create the tokenUser object. The tokenUser object has the properties of name, userId, and role. So technically, we're only updating the user name here
  - Then call the attachCookiesToResponse() method to attach the cookies to the response
  - Lastly, this controller sends back the user object along with the status code
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');
  const { createTokenUser, attachCookiesToResponse } = require('../utils');

  const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
      throw new CustomError.BadRequestError('Please provide all values');
    }

    // updating the user instance
    // 1st arg is we're looking for user by their id
    // 2nd arg is the properties to update
    // 3rd arg is the options
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { email, name },
      { new: true, runValidators: true }
    );
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };
  ```
- **Testing the userUpdate controller using Postman:**
  - First make sure to login a user in the 'Login user' route
  - Make a PATCH request to the 'Update user' route: {{URL}}/users/updateUser
  - Update the user name and/or email
    ```js
    {
      "name": "newDavid",
      "email": "newdavid@example.com"
    }
    ```
  - If the updateUser controller is setup properly, we should get back the user object, the signed cookies response, and status code of 200 OK
    ```js
    {
      "user": {
        "name": "newDavid",
        "userId": "62c133d2b5407e43468f4ba3",
        "role": "user"
      }
    }
    ```
- **updateUser controller using user.save() method:**
- File: controllers/userController.js
  - First, call User.findOne() method to find the user by their id
  - Manually update the email and name properties
  - Then call user.save() method to invoke the pre save hook on the user instance. This updates the user instance in MongoDB
  ```js
  // update user with user.save()
  const updateUser = async (req, res) => {
    const { email, name } = req.body;
    if (!email || !name) {
      throw new CustomError.BadRequestError('Please provide all values');
    }

    const user = await User.findOne({ _id: req.user.userId });
    user.email = email;
    user.name = name;
    // invoking the Mongoose pre save hook method on the user instance
    await user.save();

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });
  };
  ```
- File: models/User.js
  - Note that the pre save hook hash the user password before saving the user instance to MongoDB
  - We don't want this hook to hash the user password when we update the user info in the updateUser controller
  - We need to write a condition that only hash the user password if the password property has been modified/updated
  ```js
  // hash the password before saving the document
  // this is a hook
  UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));

    // if password isn't modified/updated, return early
    // this prevents re-hashing the password when updating user info
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });
  ```

### [30. Setup and apply checkPermissions function]()
- [X] create checkPermissions util function
- The next task we want to work on is create a util function that checks whether the request user has permission to access another user resource. Only the authenticated user id (request user) that matches with the resource user id and the admin user have access to another user resource. This is in the getSingleUser controller. For example, David (the request user) should not have permission to access Susan's (the resource user) information. However, James, an admin user, has access to Susan's information
- File: utils/checkPermissions.js
  - This util function checks for permission whether the request user can have access to the resource user information
  - Only an admin user and the request user id that matches with the resource user id can have access to the resource
  - Otherwise, throw an unauthorized error
  - This util function is used in the getSingleUser controller
  ```js
  const CustomError = require('../errors');

  const checkPermissions = (requestUser, resourceUserId) => {
    // console.log(requestUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);

    // if request user role is admin, return early
    if (requestUser.role === 'admin') return;
    // if request user id is equal to resource user id
    // resourceUserId is an object. Need to convert it to a string
    if (requestUser.userId === resourceUserId.toString()) return;

    // if none of above conditions is met, throw error
    throw new CustomError.UnauthorizedError(
      'Not authorized to access this route'
    );
  };

  module.exports = checkPermissions;
  ```
- File: utils/index.js
  ```js
  const checkPermissions = require('./checkPermissions');

  module.exports = { checkPermissions };
  ```
- File: controllers/userController.js
  - Import the checkPermissions util function
  - In the getSingleUser controller, after getting back the user from the database, call the checkPermissions() function to check for user permission. Pass in the req.user and user._id as arguments
    - The req.user is the authenticated and request user to this route
    - The user._id is the id of the resource user
  ```js
  const { checkPermissions } = require('../utils');

  const getSingleUser = async (req, res) => {
    // find one user that has the match id from req.params.id
    // then remove the password property from the found user object
    const user = await User.findOne({ _id: req.params.id }).select('-password');
    if (!user) {
      throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
    }

    // check the request user permission
    // the req.user is the auth and request user to this route
    // the user._id is the id of the resource user
    checkPermissions(req.user, user._id);

    res.status(StatusCodes.OK).json({ user });
  };
  ```
- **Testing the checkPermissions function using Postman:**
  - First, login a user who is an admin user in the 'Login user' route
  - Then make a request to the 'Get all users' route. This should return a list of users since this is an admin user that makes the request. Copy one of the users id
  - Go to the 'Get single user' route and paste in the user id to request route: {{URL}}/users/62c133d2b5407e43468f4ba3
  - We should get back the resource user info because the request user is an admin user
  - Also test by logging in another user who is a regular user and then make the same request to the 'Get single user' route
  - Finally, test by logging in a regular user who tries to access their own information on the 'Get single user' route. They should have permission to do this

### [31. Setup ProductSchema model]()
- [X] create Product.js in models folder
- [X] create Schema
- [X] name : {type:String}
- [X] price: {type:Number}
- [X] description: {type:String}
- [X] image: {type:String}
- [X] category: {type:String}
- [X] company: {type:String}
- [X] colors: {type:[]}
- [X] featured: {type:Boolean}
- [X] freeShipping: {type:Boolean}
- [X] inventory:{type:Number}
- [X] averageRating:{type:Number}
- [X] user
- [X] set timestamps
- [X] export Product model
- File: models/Product.js
  ```js
  const mongoose = require('mongoose');

  const ProductSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, 'Please provide product name'],
        maxlength: [100, 'Name can not be more than 100 characters']
      },
      price: {
        type: Number,
        required: [true, 'Please provide product price'],
        default: 0
      },
      description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
      },
      image: {
        type: String,
        default: '/uploads/example.jpeg'
      },
      category: {
        type: String,
        required: [true, 'Please provide product category'],
        enum: ['office', 'kitchen', 'bedroom']
      },
      company: {
        type: String,
        required: [true, 'Please provide company'],
        enum: {
          values: ['ikea', 'liddy', 'marcos'],
          message: '{VALUES} is not supported'
        }
      },
      colors: {
        type: [String],
        required: true
      },
      featured: {
        type: Boolean,
        default: false
      },
      freeShipping: {
        type: Boolean,
        default: false
      },
      inventory: {
        type: Number,
        required: true,
        default: 15
      },
      averageRating: {
        type: Number,
        default: 0
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Product', ProductSchema);
  ```

### [32. Setup Product basic routes structure]()
- [X] add productController file in controllers
- [X] export (createProduct, getAllProducts,
  getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
- [X] res.send('function name')
- [X] setup productRoutes file in routes
- [X] import all controllers
- [X] only getAllProducts and getSingleProduct accessible to public
- [X] rest only by admin (setup middlewares)
- [X] typical setup
- [X] router.route('/uploadImage').post(uploadImage)
- [X] import productRoutes as productRouter in the app.js
- [X] setup app.use('/api/v1/products', productRouter)
- File: controllers/productController.js
  - Create and export six controllers for the Product model
  ```js
  const createProduct = async (req, res) => {
    res.send('create product');
  };

  const getAllProducts = async (req, res) => {
    res.send('get all products');
  };

  const getSingleProduct = async (req, res) => {
    res.send('get single product');
  };

  const updateProduct = async (req, res) => {
    res.send('update product');
  };

  const deleteProduct = async (req, res) => {
    res.send('delete product');
  };

  const uploadImage = async (req, res) => {
    res.send('upload image');
  };

  module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
  };
  ```
- File: routes/productRoutes.js
  - Only the getAllProducts route does not have authentication middleware. The other five routes have
  ```js
  const express = require('express');
  const router = express.Router();
  const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
  } = require('../controllers/productController');
  const {
    authenticateUser,
    authorizePermissions
  } = require('../middleware/authentication');

  router
    .route('/')
    .post([authenticateUser, authorizePermissions('admin')], createProduct)
    .get(getAllProducts);
  router
    .route('/uploadImage')
    .post([authenticateUser, authorizePermissions('admin')], uploadImage);
  router
    .route('/:id')
    .get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
    .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

  module.exports = router;
  ```
- File: app.js
  ```js
  const productRouter = require('./routes/productRoutes');

  app.use('/api/v1/products', productRouter);
  ```

### [33. Setup Product routes in Postman]()
- The base route for product routes is: `'/api/v1/products'`
- In Postman, the base route for product routes is: `{{URL}}/products`
- Inside the project folder, create another folder called Product
- In this folder, we're going to create six product routes:
  - Create product - a POST request to: {{URL}}/products
  - Get all products - a GET request to: {{URL}}/products
  - Upload image - a POST request to: {{URL}}/products/uploadImage
  - Get single product - a GET request to: {{URL}}/products/:id
  - Update product - a PATCH request to: {{URL}}/products/:id
  - Delete product - a DELETE request to: {{URL}}/products/:id
- Other than the 'Get all products' request, all other requests we should get back the cookies response as well because we applied the authenticateUser middleware to these routes. These are private routes, a user must successfully logged in before making requests

### [34. Implement createProduct controller]()
- [X] create user property on req.body and set it equal to userId (req.user)
- [X] pass req.body into Product.create
- [X] send back the product
- File: controllers/productController.js
  - Import the Product model, the StatusCode object, and the CustomError class
  - In the createProduct controller:
    - Add the user property on req.body and set it to req.user.userId
    - Create a new product by calling the Product.create() method and pass in req.body as the argument
    - Lastly, send back the response with status code of 201 created and the product object in json format
  ```js
  const Product = require('../models/Product');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  const createProduct = async (req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({ product });
  };
  ```
- **Testing the createProduct controller using Postman:**
  - First, successfully log in an admin user in the 'Login user' route: {{URL}}/auth/login
  - Then make a POST request to the 'Create product' route: {{URL}}/products
  - Test to see what happens if we don't provide any product data. We should get back the error message to provide the values for the properties that we setup in the ProductSchema model
  - Then test by providing the product values in the Body tab
    ```js
    {
      "name": "testing product",
      "description": "some description",
      "category": "office",
      "company": "ikea"
    }
    ```
  - If the createProduct controller is setup properly, 
    - first, we should get back the product object along with the status code of 201 created
      ```js
      {
        "product": {
          "name": "testing product",
          "price": 0,
          "description": "some description",
          "image": "/uploads/example.jpeg",
          "category": "office",
          "company": "ikea",
          "colors": ["#222"],
          "featured": false,
          "freeShipping": false,
          "inventory": 15,
          "averageRating": 0,
          "user": "62baa22c497b3555b890fa22",
          "_id": "62d7a0db80da7b9f6b57cc48",
          "createdAt": "2022-07-20T06:29:47.346Z",
          "updatedAt": "2022-07-20T06:29:47.346Z",
          "__v": 0
        }
      }
      ```
    - second, we get the user token stored in the cookies response
    - third, product document has been created in the MongoDB database in 'products' collection
    
### [35. Implement getAllProducts, getSingleProduct, updateProduct, deleteProduct]()
- [X] getAllProducts
- [X] getSingleProduct
- [X] updateProduct
- [X] deleteProduct
- [X] typical CRUD, utilize (task or job) project
- [X] remember we check already for role 'admin'
- File: controllers/productController.js
  ```js
  const Product = require('../models/Product');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  const getAllProducts = async (req, res) => {
    // passing in an empty object means get all products
    const products = await Product.find({});

    res.status(StatusCodes.OK).json({ products, count: products.length });
  };

  const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }

    res.status(StatusCodes.OK).json({ product });
  };

  const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }

    res.status(StatusCodes.OK).json({ product });
  };

  const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }
    await product.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! Product removed.' });
  };
  ```
- **Testing product CRUD functionality using Postman:**
  - First, test by logging in as an admin user in the 'User login' route
  - Then test the 'Get all products', 'Get single product', 'Update product', and 'Delete product' routes
  - Then log in as a regular user and try to perform the same routes. Since this is a regular user, he or she can only access the 'Get all products' and 'Get single product' routes. This user can not update or delete product


### [36. Implement uploadImage controller]()
- [X] if unsure, review uploadImage controller in 07-file-upload project
- We're uploading the image to our development server which stores the image in a public directory. We will create a separate folder to store the uploaded image as a path
- **Uploading an image file using POSTMAN:**
  - Make a POST request to the upload image route: `{{URL}}/products/uploadImage`
  - Click on the Body tab and select form-data and select file type
  - Provide a name for the image upload as the KEY. Call it `image` for example. For the VALUE, select an image file from the file system
- A NOTE WHEN UPLOADING A FILE USING POSTMAN
  - Since we're uploading a file (not providing raw data) in the Body content, by default, we don't have access to the file data in `req.body` object
  - We need to use an external library `express-fileupload` in order to access the file data
- At the root of the project directory, create a folder called public. Inside the public folder, create a folder called uploads
- **Installing the express-fileupload package:**
  - `npm i express-fileupload`
- **Implementing the express-fileupload package, make the public folder public:**
  - File: app.js
    - Import the express-fileupload module
    - Call the express.static() method to set the public folder as a public folder
    - Then invoke the fileUpload module as middleware
    ```js
    const fileUpload = require('express-fileupload');

    // file upload
    // make the public folder as a public folder
    app.use(express.static('./public'));
    app.use(fileUpload());
    ```
- Stop and restart the server
- **Storing the image data in a public path:**
  - The next step we want to do is to create a public path that stores the uploaded image data. This in turn makes the image a public image asset
  - Inside the `public` directory, create a folder called `uploads`
  - Then, the express-fileupload library has a `.mv()` method that we can call on the file object to move the file/image to a specified path
  - We use the `path` module that comes with Node.js to create the path in the `uploads` folder
  - File: controllers/productController.js
    - Import the path module that comes with Node.js
    - Console log req.files to see the file data
    - If no file is uploaded, throw an error
    - If there is, store the file data in a productImage variable
    - If the uploaded file isn't an image, throw an error
    - Create an imagePath in the uploads folder in the public directory
    - Call .mv() method on the productImage object to move the image data to the imagePath
    - Then send back the status code along with an image object that contains the source to the image path
    - If successful, the productImage object will be moved to the imagePath that we created in the `uploads` folder inside the `public` directory
    - This officially uploads a file image to our development server that we can view in the browser
    - Lastly, send back a status code along with the image data
    ```js
    const { StatusCodes } = require('http-status-codes');
    const path = require('path');

    const uploadImage = async (req, res) => {
      // console.log(req.files);
      if (!req.files) {
        throw new CustomError.BadRequestError('No file uploaded.');
      }
      const productImage = req.files.image;

      if (!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload image');
      }
      const maxSize = 1024 * 1024;

      if (productImage.size > maxSize) {
        throw new CustomError.BadRequestError('Please upload image small than 1MB');
      }
      // create a path in uploads folder
      const imagePath = path.join(
        __dirname,
        '../public/uploads/' + `${productImage.name}`
      );

      // moving image data to the imagePath in uploads folder
      // the .mv() method is provided by express-fileupload library
      await productImage.mv(imagePath);
      res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
    };
    ```
- **Testing the uploadImage controller using POSTMAN:**
  - Login as an admin user and upload an image in the 'Upload image' route: {{URL}}/products/uploadImage
  - Click on the Body tab and upload an image file. The KEY name is `image`
  - If successful, we should get back an image object that contains the path to the uploaded image
  ```js
  {
    "image": "/uploads/example.jpeg"
  }
  ```
- **To view the uploaded image file in the browser:**
  - To see the image in the browser: http://localhost:5000/uploads/example.jpeg

### [37. Setup ReviewSchema model]()
- [X] create Review.js in models folder
- [X] create Schema
- [X] rating : {type:Number}
- [X] title: {type:String}
- [X] comment: {type:String}
- [X] user
- [X] product
- [X] set timestamps
- [X] export Review model
- The unique feature about the Review model is a user can only leave one review per product
- File: models/Review.js
  ```js
  const mongoose = require('mongoose');

  const ReviewSchema = new mongoose.Schema(
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating']
      },
      title: {
        type: String,
        trim: true,
        required: [true, 'Please provide review title'],
        maxlength: 100
      },
      comment: {
        type: String,
        required: [true, 'Please provide review text']
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
      }
    },
    { timestamps: true }
  );

  // setup compound index - an index that entails multiple fields
  // a user can only leave one review per product
  ReviewSchema.index({product: 1, user: 1}, {unique: true})

  module.exports = mongoose.model('Review', ReviewSchema);
  ```

### [38. Setup Review basic routes structure]()
- [X] add reviewController file in controllers
- [X] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
- [X] res.send('function name')
- [X] setup reviewRoutes file in routes
- [X] import all controllers
- [X] only getAllReviews and getSingleReview accessible to public
- [X] rest only to users (setup middleware)
- [X] typical REST setup
- [X] import reviewRoutes as reviewRouter in the app.js
- [X] setup app.use('/api/v1/reviews', reviewRouter)
- File: controllers/reviewController.js
  - Create and export the basic structure of five controllers for the five review routes: createReview, getAllReviews, getSingleReview, updateReview, deleteReview
  ```js
  const createReview = async (req, res) => {
    res.send('Create review');
  };

  const getAllReviews = async (req, res) => {
    res.send('get all reviews');
  };

  const getSingleReview = async (req, res) => {
    res.send('get single review');
  };

  const updateReview = async (req, res) => {
    res.send('update review');
  };

  const deleteReview = async (req, res) => {
    res.send('delete review');
  };

  module.exports = {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
  };
  ```
- File: routes/reviewRoutes.js
  - Import express library and then call express.Router() method to create the router
  - Import the authenticateUser middleware
  - Import the five review controllers
  - Setup the routes for the five review controllers
  - Export the review router object
  ```js
  const express = require('express');
  const router = express.Router();
  const { authenticateUser } = require('../middleware/authentication');
  const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
  } = require('../controllers/reviewController');

  router.route('/').post(authenticateUser, createReview).get(getAllReviews);
  router
    .route('/:id')
    .get(getSingleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview);

  module.exports = router;
  ```
- File: app.js
  - Import the review router
  - Then call app.use() method to use the review router as a middleware. The first argument is the root path for the review routes
  ```js
  const reviewRouter = require('./routes/reviewRoutes');

  app.use('/api/v1/reviews', reviewRouter);
  ```

### [39. Setup Review routes in Postman]()
- The base route for review routes is: `'/api/v1/reviews'`
- In Postman, the base route for review routes is: `{{URL}}/reviews`
- Inside the project folder, create another folder called Review
- In this folder, we're going to create six review routes:
  - Create review - a POST request to: {{URL}}/reviews
  - Get all reviews - a GET request to: {{URL}}/reviews
  - Get single review - a GET request to: {{URL}}/reviews/:id
  - Update review - a PATCH request to: {{URL}}/reviews/:id
  - Delete review - a DELETE request to: {{URL}}/reviews/:id
- Note that the 'Create review', 'Update review', and 'Delete review' routes are private routes, a user must successfully logged in before making requests. We applied the authenticateUser middleware on these routes in the reviewRoutes.js file. Hence when we make requests to these routes, we should also get back the cookies response which contains the user token

### [40. Implement createReview controller]()
- [X] check for product in the req.body
- [X] attach user property (set it equal to req.user.userId) on to req.body
- [X] create review
- File: controllers/reviewController.js
  ```js
  const Review = require('../models/Review');
  const Product = require('../models/Product');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');
  const { checkPermissions } = require('../utils');

  const createReview = async (req, res) => {
    // destructure product and assign an alias to productId
    const { product: productId } = req.body;

    // check if the submitted product exists
    const isValidProduct = await Product.findOne({ _id: productId });
    if (!isValidProduct) {
      throw new CustomError.NotFoundError(`No product with id: ${productId}`);
    }

    // check if the review has already been submitted by
    // this user on this product
    const alreadySubmitted = await Review.findOne({
      product: productId,
      user: req.user.userId
    });
    if (alreadySubmitted) {
      throw new CustomError.BadRequestError(
        'Already submitted review for this product'
      );
    }

    // add user property to req.body
    req.body.user = req.user.userId;
    // create review
    const review = await Review.create(req.body);

    res.status(StatusCodes.CREATED).json({ review });
  };
  ```
- **Testing the createReview controller using Postman:**
  - Login a user in the 'Login user' route: {{URL}}/auth/login
  - Make a GET request to the 'Get all products' route: {{URL}}/products
    - Copy one of the product ids to the clipboard
  - Make a POST request to the 'Create review' route: {{URL}}/reviews
  - In the Body tab, provide the review data in json format:
    ```js
    {
      "product": "62d8d07fc7e3723c54f00bd4",
      "rating": 2,
      "title": "product came damaged",
      "comment": "very disappointed"
    }
    ```
  - If successful, we should get back the review object, the cookies response, and a review document is created in the 'Reviews' collection in MongoDB
    ```js
    {
      "review": {
        "rating": 2,
        "title": "product came damaged",
        "comment": "very disappointed",
        "user": "62baa22c497b3555b890fa22",
        "product": "62d8d07fc7e3723c54f00bd4",
        "_id": "62e0d469914a01729beff70f",
        "createdAt": "2022-07-27T06:00:09.299Z",
        "updatedAt": "2022-07-27T06:00:09.299Z",
        "__v": 0
      }
    }
    ```
  - Then make another request to create another review with the same review information. We should get an error message because a review has already been submitted by this user on this product
    ```js
    {
      "msg": "Already submitted review for this product"
    }
    ```

### [41. Implement getAllReviews, getSingleReview controllers]()
- [X] both public routes, typical setup
- File: controllers/reviewController.js
  ```js
  const Review = require('../models/Review');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');

  const getAllReviews = async (req, res) => {
    // passing in an empty object means find all reviews
    const reviews = await Review.find({});

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
  };

  const getSingleReview = async (req, res) => {
    // destructure the query params id and assign it to an alias
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
      throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
    }

    res.status(StatusCodes.OK).json({ review });
  };
  ```

### [42. Implement deleteReview controller]()
- [X] get id from req.params
- [X] check if review exists
- [X] if no review, 404
- [X] check permissions (req.user, review.user)
- [X] use await review.remove()
- [X] send back 200
- File: controllers/reviewController.js
  ```js
  const Review = require('../models/Review');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');
  const { checkPermissions } = require('../utils');

  const deleteReview = async (req, res) => {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
    if (!review) {
      throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
    }

    checkPermissions(req.user, review.user);

    await review.remove();

    res.status(StatusCodes.OK).json({ msg: 'Success! Review removed' });
  };
  ```














## PROJECT CHECKLIST
------------------------
### Hosted Project
[E-Commerce API Heroku URL](https://e-commerce-api-10.herokuapp.com/)

#### Setup Basic Express Server
- [] import express and assign to variable
- [] setup start port variable (5000) and start function

#### Connect To DB
- [] get connection string from MongoDB
- [] setup .env with MONGO_URL variable and assign the value
- [] import 'dotenv' and setup package
- [] import connect() and invoke in the starter
- [] restart the server
- [] mongoose V6 info

#### Basic Routes and Middleware
- [] setup / GET Route
- [] setup express.json() middleware
- [] setup 404 and errorHandler middleware
- [] import 'express-async-errors' package

#### 404 vs ErrorHandler Middleware

#### Morgan Package
- [Morgan Package](https://www.npmjs.com/package/morgan)

#### User Model
- [] create models folder and User.js file
- [] create schema with name,email, password, role (all type:String)
- [] export mongoose model

#### Validator Package
- [Validator](https://www.npmjs.com/package/validator)

#### Auth Routes Structure
- [] create controllers folder
- [] add authController file
- [] export (register,login,logout) functions
- [] res.send('some string value')
- [] create routes folder
- [] setup authRoutes file
- [] import all controllers
- [] setup three routes
- [] post('/register') post('/login') get('/logout')
- [] import authRoutes as authRouter in the app.js
- [] setup app.use('/api/v1/auth', authRouter)

#### Test Routes in Postman

#### Register Controller
- [] create user
- [] send response with entire user (only while testing)
- [] check if email already in use (schema and controller)
- [] ignore 'role'
- [] alternative 'admin' setup

#### Handle Password
- [] UserSchema.pre('save') - hook
- this points to User
- bcrypt.genSalt - number of rounds
- bcrypt.hash

#### JWT
- [] require 'jsonwebtoken' package
- [] create jwt - jwt.sign(payload,secret,options)
- [] verify jwt - jwt.verify(token,secret)
- [] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [] restart the server !!!!
- [] refactor code, create jwt functions in utils
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response
- [] add signed and secure flags to cookie

#### Login Route
- [] check if email and password exist, if one missing return 400
- [] find user, if no user return 401
- [] check password, if does not match return 401
- [] if everything is correct, attach cookie
  and send back the same response as in register

#### Logout Route
- [] set token cookie equal to some string value
- [] set expires:new Date(Date.now())

#### User Routes Structure
- [] add userController file
- [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
- [] res.send('some string value')
- [] setup userRoutes file
- [] import all controllers
- [] setup just one route - router.route('/').get(getAllUsers);
- [] import userRoutes as userRouter in the app.js
- [] setup app.use('/api/v1/users', userRouter)

#### GetAllUsers and GetSingleUser
- [] Get all users where role is 'user' and remove password
- [] Get Single User where id matches id param and remove password
- [] If no user 404

#### Authenticate User Setup

#### Auth User Complete

#### Authorize Permissions Setup
- [] write a 2nd authentication middleware - checks user roles
- [] hardcode

#### Authorize Permissions Complete
- [] introduce params

#### ShowCurrentUser
- [] get user from req
- [] send response with user

#### UpdateUserPassword
- [] almost identical to login user
- [] add authenticateUser middleware in the route
- [] check for oldPassword and newPassword in the body
- [] if one missing 400
- [] look for user with req.user.userId
- [] check if oldPassword matches with user.comparePassword
- [] if no match 401
- [] if everything good set user.password equal to newPassword
- [] await user.save()

#### createTokenUser in Utils
- [] create a file in utils (createTokenUser)
- [] setup a function that accepts user object and returns userToken object
- [] export as default
- [] setup all the correct imports/exports and refactor existing code

#### updateUser with User.findOneAndUpdate()
- [] add authenticateUser middleware in the route
- [] check for name and email in the body
- [] if one is missing, send 400 (optional)
- [] use findOneAndUpdate()
- [] create token user, attachCookiesToResponse and send back the tokenUser

#### updateUser with user.save()

#### Setup and Apply checkPermissions()

#### Product Model
- [] create Product.js in models folder
- [] create Schema
- [] name : {type:String}
- [] price: {type:Number}
- [] description: {type:String}
- [] image: {type:String}
- [] category: {type:String}
- [] company: {type:String}
- [] colors: {type:[]}
- [] featured: {type:Boolean}
- [] freeShipping: {type:Boolean}
- [] inventory:{type:Number}
- [] averageRating:{type:Number}
- [] user
- [] set timestamps
- [] export Product model

#### Product Structure
- [] add productController file in controllers
- [] export (createProduct, getAllProducts,
  getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
- [] res.send('function name')
- [] setup productRoutes file in routes
- [] import all controllers
- [] only getAllProducts and getSingleProduct accessible to public
- [] rest only by admin (setup middlewares)
- [] typical setup
- [] router.route('/uploadImage').post(uploadImage)
- [] import productRoutes as productRouter in the app.js
- [] setup app.use('/api/v1/products', productRouter)

#### Product Routes in Postman

#### Create Product
- [] create user property on req.body and set it equal to userId (req.user)
- [] pass req.body into Product.create
- [] send back the product

#### Remaining Controllers (apart from uploadImage)
- [] getAllProducts
- [] getSingleProduct
- [] updateProduct
- [] deleteProduct
- [] typical CRUD, utilize (task or job) project
- [] remember we check already for role 'admin'

#### Upload Image
- [] if unsure, review uploadImage controller in 07-file-upload project

#### Review Model
- [] create Review.js in models folder
- [] create Schema
- [] rating : {type:Number}
- [] title: {type:String}
- [] comment: {type:String}
- [] user
- [] product
- [] set timestamps
- [] export Review model

#### Review Structure
- [] add reviewController file in controllers
- [] export (createReview, getAllReviews, getSingleReview, updateReview, deleteReview) functions
- [] res.send('function name')
- [] setup reviewRoutes file in routes
- [] import all controllers
- [] only getAllReviews and getSingleReview accessible to public
- [] rest only to users (setup middleware)
- [] typical REST setup
- [] import reviewRoutes as reviewRouter in the app.js
- [] setup app.use('/api/v1/reviews', reviewRouter)

#### Create Review
- [] check for product in the req.body
- [] attach user property (set it equal to req.user.userId) on to req.body
- [] create review

#### Get All Reviews and Get Single Review
- [] both public routes, typical setup

#### Delete Review
- [] get id from req.params
- [] check if review exists
- [] if no review, 404
- [] check permissions (req.user, review.user)
- [] use await review.remove()
- [] send back 200

#### Update Review
- [] get id from req.params
- [] get {rating, title comment} from req.body
- [] check if review exists
- [] if no review, 404
- [] check permissions
- [] set review properties equal to rating, title, comment
- [] use await review.save()
- [] send back 200

#### Populate

#### Virtuals

#### Get Single Product Reviews

#### Remove All Reviews

#### Aggregation Pipeline - Atlas and Code

#### Order Schema
- [] create Order.js in models folder
- [] create Schema
- [] tax : {type:Number}
- [] shippingFee: {type:Number}
- [] subtotal: {type:Number}
- [] total: {type:Number}
- [] orderItems:[]
- [] status:{type:String}
- [] user
- [] clientSecret:{type:String}
- [] paymentId:{type:String}
- [] set timestamps
- [] export Order model

#### Order Structure
- [] add orderController file in controllers
- [] export (getAllOrders, getSingleOrder, getCurrentUserOrders,
  createOrder, updateOrder) functions
- [] res.send('function name')
- [] setup orderRoutes file in routes
- [] import all controllers
- [] authenticate user in all routes
- [] getAllOrders admin only
- [] typical REST setup
- [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
- [] import orderRoutes as orderRouter in the app.js
- [] setup app.use('/api/v1/orders', orderRouter)

#### Order in Postman

#### Create Order
- [] most complex

#### Get All Orders and Get Single Order
- [] getAllOrders - admin only
- [] getSingleOrder - chechPermissions

#### Get Current User Orders
- [] find orders where user is equal to req.user.userId

#### Update Order
- [] get order id
- [] get paymentIntentId (req.body)
- [] get order
- [] if does not exist - 404
- [] check permissions
- [] set paymentIntentId and status as 'paid'
- [] order.save()

#### Create Docs
- [] [Docgen Library] (https://github.com/thedevsaddam/docgen)
- [] Export Postman Collection
- [] docgen build -i fileName.json -o index.html
- [] create index.html in public

#### Security Packages
- [] express-rate-limiter
- [] helmet
- [] xss-clean
- [] express-mongo-sanitize
- [] cors (cookies!!!!)

#### Deploy on Heroku
- [] heroku account and heroku cli
- [] remove/copy from the main repo
- [] add dev command "nodemon app.js"
- [] change start to "node app.js"
- [] setup node version in package.json
- [] "engines": {"node": "14.x"}
- [] Procfile "web: node app.js"
- [] remove existing git repo
- [] rm -rf .git - mac,
- [] git init
- [] git add .
- [] git commit -m "initial commit"
- [] heroku login
- [] heroku create "App Name"
- [] git remote -v
- [] setup env vars in GUI
- [] git push heroku master/main
