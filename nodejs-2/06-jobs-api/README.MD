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
