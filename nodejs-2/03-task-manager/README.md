## SECTION 3: TASK MANAGER
- Folder directory: /03-task-manager/

### Goals of this project
- Learn how to setup API and connect to the cloud database. Learn how to persist data to the cloud
- Learn how to perform the CRUD (create, read, update, delete) operations on the data
- The client can create, read, update, and delete tasks by sending requests to our API

### [01. Initialize project with starter files](https://github.com/sungnga/practice/commit/a62c68d4efc853da82bfcc448102b409e267e485?ts=2)
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/03-task-manager/starter
- cd into project directory: `cd 03-task-manager`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, and mongoose libraries
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Basic Express server](https://github.com/sungnga/practice/commit/bf61da0420a3a043d0a55829cf382968d2e1afbd?ts=2)
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

### [03. Setup getAllTasks route and controller](https://github.com/sungnga/practice/commit/fb2868a9a4efa9dc6eaef40cbf027b248acd38c6?ts=2)
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

### [04. Setup basic route requests](https://github.com/sungnga/practice/commit/260aa60dfa9120cb0485aa042568d8561998bdfb?ts=2)
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

### [05. Setup MongoDB](https://github.com/sungnga/practice/commit/acc8d08a62d68edd5323d3102a3e2832625d1e6c?ts=2)
- We're going to use MongoDB for our project database
- After creating a MongoDB account, create a new project and give the project a name: Nodejs-03-Task-Manager
- In MongoDB project dashboard
  - Create a cluster:
    - Select Database in the main menu
    - Select the Free tier
    - Cloud Provider & Region: AWS and select the closest region to where you live
    - Cluster Name: Give this cluster a name
  - Setup Database Access Security:
    - Select Database Access in the main menu
    - Select Password as Authentication Method
    - Provide the name and password
    - For the Database User Privileges, select Read and write to any database
  - Setup Network Access Security:
    - Select Network Access in the main menu
    - Then select Allow Access from Anywhere
  - Get connection string:
    - Select Database in the main menu
    - Click on the "CONNECT" button, then select "Connect your application"
    - Driver is: Node.js
    - Version is: 3.6 or later
    - Copy the connection string to the clipboard
      - Replace <password> with the password for the 03-task-manager user. Replace <myFirstDatabase> with the name of the database that connections will use by default
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

### [06. Connect to DB](https://github.com/sungnga/practice/commit/b3d3ad4ae36c0c6b152054dc30bfa696c71b85aa?ts=2)
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

### [07. Setup ENV VARS](https://github.com/sungnga/practice/commit/68720fc9b881f644d5b8e236a7e82508fa8f8059?ts=2)
- The dotenv library allows us to store sensitive information such as passwords of our application in a file that will not be shared in public
- Install dotenv library: `npm install dotenv`
- At the root of the project directory, create a file called .env
- In .gitignore file, add the .env file to the list
- File: .env
  ```js
  MONGO_URI=PASTE_MONGODB_CONNECTION_STRING_HERE
  ```
- File: db/connect.js
  - Remove the `connectionString` variable
  - The connectDB function is expecting `url` as an argument. Pass in this `url` params to the mongoose.connect() method as the first argument
  ```js
  const mongoose = require('mongoose');

  // invoke mongoose.connect() in app.js file, not here
  const connectDB = (url) => {
    // connecting our application to MongoDB
    // mongoose.connect() method returns a promise
    return mongoose.connect(url);
  };

  module.exports = connectDB;
  ```
- File: app.js
  - To access the .env file, require the dotenv library and no need to assign it to a variable: `require('dotenv');`. Then invoke the config() method: `require('dotenv').config();`
  - `process.env` is a global variable in Node.js. We use this to access an environmental variable that we've set up in .env file
  - Inside the `start` function where we invoke the `connectDB` method, pass in `process.env.MONGO_URI` as an argument
  ```js
  const connectDB = require('./db/connect');
  require('dotenv').config();

  // Note that mongoose.connect() method returns a promise
  // therefore use try/catch block here
  const start = async () => {
    try {
      // invoking the mongoose.connect() method
      // it's expecting the MongoDB connection string value
      await connectDB(process.env.MONGO_URI);

      // start the server if the connection is successful
      app.listen(port, console.log(`Sever is listening on port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };

  start();
  ```

### [08. Creating our first schema and model](https://github.com/sungnga/practice/commit/9030c88fef85bcd9751a51d5f27c6c8b63b04ad5?ts=2)
- In MongoDB, we have collections which made up of documents. A schema created using Mongoose defines the blueprint or structure for a document, such as data types and validations. This is called schema definitions. A document is the data in key/value pairs. Only the properties setup in the schema will be passed to the database
- The valid SchemaTypes in Mongoose are:
  - String
  - Number
  - Date
  - Buffer
  - Boolean
  - Mixed
  - ObjectId
  - Map
  - Schema
- **Models**
  - A model is a representation for the collection. In Mongoose, a model is a wrapper for the schema. A Mongoose model provides an interface to the database. Using the model, we'll be able to perform CRUD operations on MongoDB database
  - An instance of a model is called a document
  - When calling `mongoose.model()` on a schema, Mongoose compiles a model for you
    - `const Task = mongoose.model('Task', schema);`
    - The 1st argument is the singular name of the collection the model is for. Mongoose automatically looks for the plural, lowercase version of the model name. For example, the model Task is for the tasks collection in the database
    - The `.model()` function makes a copy of `schema` (creates a document)
- At the root of the project directory, create a folder called models
- File: models/Task.js
  - First, create a TaskSchema definitions which defines the structure of our task document
  - NOTE: only the properties setup in the schema will be passed to the database
  - Then create a Task collection and add the TaskSchema (the document) to the Task collection by calling `mongoose.model()`
  - Lastly, export the Task model
  ```js
  const mongoose = require('mongoose');

  // a schema defines the structure for the document in a collection
  // Strings and Boolean are SchemaTypes
  // NOTE: only the properties setup in the schema will be passed to the database
  const TaskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean
  });

  // the .model() method makes a copy of TaskSchema
  // 1st arg is the name of the collection
  // 2nd arg is the schema
  module.exports = mongoose.model('Task', TaskSchema);
  ```

### [09. Creating a task document](https://github.com/sungnga/practice/commit/54a451e43f365e8957ab550fa64517750e95f435?ts=2)
- Now that we setup the task schema and model, we should be able to perform CRUD operations in the controllers and update the database in MongoDB
- To add/create a task document to the Task collection, simply call `.create()` on the Task model
- NOTE: The `Task.create()` function is an async operation. So use async/await on this function
- File: controllers/tasks.js
  - Import the Task model: `const Task = require('../models/Task');`
  - For the `createTask` route, we want to call the `Task.create()` method and pass in the data in `req.body` to it. This will add a new task document containing the data to the Task collection
  - Adding/creating a document to the database is an async operation. So mark the createTask function as an `async` function and add the `await` keyword in front of the `Task.create()` function
  ```js
  const Task = require('../models/Task');;

  // Create a task is a POST method
  const createTask = async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  };
  ```
- To test if we're able to create a new task document and add it to the Task collection in MongoDB:
  - use POSTMAN to create a task. Don't forget to provide the task data (name and completed keys)
  - if successful, we should get back a 201 status code and a single `task` object back
  - go to MongoDB dashboard page, select Database from the main menu, and click the "Browse Collections" button. Here, we should be able to see a new task document added to the "tasks" collection. Mongoose also creates an `_id` for each document for us. Note that in MongoDB, the tasks collection is in plural form. But when we created the collection in `mongoose.model('Task', TaskSchema)` method, we used singular form

### [10. Adding basic validation, handling errors](https://github.com/sungnga/practice/commit/7c0fbe2419396f0da96271aac677463d8e015c24?ts=2)
- With our current setup, users are able to create a new task document without providing data or providing empty values. We can setup basic form validation in the schema
- **Setting up basic validations:**
- In the schema definitions, instead of specifying a simple SchemaType to the property, we can specify an object and pass in multiple properties including validations
- File: models/Task.js
  - Make the `name` property a required field, trim before and after white spaces, and with a maximum characters of 20
  - Set the `completed` property default to false
  ```js
  // a schema defines the structure for the document in a collection
  // Strings and Boolean are SchemaTypes
  // NOTE: only the properties setup in the schema will be passed to the database
  const TaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'just provide name'],
      trim: true,
      maxlength: [20, 'name can not be more than 20 characters']
    },
    completed: {
      type: Boolean,
      default: false
    }
  });
  ```
- **Handling validation errors:**
- Next, if an error do occurs during this async operation, we need to handle it in the createTask controller because this is where the Task model is executed
- File: controllers/tasks.js
  - We handle the validation error using a try/catch block
  ```js
  // Create a task is a POST method
  const createTask = async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
    }
  };
  ```

### [11. Add logic to getAllTasks controller](https://github.com/sungnga/practice/commit/8c4a546a45bd06c8937edba9fc1067458f4dadcf?ts=2)
- Docs: https://mongoosejs.com/docs/queries
  - Mongoose models provide several static helper functions for CRUD operations. These functions return a mongoose `Query` object
    - Model.deleteOne()
    - Model.deleteMany()
    - Model.find()
    - Model.findOne()
    - Model.findById()
    - Model.replaceOne()
    - Model.updateOne()
    - Model.updateMany()
  - A mongoose query can be executed in one of two ways. First, if you pass in a callback function, mongoose will execute the query asynchronously and pass the results to the callback
  - A query also has a `.then()` method, and thus can be used as a promise. NOTE that mongoose queries are not promises. They have a `.then()` method for async/await as a convenience. Calling a query's `.then()` can execute the query multiple times
- File: controllers/tasks.js
  - Let's write the logic for the getAllTasks controller. Use a try/catch block since this is an async operation
  - The Model.find() function will query all the task documents for us
  ```js
  const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
    }
  };
  ```

### [12. Add logic to getTask controller](https://github.com/sungnga/practice/commit/d233dcb771beab2a84cd3cfbf3cb04cdb23f81d0?ts=2)
- Get a single task from the database based on the taskID
- The static function we will use is Model.findOne()
- File: controllers/tasks.js
  ```js
  const getTask = async (req, res) => {
    try {
      // get the id out of req.params
      // destructure the id and give it a new alias
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });

      // if this task id not found
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }

      res.status(200).json({ task });
    } catch (error) {
      // syntax or general error
      res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
    }
  };
  ```
- To test out our controller using POSTMAN tool:
  - First, make a request to get all tasks and copy the `_id` of one of the tasks
  - Make a single task get request and paste that id into the route params
  - If we're successful, we should get back a single task object from the database
    ```js
    {
      "task": {
        "_id": "62313353ebaf6a977c306f92",
        "name": "Shower",
        "completed": true,
        "__v": 0
      }
    }
    ```

### [13. Add logic to deleteTask controller](https://github.com/sungnga/practice/commit/19a0386c2a97ba47969667b8cb548cbd84b68f72?ts=2)
- The static function we will use is Model.findOneAndDelete()
- File: controllers/tasks.js
  ```js
  const deleteTask = async (req, res) => {
    try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndDelete({ _id: taskID });

      // if this task id not found
      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }

      // 1st option: send back the task that has been removed
      // res.status(200).json({ task });
      // 2nd option: just sent the status code
      // res.status(200).send();
      // 3rd option: send status code, set task to null, and a custom message
      res.status(200).json({ task: null, status: 'success' });
    } catch (error) {
      // syntax or general error
      res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
    }
  };
  ```

### [14. Add logic to updateTask controller](https://github.com/sungnga/practice/commit/8bb6625923a9bce5988193e2c230831a7ec5be4d?ts=2)
- To update a task, we need to get the taskID from route params and the data from req.body to be updated
- The static function we will use is Model.findOneAndUpdate(). We pass in three arguments to this function
  - The 1st is the taskID
  - The 2nd is the updated task provided in req.body
  - The 3rd is an options object. We want to get back the updated task and not the old by task, by default. And we want to add validators
- File: controllers/tasks.js
  ```js
  const updateTask = async (req, res) => {
    try {
      const { id: taskID } = req.params;

      // the 3rd arg is an options object
      // by default, it sends back the old task. But we want the new/updated task
      // runValidators ensures that users provide a value for name property
      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
      });

      if (!task) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }

      res.status(200).json({ task });
    } catch (error) {
      // syntax or general error
      res.status(500).json({ msg: error }); //2nd option is to send back a simple error message
    }
  };
  ```

### [15. Add front-end](https://github.com/sungnga/practice/commit/79f72b03631d3963e80c5b5502471b19e2f4ab61?ts=2)
- The next step we want to do is to serve static files in the public folder. And in order to serve static files, we're going to use the Express middleware `express.static()`
- File: app.js
  - Call `app.use()` to use a middleware and pass in express middleware's `express.static()` to serve static files in the public folder
  ```js
  app.use(express.static('./public'));
  ```
- To see our static files being server, navigate in the browser to: `http://localhost:3000/`
  - Here, we should see a Task Manager form for the user to submit a task and also a list of tasks coming from MongoDB database from tasks collection
  - If a task is completed, it's crossed out. There's an edit button to update the task and a delete button to delete the task
  - All the functionalities for the CRUD operations should be working and any changes made should be reflected in MongoDB database

### PUT vs PATCH methods
- Both PUT and PATCH methods are for updating the resource
- PUT method is replacing the existing resource
  - For example, if we provide the data that we want to update but do not provide the data for other properties in the document and we set the option property to `overwrite: true`, then those properties we don't update will be removed
- PATCH method is for partial update
  - For example, if we provide the data that we want to update and not provide any data for other properties, those properties will remain in put and will not be removed

### [16. Adding a custom route not-found middleware](https://github.com/sungnga/practice/commit/8c355c04719d6570c525b94df378f99865b87585?ts=2)
- If the requested resource is not found we want to send back a custom 404 response
- To do this, we're going to create a not-found middleware and use it in the app.js file
- At the root of the directory, create a folder called middleware
- File: middleware/not-found.js
  ```js
  // since this is a middleware, it has access to the req and res objects
  // sending back a custom message with a 404 status code
  const notFound = (req, res) => res.status(404).send('Route does not exist');

  module.exports = notFound;
  ```
- File: app.js
  - Import the not-found middleware
  - Call `app.use()` method to use the middleware
  ```js
  const notFound = require('./middleware/not-found');

  app.use(notFound);
  ```

### [17. Creating asyncWrapper middleware](https://github.com/sungnga/practice/commit/fa44d50dfe6dc106303d5d5f07f28efc53b2245e?ts=2)
- In our current controllers setup, we've been using the try-catch blocks for each async controllers. This approach we have setup has a lot of redundant code. A better approach would be to setup a middleware function and wrap our controllers in it. There are npm packages out there that will do this for us, but for now, we're going to write this middleware function ourselves
- This `asyncWrapper` middleware is invoked inside the Express `router.route` methods, which essentially, takes the route controller function as an argument and returns an async function that runs the controller function in a try-catch block
- In middleware folder, create a file called async.js
- File: middleware/async.js
  - Create and export an asyncWrapper middleware function
  - How this asyncWrapper middleware function works is this:
    - It runs inside the Express `router.route` methods. So it has access to the `req` and `res` objects and the `next` method
    - This asyncWrapper wraps around the route controller. So it takes a function, which is a controller, as an argument. The controller is an async function, so it returns a promise
    - The asyncWrapper middleware returns an async function with try-catch block. This returned async function runs the controller function in a try-block and catches the error in a catch-block and passes it to the next errorHandler middleware. The controller function takes `req, res, next` as arguments, which the asyncWrapper middleware has access from Express and passes them down to it
    - The main task of the asyncWrapper middleware is to run the route controller function in a try-catch block and passes any errors to the next errorHandler middleware
    - 
  ```js
  // takes a function (the controller) as an argument
  // this function returns an async function with try-catch block
  const asyncWrapper = (fn) => {
    // asyncWrapper has access to req, res, and next from Express
    return async (req, res, next) => {
      // since the returned funct is an async funct, we use a try-catch block
      try { 
        // execute the controller function with the provided req, res, next as args
        // add the await keyword in front because the controller is an async function
        await fn(req, res, next);
      } catch (error) {
        // if error occurs, pass the error to the next errorHandler middleware
        next(error);
      }
    };
  };

  module.exports = asyncWrapper;
  ```
- File: controllers/tasks.js
  - Import the asyncWrapper middleware function
  - For each of the route controller, wrap the entire controller function inside the asyncWrapper middleware. Then remove the try-catch block in the controller because the asyncWrapper is now handling the try-catch block
  - Still mark the controller as an async function because querying the database is still an async operation. And the controller still has access to the req and res objects
  ```js
  const asyncWrapper = require('../middleware/async');

  // The asyncWrapper middleware is invoked inside the 
  // Express router.route.get() .post() etc. methods

  // The asyncWrapper middleware is expecting a function as an argument
  // Wrap the entire controller inside the asyncWrapper middleware
  // Then remove the try-catch block. This being handled in the asyncWrapper middleware
  const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  });
  ```

### [18. Creating custom error-handling middleware](https://github.com/sungnga/practice/commit/3e5a25159aefa445db9b38981d8296b8bbabea9d?ts=2)
- Express has a default built-in error handler, but we want to create our own custom error-handling middleware
- In middleware folder, create a file called error-handler.js
- File: middleware/error-handler.js
  - Write and export the errorHandlerMiddleware
  ```js
  // this middleware has access to these four params
  const errorHandlerMiddleware = (err, req, res, next) => {
    // return res.status(500).json({ msg: err }); //system-generated error message
    return res.status(500).json({ msg: `Something went wrong, try again later` }); //custom error message
  };

  module.exports = errorHandlerMiddleware;
  ```
- File: app.js
  - Import the errorHandlerMiddleware module
  - Call the `app.use()` method and pass in the middleware as an argument to use the middleware
  ```js
  const errorHandlerMiddleware = require('./middleware/error-handler');

  app.use(errorHandlerMiddleware);
  ```
- Testing the error handler middleware in POSTMAN
  - Try to make a POST request without providing a value to the name property
  - We should see a 500 status code of Internal Server Error with the custom error message

### [19. Creating custom Error class](https://github.com/sungnga/practice/commit/b174223259b556a95fe2c7cbc29c1b2d16d85dc7?ts=2)
- What we want to do next is to create a custom Error class by extending from the Javascript built-in Error class. This way we get to use our own properties and methods when we instantiate a new error object in the controllers. We use this custom Error class to handle the 404 error response
- At the root of the project directory, create a folder called errors
- File: errors/custom-error.js
  - Create a CustomAPIError class by extending from the Javascript built-in Error class
  - Create a createCustomError function that creates a new instance from the CustomAPIError class
  - Export both the CustomAPIError class and the createCustomError function
  ```js
  class CustomAPIError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  // a function that creates a new instance from CustomAPIError class
  const createCustomError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode);
  };

  module.exports = { CustomAPIError, createCustomError };
  ```
- File: controllers/tasks.js
  - Import the createCustomError function
  - Let's start with the `getTask` controller. If no task exists, we want to return and call the `next()` method. Then we want to call the createCustomError() method to create a new error instance. And we need to pass in the message and statusCode
  - Do the same thing for the `updateTask` and `deleteTask` controllers, if no task exists
  ```js
  const { createCustomError } = require('../errors/custom-error');

  const getTask = asyncWrapper(async (req, res, next) => {
    // get the id out of req.params
    // destructure the id and give it a new alias
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    // if this task id not found
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404));
    }

    res.status(200).json({ task });
  });
  ```
- File: middleware/error-handler.js
  - Name import the CustomAPIError class
  - Write an if statement to check if the `err` object is an instance of the CustomAPIError class. If it is, return the statusCode from err.statusCode and the message from err.message
  - Then return a default error statusCode of 500 and a custom message
  ```js
  const { CustomAPIError } = require('../errors/custom-error');

  // this middleware has access to these four params
  const errorHandlerMiddleware = (err, req, res, next) => {
    // check if err is instance of CustomAPIError
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message });
    }

    // return res.status(500).json({ msg: err }); //system-generated error message

    // default statusCode and error message
    return res
      .status(500)
      .json({ msg: `Something went wrong, please try again` }); //custom error message
  };

  module.exports = errorHandlerMiddleware;
  ```

### [20. Setting PORT variable](https://github.com/sungnga/practice/commit/8e27a21f6d72bdd6fcfbd9141e7609d18460fa27?ts=2)
- It is okay to hardcode a port value (i.e port 3000) when working in local environment. However, when we deploy our application to a third-party platform, they may want to set their own port value. To make this possible, we want to use whatever port that is available in `process.env.PORT` and also setup an or operator in case it is undefined
- File: app.js
  ```js
  // use port value set in process.env
  // if not available, use port 3000
  const port = process.env.PORT || 3000;
  ```