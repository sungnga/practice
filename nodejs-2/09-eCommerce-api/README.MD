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
- [] get connection string from MongoDB
- [] setup .env with MONGO_URL variable and assign the value
- [] import 'dotenv' and setup package
- [] import connect() and invoke in the starter
- [] restart the server
- [] mongoose V6 info
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
- [] setup / GET Route
- [] setup express.json() middleware
- [] setup 404 and errorHandler middleware
- [] import 'express-async-errors' package
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
- [] create models folder and User.js file
- [] create schema with name,email, password, role (all type:String)
- [] export mongoose model
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
  - Create a Logout User route:
    - This is a GET method
    - The path is: {{URL}}/auth/logout
    - In the Environment dropdown menu, select: Dev Environment
    - Click on the Send button. If everything is setup properly, we should get back "logout user"
  - Create a Register User route:
    - This is a POST method
    - The path is: {{URL}}/auth/register
    - The Environment is: Dev Environment
    - Click on the Send button. If everything is setup properly, we should get back "register user"
  - Create a Login User route:
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

### [10. Implement register controller: unique email]()
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

### [10. Implement register controller: setting role]()
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
- [] if some question, re-watch 07-file-upload
- [] images folder with two images

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
- [] don't test yet

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
