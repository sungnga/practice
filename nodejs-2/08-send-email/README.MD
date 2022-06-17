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

### [02. Send emails with Ethereal]()
- To test out the send email functionality during development, we will send it with Ethereal. It's a fake transporter service used with Nodemailer module during development. We will use a different transport service called SendGrid in production
- **Nodemailer package:**
  - The Nodemailer is a module for Node.js applications that does all the heavy lifting when it comes to email sending
  - Install: `npm i nodemailer`
- **Ethereal:**
  - Ethereal is a fake SMTP service (transport service) used with Nodemailer during testing and development. Generate a vanity email account from Nodemailer, send an email using that account, and preview the sent message with Ethereal as no emails are actually delivered
  - Docs: https://ethereal.email
  - Click on the "Create Ethereal Account" button to create a new Ethereal test account
    - We get the account credentials: the name, username, and password
    - Can create as many accounts as we want, so we don't need to remember these credentials
    - These credentials can be kept in a .env file when we setup the Nodemailer configuration. But we won't do this in this short project
- **Implementing the sendEmail controller:**
-  File: controllers/sendEmail.js
  - Import the nodemailer module
  - Setup the nodemailer configuration. The values for the credentials came from when we generated the Ethereal test account. This gives us the `transporter` object
  - Then call transporter.sendMail() method to send email. Pass in an object that contains the from, to, subject, and html body properties
  ```js
  const nodemailer = require('nodemailer');

  const sendEmail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    // nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'nathan.zieme@ethereal.email',
        pass: 'u9WzQZ495H9NdxKcnU'
      }
    });

    let info = await transporter.sendMail({
      from: '"Nga", <nga@example.com>',
      to: 'bar@example.com',
      subject: 'Hello',
      html: '<h2>Sending Emails with Node.js</h2>'
    });

    res.json(info);
  };

  module.exports = sendEmail;
  ```
- **Testing the sendEmail functionality:**
  - Navigate to http://localhost:3000/ in the browser and click on the "Send email" button
  - This will trigger the sendEmail controller function
  - If successful, we should get back the send email info displayed on the page
  - Head to https://ethereal.email dashboard page and click on "Open MailBox" button. Should see the sent email
