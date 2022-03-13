## SECTION 3: TASK MANAGER
- Folder directory: /03-task-manager/

### Goals of this project
- Learn how to setup API and connect to the cloud database. Learn how to persist data to the cloud
- Learn how to perform the CRUD (create, read, update, delete) operations on the data
- The client can create, read, update, and delete tasks by sending requests to our API

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/03-task-manager/starter
- cd into project directory: `cd 03-task-manager`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, and mongoose libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Basic Express server]()
- File: app.js
  ```js
  const express = require('express');
  const app = express();

  // routes
  app.get('/hello', (req, res) => {
    res.send('Task Manager App');
  });

  const port = 3000;

  app.listen(port, console.log(`Sever is listening on port ${port}...`));
  ```

### Project route structure
- app.get('/api/v1/tasks')        - get all the tasks
- app.post('/api/v1/tasks')       - create a new task
- app.get('/api/v1/tasks/:id')    - get single task
- app.patch('/api/v1/tasks/:id')  - update task
- app.delete('/api/v1/tasks/:id') - delete task

### [03. Setup getAllTasks route and controller]()
- At the root of project directory, create two new folders: controllers and routes
- We're going to put all the different route requests in the `routes` folder and all the logic for the route requests in the `controllers` folder
- File: controllers/tasks.js
  - Write a getAllTasks controller(logic) to get all the tasks data
  - Export all the controllers as an object
  ```js
  const getAllTasks = (req, res) => {
    res.send('All task items');
  };

  module.exports = { getAllTasks };
  ```
- File: routes/tasks.js
  - Import the express module and from it, instantiate a new router object by invoking the Router class from the express module
  - Import and destructure the `getAllTasks` controller from the controller folder
  - We're going to use `router.route()` to chain on the different request methods that have the same route path
  ```js
  const express = require('express');
  const router = express.Router();

  const { getAllTasks } = require('../controllers/tasks');

  router.route('/').get(getAllTasks);

  module.exports = router;
  ```
- File: app.js
  - Import the tasks router
  - We want to have access to the json data in req.body by using express middleware `express.json()`
  - We use the tasks routes in the app.js file by setting up the express middleware using express.use()
  ```js
  const express = require('express');
  const app = express();
  // import tasks router
  const tasks = require('./routes/tasks');

  // middleware
  // have access to json data in req.body
  app.use(express.json());

  // using tasks router as middleware
  // 1st arg is the base route
  // 2nd arg is the tasks router
  app.use('/api/v1/tasks', tasks);

  const port = 3000;

  app.listen(port, console.log(`Sever is listening on port ${port}...`));
  ```
- To test our getAllTasks route, navigate in the browser to: `http://localhost:3000/api/v1/tasks`. If we're able to make the request successfully, we should see a simple message "All task items"

### [04. Setup all route requests]()
- Let's setup the rest of the routes and their controllers
- File: controllers/tasks.js
  - Setup the controllers for createTask, getTask, updateTask, and deleteTask
  - Export them as an object
  ```js
  const getAllTasks = (req, res) => {
    res.send('Get all tasks');
  };

  const createTask = (req, res) => {
    res.json(req.body);
  };

  const getTask = (req, res) => {
    res.json({ id: req.params.id });
  };

  const updateTask = (req, res) => {
    res.send('Update task');
  };

  const deleteTask = (req, res) => {
    res.send('Delete task');
  };

  module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
  ```
- File: routes/tasks.js
  - Import and destructure the task controllers
  - Chain on all the different request methods that have the same paths
  ```js
  const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
  } = require('../controllers/tasks');

  router.route('/').get(getAllTasks).post(createTask);
  router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
  ```
- Test out all the route requests in POSTMAN
  - Create a collection and save all the request methods in this collection
  - When submitting data along with the request, in the Body tab, set the body type to "raw" and the format type to "JSON"

### REST API
- REST stands for Representational State Transfer
- It is the most popular API design pattern
- Our API allows clients to perform CRUD operations on our data

### MongoDB
- NoSQL, non-relational database. Does not care how data relates to each other
- Store JSON
- Instead of rows, we have documents. A document is a set of key-value pairs. A collection is a set of documents
- Easy to get started
- Free cloud hosting - Atlas

### [05. Setup MongoDB]()
- We're going to use MongoDB for our project database
- After creating a MongoDB account, create a new cluster and give the cluster a name
- In MongoDB project dashboard
  - Setup Database Access:
    - Select Database Access in the main menu
    - Select Password as Authentication Method
    - Provide the name and password
    - For the Database User Privileges, select Read and write to any database
  - Setup Network Access:
    - Select Network Access in the main menu
    - Then select Allow Access from Anywhere
  - Get connection string:
    - Select Clusters in the main menu
    - Click on the "CONNECT" button, then select "Connect your application"
    - Driver is: Node.js
    - Version is: 3.6 or later
    - Copy the connection string to the clipboard
- At the root of project directory, create a folder called `db`. In it, create a file called connect.js
- File: db/connect.js
  ```js
  const connectionString = 'PASTE_MONGODB_CONNECTION_STRING_HERE';
  ```

### Mongoose
- Mongoose is a MongoDB object data modeling for node.js
- Writing MongoDB validation, casting, and business logic boilerplate can be a pain. Mongoose provides a straight-forward, schema-based solution to model an application data. It includes built-in type casting, validation, query building, business logic hooks and more to make our development faster
- Install Mongoose library:
  - Install: `npm install mongoose`

### [06. Connect to DB]()
- What we want to do in our application is only when we are successfully connected to the database (MongoDB) then we will start up the Express server
- File: db/connect.js
  - Import the mongoose library
  - Write a connectDB function that invokes the mongoose.connect() method to connect to MongoDB database. However, we will invoke this function in app.js file instead
  - Make sure to provide the MongoDB password in the connection string, else it will not connect! By default, MongoDB assigned a name to the database, but can change it in the connection string
  - Export the connectDB function as a module
  ```js
  const mongoose = require('mongoose');

  // make sure to provide your password here. Else it'll not connect to DB
  // 03-TASK-MANAGER is the name of the database
  const connectionString = 'PASTE_MONGODB_CONNECTION_STRING_HERE';

  // invoke mongoose.connect() in app.js file, not here
  const connectDB = (url) => {
    // connecting our application to MongoDB that we setup
    // mongoose.connect() method returns a promise
    return mongoose.connect(connectionString);
  };

  module.exports = connectDB;
  ```
- File: app.js
  - Import connectDB function
  - Write a `start` async function that connects our application to MongoDB with the help of Mongoose library by invoking connectDB() method. If this is successful, start up the Express server by invoking app.listen() method
  ```js
  const connectDB = require('./db/connect');

  // Note that mongoose.connect() method returns a promise
  // therefore use try/catch block here
  const start = async () => {
    try {
      // invoking the mongoose.connect() method
      await connectDB();

      // start the server if the connection is successful
      app.listen(port, console.log(`Sever is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```
