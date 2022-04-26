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

### [03. Validate username and password]()
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

### [JSON Web Token (JWT)]()
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

### [04. Sign JWT]()
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

### [05. Send bearer token]()
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