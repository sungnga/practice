## SECTION 6: JOBS API
- Folder directory: /06-jobs-api/

### Goals of this project
- Build an application API where users can login to their account and manage their job search. We'll combine our knowledge on authentication and CRUD functionality to build this app
- Host our application to the cloud by deploying to Heroku
- Setup a document with Swagger UI

### [01. Initialize project with starter files]()
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

### [02. Setup basic controllers]()
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

### [03. Setup routes for auth and jobs]()
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

### [04. Connect to the database]()
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

### [05. Create User schema/model]()
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

### [06. Create user - basic setup]()
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

### [07. Hash user password using bcryptjs lib]()
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

### [08. Create Mongoose middleware in UserSchema]()
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

### [09. Generate token - in register controller]()
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
 
### [10. Generate token using instance method in UserSchema]()
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

### [11. Using env variables]()
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

### [12. Setup login controller]()
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

### [13. Compare password]()
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

### [14. Setup auth middleware]()
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

### [15. Testing auth middleware]()
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

### [16. Setup Job model: JobSchema]()
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

### [17. Implement createJob controller]()
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

### [18. Implement getAllJobs controller]()
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

### [19. Set token dynamically in POSTMAN]()
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

### [20. Implement getJob controller]()
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

### [20. Implement updateJob controller]()
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

