## SECTION 6: JOBS API
- Folder directory: /06-jobs-api/

### Goals of this project
- Build an application API where users can login to their account and manage their job search. We'll combine our knowledge on authentication and CRUD functionality to build this app
- Host our application to the cloud by deploying to Heroku
- Setup a document with Swagger UI

### [01. Initialize project with starter files](https://github.com/sungnga/practice/commit/1c4992de77e94dfc891401426fb705918bbc1e88?ts=2)
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/06-jobs-api/starter
- cd into project directory: `cd 06-jobs-api`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, mongoose, http-status-codes, and jsonwebtoken libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

#### Database Connection
1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers
- auth.js
- jobs.js

#### User Model
Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User
- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User
- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors
- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security
  - helmet
  - cors
  - xss-clean
  - express-rate-limit

#### Swagger UI
```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

### [02. Setup basic controllers](https://github.com/sungnga/practice/commit/d69121241e6dbc30adbb90e91f1bac2bcddfc7a3?ts=2)
- Let's setup the basic structures for the auth and jobs controllers
- Files: controllers/auth.js
  - Setup the auth controllers to register a new user and to login a user
  ```js
  const register = async (req, res) => {
    res.send('register user');
  };

  const login = async (req, res) => {
    res.send('login user');
  };

  module.exports = {
    register,
    login
  };
  ```
- File: controllers/jobs.js
  - These job controllers are for our CRUD functionality
  ```js
  const getAllJobs = async (req, res) => {
    res.send('get all jobs');
  };

  const getJob = async (req, res) => {
    res.send('get a job');
  };

  const createJob = async (req, res) => {
    res.send('create job');
  };

  const updateJob = async (req, res) => {
    res.send('update job');
  };

  const deleteJob = async (req, res) => {
    res.send('delete job');
  };

  module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
  };
  ```

### [03. Setup routes for auth and jobs](https://github.com/sungnga/practice/commit/1a161a22ae590ea5a9beb93ca5d221e01a5af894?ts=2)
- File: routes/auth.js
  ```js
  const express = require('express');
  const router = express.Router();

  const { login, register } = require('../controllers/auth');

  router.post('/register', register);
  router.post('/login', login);

  module.exports = router;
  ```
- File: routes/jobs.js
  ```js
  const express = require('express');
  const router = express.Router();

  const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
  } = require('../controllers/jobs');

  router.route('/').post(createJob).get(getAllJobs);
  router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

  module.exports = router;
  ```
- File: app.js
  - Import both routers for auth and for jobs
  - Create the base routes for both auth routes and jobs routes
    - The full path for auth would look like this:
      - To register a user: `domain/api/v1/auth/register`
      - To login a user: `domain/api/v1/auth/login`
    - The full path for jobs would look like this:
      - To createJob and getAllJobs: `domain/api/jobs`
      - To getJob, deleteJob, and updateJob: `domain/api/jobs/:id`
  ```js
  // routers
  const authRouter = require('./routes/auth');
  const jobsRouter = require('./routes/jobs');

  // routes
  // base route for auth
  app.use('/api/v1/auth', authRouter);
  // base route for jobs
  app.use('/api/v1/jobs', jobsRouter);
  ```

### [04. Connect to the database](https://github.com/sungnga/practice/commit/222ee3a01178a3984c9292f813aae52d6682c306?ts=2)
- File: db/connect.js
  ```s
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
- File: .env
  - Get the connection string from MongoDB project dashboard page by clicking on the connect button. In this string, replace the `<password>` and give the database a name `06-JOBS-API`
  ```js
  MONGO_URI=mongodb+srv:<connection_string>
  JWT_SECRET=<secret>
  ```
- File: app.js
  - Import the connectDB function
  - Call the connectDB function in the try block of the start function. This is an async operation so add the await keyword in front of it. Pass in `process.env.MONGO_URI` as an argument as it's looking for a URL
  - If we're able to connect to our MongoDB database, we should see "Server is listening to port 3000..." printed in the console
  ```js
  const connectDB = require('./db/connect');

  const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```

### [05. Create User schema/model](https://github.com/sungnga/practice/commit/fcefc27715df35036396be9f4b11c75d59c8031e?ts=2)
- Let's setup the User model and it'll have three properties: name, email, and password. When a user registers to our application they must provide all three
- File: models/User.js
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
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide valid email'
      ],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
      maxlength: 12
    }
  });

  // 1st arg is the name of the model we give
  module.exports = mongoose.model('User', UserSchema);
  ```

### [06. Create user - basic setup](https://github.com/sungnga/practice/commit/e5b2ce9648828b3b10cad665849003f3f9519cba?ts=2)
- For the register route, we want to:
  - Validate - name, email, password - with mongoose
  - Hash password (with bcryptjs)
  - Create token
  - Send response with token
- File: controllers/auth.js
  - Import the User model
  - Import StatusCodes object from http-status-codes library
  - In the register controller:
    - Call the User.create() method to instantiate a new user from the User model. Pass in the entire body.req object as an argument. This is an async operation so add the await keyword in front of the method
    - If successful, send back the status code along with the user data as an object in json format
  ```js
  const User = require('../models/User');
  const StatusCodes = require('http-status-codes');

  const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    // status code is 201 created
    res.status(StatusCodes.CREATED).json({ user });
  };
  ```
- Let's try to register a user in POSTMAN:
  - First, create a new collection and call it 06-JOBS-API
  - Make a POST request to the URL: `localhost:3000/api/v1/auth/register`
  - Provide the name, email, and password in JSON format in the Body content. NOTE that the email must be unique because that was how we set it up in the User schema
  - If successful, we should get back a user object that looks like this:
    ```js
    {
      "user": {
          "_id": "6274591a9044a02dd5089877",
          "name": "Nga",
          "email": "nga222@gmail.com",
          "password": "secret",
          "__v": 0
      }
    }
    ```
  - Also, a new user has been created in MongoDB in the `users` collection

### [07. Hash user password using bcryptjs lib](https://github.com/sungnga/practice/commit/9feb0f6fb25f5cabc3b1c9c3788d8e882525fbaa?ts=2)
- Next, we want to hash the password that the user provided. We never want to store their password string in our database as it is
- We will use the library bcryptjs to hash the password
  - Install: `npm install bcryptjs`
- File: controllers/auth.js
  - Import the bcryptjs library
  - In the register controller:
    - We want to replace the user's password value in the req.body object with a hashed password value before we create a new user in the database
    - To hash a password, we need to first use the `.genSalt()` method on bcrypt to generate a salt and then use the `.hash()` method on bcrypt to hash the password
    - Create a tempUser object and replace the value of password property with the hashedPassword. The name and email the the user provided remain the same in tempUser
    - Last thing is instead of passing the entire req.body object to the User.create() method, we pass in the tempUser object
  ```js
  const User = require('../models/User');
  const StatusCodes = require('http-status-codes');
  const bcrypt = require('bcryptjs');

  const register = async (req, res) => {
    // destructure name, email, password from req.body object
    const { name, email, password } = req.body;

    // .genSalt() method generates random byte
    // the value is how many rounds it generates. 10 is default
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // the user's password string is now replaced with hashedPassword
    const tempUser = { name, email, password: hashedPassword };

    const user = await User.create({ ...tempUser });
    // status code is 201 created
    // send back the user object in json
    res.status(StatusCodes.CREATED).json({ user });
  };

  const login = async (req, res) => {
    res.send('login user');
  };
  ```
- Let's test our hash functionality by registering a new user in POSTMAN:
  - NOTE that the email must be unique, else we'll get an error. So create a new user with a new email
  - If successful, we should get back something like this:
    ```js
    {
      "user": {
          "_id": "627760938723564da547d182",
          "name": "Nga",
          "email": "nga1@gmail.com",
          "password": "$2a$10$RQp.jLcAp06rnoy3sVfmaesB4o8xUlTvWGQcF44dq8MaWl3ZgvI5W",
          "__v": 0
      }
    }
    ```

### [08. Create Mongoose middleware in UserSchema](https://github.com/sungnga/practice/commit/c47d9ba1763e4b5f48afbe26d0e323a85b3a0b79?ts=2)
- At the moment, we're hashing the user password and then create a new user in the database in the `register` controller. In order to keep our controllers clean and simple, another option is to use Mongoose middleware function to hash the user password before passing on to the next task 
- In Mongoose, pre middleware functions are executed one after another, when each middleware calls `next`. Also, instead of calling `next()` manually, we can use a use a function that returns a promise. In particular, use `async/await`
- File: models/User.js
  - Import the bcryptjs library to hash the user password
  - Call the `.pre()` method on the UserSchema to create Mongoose middleware. In this middleware, we simply generate the salt and then use it to hash the password in the UserSchema object
  - By marking the callback function as async function we don't need to call `next()`
  ```js
  const bcrypt = require('bcryptjs');

  // Mongoose middleware
  // marking the callback as async function, we don't need to call next() in this middleware
  UserSchema.pre('save', async function () {
    // .genSalt() method generates random byte
    // the value is how many rounds it generates. 10 is default
    const salt = await bcrypt.genSalt(10);
    // this keyword refers to the UserSchema object
    this.password = await bcrypt.hash(this.password, salt);
  });
  ```
- File: controllers/auth.js
  - In the register controller:
    - Remove the bcryptjs hash user password functionality
    - We pass the req.body object to the User.create() method. Because we're using Mongoose middleware to hash the user password, the password value in req.body is hashedPassword
  ```js
  const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    // status code is 201 created
    // send back the user object in json
    res.status(StatusCodes.CREATED).json({ user });
  };
  ```
- By setting up a Mongoose middleware to hash the user password in the UserSchema model, the user password has been hashed before the `register` controller function runs. Now the register controller only creates a new user in the database and sends back a status code of user created and a json object

### [09. Generate token - in register controller](https://github.com/sungnga/practice/commit/d9713fdc835c5727190ab31024bc93bd21d49b18?ts=2)
- Let's generate a token when we register a new user. For the time being, let's generate the token in the register controller. We will refactor our code where we will generate the token in the UserSchema using Mongoose instance method
- File: controllers/auth.js
  - In the register controller, once we generated the token for the user, we send back a response that has the user name and the token
  - The controller needs to send back the token to front-end client. That way they can use it to make requests to secured database or routes
  ```js
  const jwt = require('jsonwebtoken');

  const register = async (req, res) => {
    const user = await User.create({ ...req.body });

    // create a token for new user
    // 1st arg is the payload object. Try to keep payload small
    // 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
    // 3rd arg is options object. Set when this token will expire
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d'
      }
    );

    // status code is 201 created
    // send back the user name and the token in json
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  };

  const login = async (req, res) => {
    res.send('login user');
  };
  ```
 
### [10. Generate token using instance method in UserSchema](https://github.com/sungnga/practice/commit/dc339402b69ed7e54f660c9d583158bacc9e1e2c?ts=2)
- In order to keep our business logic clean in the register controller, we should generate the user token in the UserSchema model instead, because generating a token is part of the process of creating a user instance from the UserSchema model
- In Mongoose, instances of Models are documents. Documents have many of their own built-in instance methods and we can also define our own document instance methods
  - The pattern for creating document instance method looks like this:
    ```js
    Model.methods.method_name = function () {
      // logic
    }
    ```
    - NOTE: do not use arrow function for this as we need to use the `this` keyword to refer to the Model object. Use simple function
  - Then invoke the instance method on the document: `document.method_name()`
- We want to create an instance method on our UserSchema model that generates a user token. So in the register controller, where the user instance is created, the user(document) can invoke the instance method to generate the token
- File: models/User.js
  ```js
  const jwt = require('jsonwebtoken');

  // ---Generate token---
  // Creating instance method
  // NOTE: do not use arrow function. Use simple function!
  // This keyword refers to UserModel object
  UserSchema.methods.createJWT = function () {
    // 1st arg is the payload object. Try to keep payload small
    // 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
    // 3rd arg is options object. Set when this token will expire
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
  };
  ```
- File: controllers/auth.js
  - Remove the jsonwebtoken library as we don't need it anymore
  - Once a user instance is created, it has access to the instance method that was created in the UserSchema model. We just need to invoke the instance method to generate the JWT token
  ```js
  const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    // generate user token using instance method
    const token = user.createJWT();

    // status code is 201 created
    // send back the user name and the token in json
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  };
  ```

### [11. Using env variables](https://github.com/sungnga/practice/commit/e50b35626bc49ad8eb17f94a62e5579a799f99e7?ts=2)
- To make the JWT_SECRET key more secure, we can use a website to randomly generate keys for us
- Website: allkeysgenerators.com
  - Click on the Encryption key tab and select 256bit for security level
- File: .env
  - Create JWT_SECRET variable and set it to the generated key
  - Create JWT_LIFETIME variable and set a time when the JWT token will expire
  ```js
  MONGO_URI=mongodb+srv:<connection_string>
  JWT_SECRET=<generated_key>
  JWT_LIFETIME=30d
  ```
- File: models/User.js
  - In the jwt.sign() method, pass in process.env.JWT_SECRET as 2nd arg
  - Set the expiresIn option to process.env.JWT_LIFETIME
  ```js
  UserSchema.methods.createJWT = function () {
    // 1st arg is the payload object. Try to keep payload small
    // 2nd arg is jwt.Secret. In production, use long, complex and unguessable string value
    // 3rd arg is options object. Set when this token will expire
    return jwt.sign(
      { userId: this._id, name: this.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );
  };
  ```

### [12. Setup login controller](https://github.com/sungnga/practice/commit/5d1a8a6c14988d5a6d9413167cb616b4621eb734?ts=2)
- We start by setting a basic logic for the register controller. Here, we want to check if email and password was provided. If successful, we want to find the user by their email in the User DB. If that is successful, then we create a JWT token for the user. If not successful, we throw our custom error classes that we created. We will compare user password later
- File: controllers/auth.js
  - Import the BadRequestError and UnauthenticatedError classes
  - In the login controller:
    - Write an if statement to check if no email or password is provided throw the BadRequestError and provide a custom message
    - If this is successful, call User.findOne() method to find the user by their email in the User DB
    - If user doesn't exist, throw the UnauthenticatedError and provide a custom message
    - If user is found, then call user.createJWT() method to create a token for the user
    - Lastly, the login controller sends back a status code and a user object in json
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const { BadRequestError, UnauthenticatedError } = require('../errors');

  const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Please provide email and password');
    }

    // find user by their email in DB
    const user = await User.findOne({ email });

    if (!user) {
      throw new UnauthenticatedError('Invalid Credentials');
    }

    // if user exists, create a JWT token for the user
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
  };
  ```
- Let's test out user login functionality in POSTMAN
  - First, make sure to create a user in register route
  - Go to login route (`http://localhost:3000/api/v1/auth/login`) and make a POST request and provide username and password
  - If no email or password is provided we should get back a 400 Bad Request status code
  - If email or password is incorrect we should get a 401 Unauthorized status code

### [13. Compare password](https://github.com/sungnga/practice/commit/a968a0129ee0794e1977cc05b18bdc7a1a4db9e8?ts=2)
- When we register a new user, we hash their password value using the bcrypt package before storing in the database. Now in the login controller we want to compare the user password against the hashed password in DB. The bcrypt package has a `.compare()` method that we can use to get this done. We're not going to do it in the login controller, but rather, we'll create an instance method on our UserSchema to compare the password
- File: models/User.js
  - Write comparePassword instance method that compares the candidate's password with the document password in the database
  - This instance method takes candidatePassword as an argument. So wherever this method is called, the candidatePassword must be provided
  ```js
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    // this.password is accessing the document(user) password in DB
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  };
  ```
- File: controllers/auth.js
  - In the login controller, call the comparePassword instance method on the `user` object. Note that at this stage, we already checked to make sure we have a user instance. Pass in the `password` as an argument. Assign the result to isPasswordCorrect
  - Then write an if statement to check that if the password doesn't make, we throw an error
  ```js
  // the comparePassword instance method came from UserSchema model
  const isPasswordCorrect = await user.comparePassword(password);
  // if password doesn't make, throw an error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }
  ```

### [14. Setup auth middleware](https://github.com/sungnga/practice/commit/435f320bf303fe4deb6c1bd356b3adcb129783c7?ts=2)
- The next thing we want to work on is job routes. We want to protect all job routes and only the authenticated user has access to the job routes. Since we have multiple job routes that we want to protect, it would make more sense to create an auth middleware function to call on any route we want to protect
- File: middleware/authentication.js
  - Write an async auth middleware function that verifies the user token in the req.body headers
  - Call the `jwt.verify()` method to verify the token
  - If successfully verify JWT, add user object to the job routes
  ```js
  const User = require('../models/User');
  const jwt = require('jsonwebtoken');
  const { UnauthenticatedError } = require('../errors');

  const auth = async (req, res, next) => {
    // check header
    // authHeader is a string that looks like this: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authorization invalid');
    }

    // after splitting the string, get the 2nd element (which is the token)
    const token = authHeader.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // attach the user to the job routes
      req.user = { userId: payload.userId, name: payload.name };
      next();
    } catch (error) {
      throw new UnauthenticatedError('Authorization invalid');
    }
  };

  module.exports = auth;
  ```

### [15. Testing auth middleware](https://github.com/sungnga/practice/commit/21da415343358624d0f324ac26dd7e262a58e7bb?ts=2)
- The first option to applying the auth middleware to the job routes is to use it on the individual routes in jobs.js file in routes folder
- The second option is to apply it on the jobs base rout which is in the app.js file. This way all the job routes are protected
- File: app.js
  - By applying the auth middleware at the jobs base route, all job routes will be protected
  - Pass the auth middleware as a 2nd argument
  ```js
  // auth middleware
  const authenticateUser = require('./middleware/authentication');

  // base route for jobs
  // 2nd arg is the middleware
  app.use('/api/v1/jobs', authenticateUser, jobsRouter);
  ```
- File: controllers/jobs.js
  - In the createJob controller, send back the user object if authentication was successful
  ```js
  const createJob = async (req, res) => {
    res.json(req.user);
  };
  ```
- Let's test out our auth middleware in the createJob route. In POSTMAN:
  - make a POST request to jobs route (`http://localhost:3000/api/v1/jobs`). Note that this route was setup in routes/jobs.js file
  - in the Headers authentication body, provide the token `Bearer <token>`. Must first register a user to generate a token
  - if successful, we should get back a user object

### [16. Setup Job model: JobSchema](https://github.com/sungnga/practice/commit/40f2b9d08086cb78acb82240987f700bfde5b914?ts=2)
- File: models/Job.js
  - Here, every time we create a new job we tie the job to the user. We do this by using `mongoose.Types.ObjectId` and referencing the model name. In our case, it's the User model
  ```js
  const mongoose = require('mongoose');

  const JobSchema = new mongoose.Schema(
    {
      company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
      },
      position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
      },
      status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
      },
      createdBy: {
        // assign the new job to the user
        type: mongoose.Types.ObjectId,
        // referencing the User model
        ref: 'User',
        required: [true, 'Please provide user']
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Job', JobSchema);
  ```

### [17. Implement createJob controller](https://github.com/sungnga/practice/commit/0e3b43298d98bebf32475a6d2b25f6f25c72aabf?ts=2)
- File: controllers/jobs.js
  - Import the Job model, the StatusCodes, and the BadRequestError and NotFoundError classes
  ```js
  const Job = require('../models/Job');
  const { StatusCodes } = require('http-status-codes');
  const { BadRequestError, NotFoundError } = require('../errors');

  const createJob = async (req, res) => {
    // add createdBy property to req.body and set it to userId from req.user
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  };
  ```

### [18. Implement getAllJobs controller](https://github.com/sungnga/practice/commit/d8f318c00afaf799a758206a523b91e3087c0d8b?ts=2)
- Since each job is tied to a userId who created the job, in the getAllJobs controller, we can find all jobs that belong to that user by the createdBy property
- Since the getAllJobs route is protected, authentication token must be provided in the headers body of the query. And in our auth middleware, if authentication is successful, the user object is added to the jobs route. Hence, in the getAllJobs controller, we have access to the user object in `req.user` and we can get the userId here
- File: controllers/jobs.js
  ```js
  const getAllJobs = async (req, res) => {
    // once authenticateUser is successful,
    // we have access to user object in req.user
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  };
  ```

### [19. Set token dynamically in POSTMAN](https://github.com/sungnga/practice/commit/dcd7569c0d2f3f828e9857cd38987859b5857f6b?ts=2)
- In our project, as we want to create more users or make different job queries, we don't want to type in the token value in the headers content every time. In the Postman we can set this up dynamically where if we successfully register a new user and we get back the token in json response, we can pass the token value as global variable to the jobs routes
- **Setting up token dynamically:**
  - For the login and register routes:
    - Click on the Tests tab and set this up
      ```js
      // pm stands for postman
      const jsonData = pm.response.json();
      // setup global variable
      // token is the name of the property we get back in json response
      // accessToken is the name of the global variable
      pm.globals.set("accessToken", jsonData.token)
      ```
    - Click the Se nd button
- **Using the dynamic token:**
  - For all the jobs routes:
    - In the Headers tab, uncheck or remove the Authorization property
    - Click on the Authorization tab and select the "Bearer Token" type
    - Then provide the global variable as the token value: `{{accessToken}}`

### [20. Implement getJob controller](https://github.com/sungnga/practice/commit/43e7adc0b43a0692fe14bee79a22be1c4c3313fc?ts=2)
- The get single job route requires a job id in the query params. So the route looks like this: `/jobs/:id`
- File: controllers/jobs.js
  ```js
  const getJob = async (req, res) => {
    // user object comes from auth middleware
    // destructure the user object and get the userId from it
    // the params object is provided by express
    // assign an alias for id to jobId to be more explicit
    const {
      user: { userId },
      params: { id: jobId }
    } = req;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
  };
  ```
- Let's test this route using POSTMAN
  - Make a GET request to get single job route
  - don't forget to provide the dynamic token value in the Authorization tab. Select Bearer Token and the value `{{accessToken}}`
  - Login a user in the login route. Then make a query to the getAllJobs route to get all jobs for this user. Take one of the job ids and make a query to getJob route and provide the job id in the query params `{{URL}}/jobs/628dc6b2ad025b93970f506b`
  - if successful, we should get a single job object back
    ```js
    {
        "job": {
            "status": "pending",
            "_id": "628dc6b2ad025b93970f506b",
            "company": "amazon",
            "position": "back-end developer",
            "createdBy": "6288704ea1ae4c5c61ef37df",
            "createdAt": "2022-05-25T06:03:31.143Z",
            "updatedAt": "2022-05-25T06:03:31.143Z",
            "__v": 0
        }
    }
    ```

### [21. Implement updateJob controller](https://github.com/sungnga/practice/commit/b029b6996db8437a6b77aad8a0f7fa38dfa05fd4?ts=2)
- Updating a job is a PATCH request and it requires a jobId in the query params
- The user must provide the values for company and position properties in the Body content
- Since this route is protected, once the user has been authenticated, the user object is attached to the req object of this route
- File: controllers/jobs.js
  ```js
  const updateJob = async (req, res) => {
    // destructure from req object
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId }
    } = req;

    if (company === '' || position === '') {
      throw new BadRequestError('Company or Position fields cannot be empty');
    }

    // set new to true means it will return the updated job
    const job = await Job.findByIdAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
  };
  ```
- Let's update a job using POSTMAN:
  - Make a PATCH request to update a job
    - Provide a job id in the query params
    - Provide the user token (dynamically) in Authorization
    - Provide the values for company and position
  - If successful, we should get back the updated job object
  - Go back to getAllJobs route and make a request. Check to see if the job we want to job has been updated

### [22. Implement deleteJob controller](https://github.com/sungnga/practice/commit/b7df80896cfa11675448b389bbfe859263f9c9dc?ts=2)
- To remove a job, make a DELETE query and provide the jobId in the query params
- File: controllers/jobs.js
  - Use the `.findOneAndRemove()` method on the Job model to remove a job
  - If successful, we don't send back anything but the status code
  ```js
  const deleteJob = async (req, res) => {
    const {
      user: { userId },
      params: { id: jobId }
    } = req;

    const job = await Job.findOneAndRemove({
      _id: jobId,
      createdBy: userId
    });
    if (!job) {
      throw new NotFoundError(`No job with id ${jobId}`);
    }

    // if successful, we don't send back anything but the status code
    res.status(StatusCodes.OK).send();
  };
  ```

### [23. Handle duplicate email error](https://github.com/sungnga/practice/commit/2a8a7bbb82ff0a7e31237d08cb26f607efe2c45a?ts=2)
- Let's work on error handling where we send back a more user-friendly response when an error occurs
- Currently we have three Mongoose errors:
  - Validation errors - if the user doesn't provide the values
  - Duplicate email - email must be unique
  - Cast error - if the id doesn't match with Mongoose's id
- File: middleware/error-handler.js
  ```js
  // const { CustomAPIError } = require('../errors');
  const { StatusCodes } = require('http-status-codes');

  const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
      // set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Something went wrong try again later'
    };

    // don't need to use this anymore. The default customError handles this already
    // if (err instanceof CustomAPIError) {
    // 	return res.status(err.statusCode).json({ msg: err.message });
    // }

    // handling duplicate email error
    // error code 11000 is email duplicate
    if (err.code && err.code === 11000) {
      // sending custom error message
      customError.msg = `Duplicate value entered ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      // sending custom status code
      customError.statusCode = 400;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    return res.status(customError.statusCode).json({ msg: customError.msg });
  };
  ```

### [24. Handle validation error](https://github.com/sungnga/practice/commit/dc619292ad1eae276eaf190c23a8b22cdfb80562?ts=2)
- Let's handle validation errors. For example, if the user doesn't provide a value for name, email, or password in registration
- File: middleware/error-handler.js
  - Console log the err.errors object to see what we have to work with
  - To make the error message more user-friendly, we map over the err.errors array. The items in this array are `email` and `password` and they are objects themselves. What we want to print out is the `message` property in each item and we join them together
  ```js
  // handling validation error
  // i.e if user doesn't provide email or password during registration
  // the err.errors object contains password and email objects
  // Object.values() method turns object into array
  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  ```

### [25. Handle cast error](https://github.com/sungnga/practice/commit/7ea1807ade67fc8a9fce4d40d968f5dde34a8bf5?ts=2)
- If we're updating a job, get a single job or deleting a job, we need to provide a job id to the query params. If we provide a jobId that's not in the database we get a 404 status code. However, if we provide a jobId that isn't correct (i.e if the number of characters is too long or too short or a syntax error), we get a casting error
  - Example of casting error
  ```js
  {
      "msg": "Cast to ObjectId failed for value \"628c805cad025b93970f50677\" (type string) at path \"_id\" for model \"Job\""
  }
  ```
- If we console log the `err` object, these are the values that we get back
  ```js
  {
    "err": {
        "stringValue": "\"628c805cad025b93970f50677\"",
        "valueType": "string",
        "kind": "ObjectId",
        "value": "628c805cad025b93970f50677",
        "path": "_id",
        "reason": {},
        "name": "CastError",
        "message": "Cast to ObjectId failed for value \"628c805cad025b93970f50677\" (type string) at path \"_id\" for model \"Job\""
    }
  }
  ```
- File: middleware/error-handler.js
  ```js
  // handling cast error
  if (err.name === 'CastError') {
    // sending custom error message
    customError.msg = `No item found with id: ${err.value}`;
    // sending custom status code
    customError.statusCode = 404;
  }

  // to see the values in the err object
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
  ```
- Final code for the errorHandlerMiddleware function
  ```js
  const { StatusCodes } = require('http-status-codes');

  const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
      // set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || 'Something went wrong try again later'
    };

    // handling validation error
    // i.e if user doesn't provide email or password during registration
    // the err.errors object contains password and email objects
    // Object.values() method turns object into array
    if (err.name === 'ValidationError') {
      console.log(Object.values(err.errors));
      customError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(',');
      customError.statusCode = 400;
    }

    // handling duplicate email error
    // error code 11000 is email duplicate
    if (err.code && err.code === 11000) {
      // sending custom error message
      customError.msg = `Duplicate value entered ${Object.keys(
        err.keyValue
      )} field, please choose another value`;
      // sending custom status code
      customError.statusCode = 400;
    }

    // handling cast error
    if (err.name === 'CastError') {
      // sending custom error message
      customError.msg = `No item found with id: ${err.value}`;
      // sending custom status code
      customError.statusCode = 404;
    }

    // to see the values in the err object
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
  };

  module.exports = errorHandlerMiddleware;
  ```

### [26. Setup security and install security packages](https://github.com/sungnga/practice/commit/d4b8dabf76c47ef05751c8441657d6ef85a4e936?ts=2)
- These are the security packages we will use to make our application a little more secured before deploying it to Heroku. These security packages are used as middleware in our application
  - helmet - a very popular security package securing the http headers
  - cors - ensures our API is accessible from different domain
  - xss-clean - sanitizes the user's input in req.body, req.query, req.params, thus prevents attacker from injecting malicious code
  - express-rate-limit - limits the amount of requests a user can make
- File: app.js
  - Import the security packages
  - Invoke each one as middleware in `app.use()` method
  ```js
  // extra security packages
  const helmet = require('helmet');
  const cors = require('cors');
  const xss = require('xss-clean');
  const rateLimiter = require('rate-limiter');

  // enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx)
  app.set('trust proxy', 1);
  app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000, //15 minutes
      max: 100 //limit each IP to 100 requests per windowMs
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  ```

### [27. Deploy app to Heroku](https://github.com/sungnga/practice/commit/92f70f1ff7c3e10b3f1fda738ad757b3c158ac62?ts=2)
- Need three things:
  - Sign up for Heroku account
  - GIT version control installed
  - Install Heroku CLI - a tool to deploy our app from the terminal
- Make a copy of this application so that there's only this project in a folder
- **Prepping the project:**
- NOTE: always start by removing the existing GIT repo
  - In the terminal and in the project directory: `rm -rf .git`
- File: app.js
  - Check to make sure there's a `process.env.PORT` set up. This allows Heroku to setup a port for us and our application will run on that port
    - `const port = process.env.PORT || 3000;`
  - Then create a simple GET request at the root of the project just to make sure it is working properly once we deployed the app to Heroku
    ```js
    // testing the root route
    app.get('/', (req, res) => {
      res.send('jobs api');
    });
    ```
- File: package.json
  - Add the `engines` property to set the node version we're using. In the terminal, type: `node -v` to see the version installed on the computer
  - Then in the start scripts, change `nodemon app.js` to `node app.js`
  ```js
  "scripts": {
    "start": "node app.js"
  },
  "engines": {
    "node": "14.x"
  }
  ```
- At the root of project directory create a `ProcFile` file with no extension
  ```js
  web: node app.js
  ```
- **Setup GIT version control. In the terminal:**
  - `git init`
  - `git add .` to add all files
  - `git commit -m "Initial commit"` to add a commit message
- **Deploy to Heroku from the terminal:**
  - Login to Heroku: `heroku login`. A browser window will pop up asking to login
  - Create a new app in Heroku by giving it a name (can't start with a number): `heroku create <app_name>`
  - Check to see if Heroku is pointing to the GIT repo: `git remote -v`
  - Push to GitHub: `git push heroku master`
- Setup our .env variables in Heroku GUI dashboard
  - Navigate to our project on Heroku dashboard and click on the "Settings" tab
  - Scroll to the Config Vars section and enter the keys and values that we have setup in the `.env` file. Copy and paste exactly as is. There should be three of them
  - Click on the "More" button and select "Restart all dynos". Heroku will update our app with the correct .env info
  - Click on the "Open app" button to launch our app
- Once our application is deployed to Heroku we get a URL for our app. We can then use this domain name to test out our API routes in Postman
- **Testing API routes using POSTMAN:**
  - We don't want to lose our global variable URL for development in port 3000, so we're going to create a new PROD_URL global variable
  - Create a global variable for Heroku URL route. Click on the EYE icon to get to the global variable and click the "Edit" button
    - Set the `VARIABLE` property to `PROD_URL`
    - Set the `INITIAL VALUE` property to the Heroku URL of our app, plus add `/api/v1` to it
    - The value for `CURRENT VALUE` property will be the same as `INITIAL VALUE` property
    - Click the "Save" button
  - Let's try to login a user:
    - Make a POST request and the URL is: `{{PROD_URL}}/auth/login`
    - In the Body content, provide the user's email and password in json format
    - We need to provide the user token. Click on the Tests tab and past in the code
      ```js
      // pm stands for postman
      const jsonData = pm.response.json();
      // setup global variable
      // token is the name of the property we get back in json response
      // accessToken is the name of the global variable
      pm.globals.set("accessToken", jsonData.token)
      ```
    - If successful logging in, we should get back the user name and the token value
  - Let's try to get all jobs for this user:
    - Make a GET request to the URL: `{{PROD_URL}}/jobs`
    - Click on the Authorization tab and select the Bearer Token type. The token value is `{{accessToken}}`
    - If successful, we should get back all the jobs

### [28. How to clone existing Heroku project](https://github.com/sungnga/practice/commit/48ca7b6116af1124ab99b325012ecee537afbc1a?ts=2)
- The idea is we want to clone a copy of our project that we just deployed to Heroku. This project is now sitting in the cloud. If we want to make a change to the project, we can make the changes on our local machine and push it back up to Heroku
- Clone a copy of Heroku project to computer desktop
  - In the terminal, cd into desktop adn run: `heroku git:clone -a <name_of_project>`
  - Name of Heroku project can be found on Heroku dashboard page
- In this clone project, we need to add a `.env` file and fill in the necessary environment variables which we can get on Heroku project dashboard
- Lastly, we need to create the package.json file and startup the local server
  - cd into the project directory and run: `npm install && npm start`