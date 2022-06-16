## SECTION 8: SEND EMAIL
- Folder directory: /08-send-email/

### Goals of this project
- Learn how to setup controller to send emil

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/08-send-email/starter
- cd into project directory: `cd 08-send-email`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- Run `npm install` to install the nodemon, express, dotenv, express-async-errors, http-status-codes,jsonwebtoken, helmet, cors, express-rate-limit, rate-limiter, and nodemailer libraries. This will also generate the package-lock.json file
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file
- **Setup basic sendEmail controller:**
-  File: controllers/sendEmail.js
  ```js
  const sendEmail = async (req, res) => {
    res.send('Send email functionality');
  };

  module.exports = sendEmail;
  ```
- **Setup sendEmail route:**
- File: app.js
  - Import the sendEmail controller
  ```js
  const sendEmail = require('./controllers/sendEmail');

  app.get('/send', sendEmail);
  ```
