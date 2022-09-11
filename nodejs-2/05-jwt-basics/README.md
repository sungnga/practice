## SECTION 5: JWT BASICS
- Folder directory: /05-jwt-basics/

### Goals of this project
- Learn how to generate JWT (Json Web Token) for user authentication and allow access to certain data and routes

### [01. Initialize project with starter files](https://github.com/sungnga/practice/commit/5c3cc8f295d956b5f37afc31e46a5d59e6c22809?ts=2)
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

### [02. Setup the controllers](https://github.com/sungnga/practice/commit/5ee80599c1bae8014bb4d2f1a7fd16427a2b2637?ts=2)
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
  - The login route is a POST request because the client must provide the username and password
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

### [03. Validate username and password](https://github.com/sungnga/practice/commit/3464c6ed979bb9e9846bb8cc87bdf17ea47482b0?ts=2)
- **Steps for authenticating users:**
  - Check for username and password in POST(login) request in `req.body`
  - If exists, create a new JWT
  - Send token back to front-end
  - Setup authentication so only the request with JWT can access the dashboard
- File: controllers/main.js
  - There are three options to check whether the username and password have been provided
    - Use Mongoose validation when we're connected to the database
    - Use a third-party package called Joi. Will use this in future projects
    - Check in the controller. We're going to use this approach in this project
  - Import the `CustomAPIError` class
  - In the login controller, write an if statement to check if no username or password was provided, we throw a new CustomAPIError object with a custom message and status code of 400. This error in turn gets handled by the errorHandlerMiddleware in error-handler.js file
  ```js
  const CustomAPIError = require('../errors/custom-error');

  const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);

    // if no username or password, throw a new customAPIError
    if (!username || !password) {
      // 400 status code is bad request
      // this error is handled by the errorHandlerMiddleware
      throw new CustomAPIError('Please provide email and password', 400);
    }

    res.send('Fake login/Register/Signup Route');
  };
  ```

### [04. JSON Web Token (JWT)](https://github.com/sungnga/practice/commit/a40452c537675d517989e60ab3a93053cdf446f8?ts=2)
- JWT docs: https://jwt.io/introduction
- Install the JSON Web Token package: `npm install jsonwebtoken`
- **What is JSON Web Token?**
  - JSON Web Token (JWT) is an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA
- **When to use JSON Web Tokens?**
  - Authentication - is the most common scenario for using JWT
  - Information exchange - a good way of securely transmitting info between parties
- **What is the JSON Web Token structure?**
  - In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are: header, payload, and signature
  - A typical JWT looks like this: `xxxxx.yyyyy.zzzzz`
  - Header - `xxxxx`
    - Consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA
    - For example:
      ```js
      {
        "alg": "HS256",
        "typ": "JWT"
      }
      ```
    - Then, this JSON is Base64Url encoded to form the first part of the JWT
  - Payload - `yyyyy`
    - The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims
      - Registered claims: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and others. Notice that the claim names are only three characters long as JWT is meant to be compact
      - Public claims: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace
      - Private claims: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims
    - An example payload could be:
      ```js
      {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
      }
      ```
    - The payload is then Base64Url encoded to form the second part of the JSON Web Token
    - Do note that for signed tokens this information, though protected against tampering, is readable by anyone. Do not put secret information in the payload or header elements of a JWT unless it is encrypted
  - Signature - `zzzzz`
    - To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that
    - For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:
      ```JS
      HMACSHA256(
        base64UrlEncode(header) + "." +
        base64UrlEncode(payload),
        secret)
      ```
    - The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is
- **Putting all together**
  - The output is three Base64-URL strings separated by dots that can be easily passed in HTML and HTTP environments, while being more compact when compared to XML-based standards such as SAML
  - The following shows a JWT that has the previous header and payload encoded, and it is signed with a secret
    - ``
- **How do JSON Web Tokens work?**
  - In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required
  - You also should not store sensitive session data in browser storage due to lack of security
  - Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:
    - `Authorization: Bearer <token>`

### [05. Sign JWT](https://github.com/sungnga/practice/commit/0b745cde9efb54d40f60ad47f4dbe014324f275f?ts=2)
- Install the jsonwebtoken package: `npm install jsonwebtoken`
- File: controllers/main.js
  - Require in the jsonwebtoken module. From this package, we have access to the `jwt` object
  - To create a new token, use the `.sign()` method on the `jwt` object. Then we need to pass in three arguments:
    - 1st arg is the payload object. Try to keep payload small, better for user experience
    - 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value. We put this JWT_SECRET string value in a .env file
    - 3rd arg is options object. Specify when this token will expire
  - After a new token has been created, we send back to the client a custom message and the token
  ```js
  const jwt = require('jsonwebtoken');
  const CustomAPIError = require('../errors/custom-error');

  const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);

    // if no username or password, throw a new customAPIError
    if (!username || !password) {
      // 400 status code is bad request
      // this error is handled by the errorHandlerMiddleware
      throw new CustomAPIError('Please provide email and password', 400);
    }

    // just for demo, normally provided by DB
    const id = new Date().getDate();

    // create a new token
    // 1st arg is the payload object. Try to keep payload small
    // 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
    // 3rd arg is options object. Set when this token will expire
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // send back a custom message and the token
    res.status(200).json({ msg: 'user created', token });
  };
  ```
- File: .env
  - At the root of the project directory, create a .env file
  - Create a JWT_SECRET string value. This value should be complex, long, and unguessable
- Let's try to create a token using POSTMAN:
  - In the login POST route and in the Body tab, provide the values for username and password properties
  - If successful, we should get back an object that looks like this:
    ```js
    {
        "msg": "user created",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsInVzZXJuYW1lIjoiZGQiLCJpYXQiOjE2NTA4Njg2NzgsImV4cCI6MTY1MzQ2MDY3OH0.10sIoMHkwEzW2ndSO-4-kEag_old6YSO8DU1-o27wUs"
    }
    ```
  - If no username or password provided, we should get back this:
    ```js
    {
        "msg": "Please provide email and password"
    }
    ```
- To decode the token signature, got to https://jwt.io/ website
  - Paste in the encoded token
  - Now we get to see the decoded Header and Payload data
    - HEADER: ALGORITHM & TOKEN TYPE
      ```js
      {
        "alg": "HS256",
        "typ": "JWT"
      }
      ```
    - PAYLOAD:DATA
      ```js
      {
        "id": 24,
        "username": "dd",
        "iat": 1650868889,
        "exp": 1653460889
      }
      ```

### [06. Send bearer token](https://github.com/sungnga/practice/commit/fc16f782686bd5580d52e909da5efbb64aa88374?ts=2)
- Once a JWT token is created and sent back to the front-end client, the client can use this token to query for data on a secured route. This token is sent in the Authorization headers as a bearer token. The content of the header should look like this:
    - `Authorization: Bearer <token>`
- File: controllers/main.js
  - In the `dashboard` controller, we can see the headers content in `req.headers`
  ```js
  const dashboard = async (req, res) => {
    console.log(req.headers);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, John Doe`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
  };
  ```
- Let's try to send a bearer token when making a query in POSTMAN:
  - First, let's generate a token. In the login route, make a POST request and provide the username and password in the body. If successful, it should generate a JWT token. Copy this to the clipboard
  - Go to the dashboard route and make a GET request. In the Headers tab, provide the `Authorization` key and the value in this format: `Bearer <token>`. If successful, we should get back the data

### [07. Check for auth header](https://github.com/sungnga/practice/commit/8969f976fb97aedbfb26e7a8203676d0bbf79beb?ts=2)
- In the dashboard controller, let's check to see if the client provided a JWT token when making a request. We check for the token in the headers content
- File: controllers/main.js
  - In the dashboard controller:
    - Get the value from the authorization key in headers and assign it to the `authHeader` variable
    - Write an if statement to check if there's no `authorization` header or it doesn't start with `"Bearer "`, then we'll throw our customError with status code of 401 (unauthorized error)
  ```js
  const dashboard = async (req, res) => {
    // authHeader is a string that looks like this: "Bearer <token>"
    const authHeader = req.headers.authorization;

    // can call .startsWith() method on a JS string
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // 401 code is unauthorized error
      throw new CustomAPIError('No token provided', 401);
    }

    // after splitting the string, get the 2nd element (which is the token)
    const token = authHeader.split(' ')[1];
    console.log(token);

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, John Doe`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
  };
  ```

### [08. Verify token](https://github.com/sungnga/practice/commit/ef53663e93836d1a290cf8713cfbc3954eb8ce36?ts=2)
- We used the jsonwebtoken package earlier to help us create a JSON Web Token using the `jwt.sign()` method. Now we're going to use this package again to verify the JSON Web Token using the `jwt.verify()` method
- After successfully verifying a user's token we will have completed in setting up user authentication when they try to access secured data or routes
- File: controllers/main.js
  - In the dashboard controller, use the try-catch block to verify the token
  - In the try block,
    - call the `jwt.verify()` method
    - pass in the `token` value that we get from the auth header as 1st arg
    - pass in the `process.env.JWT_SECRET` string as 2nd arg
    - assign the result we get back to a `decoded` variable. Note: this result we get back is an object that looks something like this: `{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }`
    - lastly, if we're successful with verifying the token, send back to the client a success status code and a json object
  - If there's an error, throw the CustomAPIError in the catch block with a custom message and a 401 unauthorized error status code 
  ```js
  const dashboard = async (req, res) => {
    // authHeader is a string that looks like this: "Bearer <token>"
    const authHeader = req.headers.authorization;

    // can call .startsWith() method on a JS string
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // 401 code is unauthorized error
      throw new CustomAPIError('No token provided', 401);
    }

    // after splitting the string, get the 2nd element (which is the token)
    const token = authHeader.split(' ')[1];
    console.log(token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded); //{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }

      const luckyNumber = Math.floor(Math.random() * 100);
      res.status(200).json({
        msg: `Hello, ${decoded.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
      });
    } catch (error) {
      // 401 code is unauthorized error
      throw new CustomAPIError('Not authorized to access this route', 401);
    }
  };
  ```

### [09. Create authenticationMiddleware](https://github.com/sungnga/practice/commit/9a1ce01644f6ad6ab24e4e2524fabd46c964e546?ts=2)
- With our current setup, we check for user authentication in the dashboard controller. In most real-life projects, we have many routes that require authentication and we don't want to write this over and over. It's better to create an authentication middleware and use it wherever a route requires authentication
- File: middleware/auth.js
  - Require in the jsonwebtoken package
  - Import the CustomAPIError module
  - Write and export an async authorizationMiddleware function
    - Since this is a middleware, we have access to req, res, and next
    - Cut and paste the verify auth functionality from the `dashboard` controller to here
    - If we successfully verify the JWT token, create a `user` object on the `req` body and set the values of id and username
    - Call next() in the try block to go to the next function or middleware
    - We throw the CustomAPIError in the catch block if verifying the token failed
  ```js
  const jwt = require('jsonwebtoken');
  const CustomAPIError = require('../errors/custom-error');

  const authorizationMiddleware = async (req, res, next) => {
    // authHeader is a string that looks like this: "Bearer <token>"
    const authHeader = req.headers.authorization;

    // can call .startsWith() method on a JS string
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // 401 code is unauthorized error
      throw new CustomAPIError('No token provided', 401);
    }

    // after splitting the string, get the 2nd element (which is the token)
    const token = authHeader.split(' ')[1];
    // console.log(token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded); //{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }
      // destructure id and username from decoded object
      const { id, username } = decoded;

      // if successfully verify JWT, add user object to req body
      req.user = { id, username };

      next();
    } catch (error) {
      // 401 code is unauthorized error
      throw new CustomAPIError('Not authorized to access this route', 401);
    }
  };

  module.exports = authorizationMiddleware;
  ```
- File: controllers/main.js
  - Because `next()` is called in the authorizationMiddleware function, the dashboard controller now has access to the user object in req.user body
  ```js
  const dashboard = async (req, res) => {
    // req.user comes from authenticationMiddleware
    // console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${req.user.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
  };
  ```
- File: routes/main.js
  - Import the authorizationMiddleware function
  - The dashboard route is the route we want to protect, so this is where we want to use the authorizationMiddleware
    - In the `.get()` method, pass in the authMiddleware as the 1st argument
  - What this does is when a client makes a request to the dashboard route, it first goes through the `authenticationMiddleware` function, then `next()` is called to pass to the next function, which is the 2nd argument the dashboard controller
  ```js
  const authMiddleware = require('../middleware/auth');

  // a secured dashboard route
  // first goes through authMiddleware then dashboard controller
  router.route('/dashboard').get(authMiddleware, dashboard);
  ```

### [10. Create more error classes](https://github.com/sungnga/practice/commit/a7842945e6fb52737bd99967deb4545ea78fb182?ts=2)
- At the moment we only have one error handler, the CustomAPIError error class that extends from the Error class. In our project we need to handle the error of bad request (status code 400) and unauthorized error (status code 401). We want to create two more classes to handle these errors and they're going to extend from the CustomAPIError class
- Also, instead of hard-coding the status code values in the classes, we're going to use an external library that allows us to write error codes that are easier to read and understand
  - Install: `npm install http-status-codes`
- File: errors/custom-error.js
  - We're going to remove the `statusCode` property from the CustomAPIError class
  ```js
  class CustomAPIError extends Error {
    constructor(message) {
      super(message);
    }
  }

  module.exports = CustomAPIError;
  ```
- File: errors/bad-request.js
  - Import the CustomAPIError class
  - Name import the StatusCodes object from the http-status-codes library
  - Write and export a BadRequestError that extends from the CustomAPIError class
    - Add the statusCode property and set it to StatusCodes.BAD_REQUEST
  ```js
  const CustomAPIError = require('./custom-error');
  const { StatusCodes } = require('http-status-codes');

  class BadRequestError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }

  module.exports = BadRequestError;
  ```
- File: errors/unauthenticated.js
  - Import the CustomAPIError class
  - Name import the StatusCodes object from the http-status-codes library
  - Write and export a BadRequestError that extends from the CustomAPIError class
    - Add the statusCode property and set it to StatusCodes.UNAUTHORIZED
  ```js
  const CustomAPIError = require('./custom-error');
  const { StatusCodes } = require('http-status-codes');

  class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }

  module.exports = UnauthenticatedError;
  ```
- File: errors/index.js
  - The index.js file in the errors folder is the entry point file and we just need to import all three error classes here and module export them as an object
  ```js
  const CustomAPIError = require('./custom-error');
  const BadRequestError = require('./bad-request');
  const UnauthenticatedError = require('./unauthenticated');

  module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError
  };
  ```

### [11. Refactor](https://github.com/sungnga/practice/commit/929a90b37d885303b984556e3b052407be660a66?ts=2)
- Now we need to refactor our application to make use of the different error classes that we created earlier
- File: middleware/auth.js
  - We're going to use the UnauthenticatedError class to handle Unauthorized errors in the authorizationMiddleware function
  - Name import the UnauthenticatedError class from the errors folder. It will look for it in the index.js file, which is the entry file
  - Replace the CustomAPIError class with the UnauthenticatedError class and we don't need to pass in the status code
  ```js
  const { UnauthenticatedError } = require('../errors');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded); //{ id: 28, username: 'nga', iat: 1651182257, exp: 1653774257 }
    // destructure id and username from decoded object
    const { id, username } = decoded;

    // if successfully verify JWT, add user object to req body
    req.user = { id, username };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
  ```
- File: controllers/main.js
  - In the login controller, if no username or password is provided, we want to throw the BadRequestError
  - Name import the BadRequestError class from the errors folder
  - Replace the CustomAPIError class with the BadRequestError class and we don't need to pass in the status code
  ```js
  const { BadRequestError } = require('../errors');

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  ```
- File: middleware/error-handler.js
  - Name import the CustomAPIError class from the errors folder
  - Name import the StatusCodes object from the http-status-codes library
  - In this middleware, instead of sending back a hard-coded status code 500, we use `StatusCodes.INTERNAL_SERVER_ERROR`. Everything else remains the same
  ```js
  const { CustomAPIError } = require('../errors');
  const { StatusCodes } = require('http-status-codes');

  const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('Something went wrong try again later');
  };
  ```