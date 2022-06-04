## SECTION 7: FILE UPLOAD
- Folder directory: /07-file-upload/

### Goals of this project
- Learn how to upload image file onto the server
- Use Express file upload library and Cloudinary to store images on the cloud
- A small front-end app that has a form to upload an image file (onto Cloudinary) and then display the image on the page
- Upload images using Postman

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/07-file-upload/starter
- cd into project directory: `cd 07-file-upload`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, mongoose, http-status-codes,jsonwebtoken, helmet, cors, express-rate-limit, rate-limiter express-fileupload, cloudinary, and joi libraries. This will also generate the package-lock.json file
- At the root of project directory, create a `.env` file
  - Add MONGO_URI variable and set it to the connect string from MongoDB. Get the connect string by going to the project dashboard in MongoDB and click on the "Connect" button and then select "Connect your application"
  - `MONGO_URI=<connect_string_from_mongoDB>`
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file