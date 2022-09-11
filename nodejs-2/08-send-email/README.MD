## SECTION 8: SEND EMAIL
- Folder directory: /08-send-email/

### Goals of this project
- Learn how to setup controller to send emil

### [01. Initialize project with starter files](https://github.com/sungnga/practice/commit/c5ed921702ddcd0bd1ebeb8bd51a629c7d5c6165?ts=2)
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

### [02. Send emails with Ethereal](https://github.com/sungnga/practice/commit/2596dca3743db940b3b7f0aa189a7bfa15e8feb5?ts=2)
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

### [03. Send emails with SendGrid](https://github.com/sungnga/practice/commit/ac2cfe5bc20ee8c711e57498edc978ee5ecee936?ts=2)
- SendGrid is one of the most popular email providers for production
- **Sign up for SendGrid:**
  - Sign up for a SendGrid account
  - Setup a Sender Identity - an email address that SendGrid is going to use to send emails on our behalf
    - On the main account page, click on the "Send a Single Sender" button
    - Fill out the Create a Sender form. Make sure to provide an actual email address because it'll ask you to verify the sender
- **Setup Web API integration:**
  - On the main account page, select the Email API item in the main menu and select Integration Guide
  - Choose the Web API as a setup method
  - Chose Node.js as the language
  - In step 2, give the API Key a name and click on the "Create Key" button
  - Copy the API key to the clipboard as we will use it in our .env file
- **Create an environment variable:**
  - At the root of the project directory, create a .env file
  - Create an environment variable to store the SendGrid API key
  - File: .env
    ```js
    SENDGRID_API_KEY=<SendGrid_API_Key>
    ```
  - Restart the server
- **Install SendGrid package:**
  - Install: `npm i --save @sendgrid/mail`
- **Implementing the sendEmail controller:**
  - First, rename the current `sendEmail` controller to `sendEmailEthereal`
  - Then create another controller called sendEmail that sends email with SendGrid 
  -  File: controllers/sendEmail.js
    - Import the SendGrid module
    - Inside the sendEmail controller:
      - Setup the API key using the process.env
      - Create a message object that contains the to, from, subject, text, and html properties
      - Call the sgMail.send() method to send message object. This is an async operation, so add the await keyword in front of it. Assign the result that we get back to an `info` object
      - Lastly, this controller returns the `info` object in json format
      ```js
      const sgMail = require('@sendgrid/mail');

      // send email with SendGrid
      const sendEmail = async (req, res) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: 'nga@example.com', // Change to your recipient
          from: 'myEmail@example.com', // Change to your verified sender
          subject: 'Sending with SendGrid is Fun',
          text: 'and easy to do anywhere, even with Node.js',
          html: '<strong>and easy to do anywhere, even with Node.js</strong>'
        };
        const info = await sgMail.send(msg);
        res.json(info); // This is for testing purposes only
      };

      module.exports = sendEmail;
      ```

