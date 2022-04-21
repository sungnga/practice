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
- **Things that are already included in this project:**
  - Express server has been setup
  - We're using the express-async-errors package to setup our async error middleware. We have notFoundMiddleware and errorHandlerMiddleware already created to handle request errors
  - All the static files in the public folder is served using express app
  - Setup port to either listen to process.env.PORT or port 3000


