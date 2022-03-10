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
