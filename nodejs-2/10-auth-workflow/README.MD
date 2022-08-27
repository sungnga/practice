## SECTION 10: AUTH-WORKFLOW
- Folder directory: /10-auth-workflow/

### Goals of this project
- Learn how to validate emails. Verify registered emails
- Create refresh tokens
- Set up a reset password functionality
- Using Ethereal for managing emails
- Practice adding features and functionalities to large existing projects. The existing project is the last 09-eCommerce-api project

### [01. Initialize project with starter files]()
- Get starter project files from https://github.com/john-smilga/node-express-course/tree/main/11-auth-workflow/starter
- cd into project directory: `cd 10-auth-workflow`
- Run `rm -rf .git` to avoid any issues if pushing to your own github repo
- cd into the server directory and run: `npm install` to install the packages. This will also generate the package-lock.json file
- Create a `.gitignore` file. Add these files to the list: package-lock.json, /node_modules, and .env
- Create a `.env` file. Then copy and paste the all the env vars from the last 09-eCommerce-api project. For the `MONGO_URL` variable, change the project name to `10-auth-workflow`
- Then run the script `npm start` to start up the project. This will run nodemon on app.js file

### [02. Refactor register controller]()
#### Update User model
- [X] add following three properties
- [X] verificationToken - String
- [X] isVerified - {type:Boolean, default:false}
- [X] verified - Date
#### Update register controller
- [X] setup fake verificationToken - 'fake token'
- [X] remove everything after User.create()
- [X] send back success message and token
- We're going to change the functionality of register controller a little bit. After we created a user instance we don't want to send back the user JWT and attach the cookies response. Instead, we want to send back a success message and a verificationToken for the user to verify their email. For now, we going to setup a 'fakeToken' for verificationToken
- File: server/models/User.js
  - Update the UserSchema model with three additional properties: verificationToken, isVerified, and verified
  ```js
  {
    verificationToken: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    verified: Date
  }
  ```
- File: server/controllers/authController.js
  - We're modifying this existing register controller. We won't create user token and we won't attach cookies to response in this controller. 
  - Before creating a user instance, create a verificationToken variable and assign it to 'fake token' string
  - When creating a user instance, we also want to pass in the verificationToken property
  - Send back the status code, a success message, and the verificationToken
  ```js
  const User = require('../models/User');
  const { StatusCodes } = require('http-status-codes');
  const CustomError = require('../errors');
  const { attachCookiesToResponse, createTokenUser } = require('../utils');

  const register = async (req, res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new CustomError.BadRequestError('Email already exists');
    }

    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const verificationToken = 'fake token';

    const user = await User.create({
      name,
      email,
      password,
      role,
      verificationToken
    });

    // send verification token back only while testing in Postman
    res.status(StatusCodes.CREATED).json({
      msg: 'Success! Please check your email to verify account',
      verificationToken: user.verificationToken
    });
  };
  ``` 
- **Setup auth routes in Postman:**
  - Create a new collection and call it 'Node.js - 10-Auth-Workflow'
  - In this collection, create an 'Auth' folder. Create the following auth routes in this folder:
    - Register user - a POST request to: {{URL}}/auth/register
    - Login user - a POST request to: {{URL}}/auth/login
    - Logout user - a GET request to: {{URL}}/auth/logout
- **Testing register controller using Postman:**
  - Make a POST request to 'Register user' route: {{URL}}/auth/register
    - Provide the user information in the Body tab
      ```js
      {
        "name": "anna",
        "email": "anna@example.com",
        "password": "secret"
      }
      ```
  - If the register controller is setup correctly, we should get back a '201 Created' status code, a success message, and the verificationToken value
    ```js
    {
      "msg": "Success! Please check your email to verify account",
      "verificationToken": "fake token"
    }
    ```
  - In our MongoDB database, a user document has been created in the users collection

### [03. Update the login controller]()
- [X] right after isPasswordCorrect
- [X] check if user.isVerified, if not 401
- The login controller sends back the user token in cookies response. So we want to restrict access to this route unless the user isVerified
- File: server/controllers/authController.js
  - In the login controller and right after checking the isPasswordCorrect, write an if statement to check if user.isVerified. If not, throw 401 Unauthorized custom error 
  ```js
  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError('Please verify your email');
  }
  ```
- **Testing the login controller using Postman:**
  - Make a POST request to the 'Login user' route: {{URL}}/auth/login
  - Provide the user email and password info in the Body tab
    ```js
    {
      "email": "anna@example.com",
      "password": "secret"
    }
    ```
  - We should get back an error of '401 Unauthorized' and an error message, because by default, we have set the isVerified property on the user object to false

### [04. Create proper verification token]()
- Right now our `verificationToken` property is just a hardcoded string. What we want is once a user registered to our application, we want to generate a verificationToken for this user. It's a unique id assigned to this user in order to verify their email, which is the next step. There are many options out there to generate a unique id, but Node.js has a built-in library called `crypto` that we can use to generate the unique id
- File: server/controllers/authController.js
  - Import the crypto library
  - In the register controller, generate the unique id using crypto and assign the value to the verificationToken variable
  - Calling .randomBytes(40) method on crypto will generate random bytes in 40 chars. Then we need to set it to hex, where each byte is going to be encoded as two hexadecimal chars. And lastly, convert it into string value
  ```js
  const crypto = require('crypto');

  const verificationToken = crypto.randomBytes(40).toString('hex');
  ```
- **Testing verification token in Postman:**
  - To generate the verificationToken for a user, let's register a new user
  - Make a POST request to 'Register user' route: {{URL}}/auth/login
  - Provide the user email and password info in the Body tab
    ```js
    {
      "email": "anna@example.com",
      "password": "secret"
    }
    ```
  - If the verificationToken is setup correctly, we should get this back:
    ```js
    {
      "msg": "Success! Please check your email to verify account",
      "verificationToken": "26d09e2e96659dba4c72e79ff138fbf9f0d3ed7ea8162375cc3cb46d4ec82788ad686f05f4787e7c"
    }
    ```

### [05. Setup verifyEmail controller and route]()
- [X] create verifyEmail in authController
- [X] get verificationToken and email from req.body
- [X] setup a '/verify-email' route in authRoutes
- [X] test in a Postman
- [X] check for user using email
- [X] if no user 401
- [X] if token does not match user token 401
- [X] if correct set
- [X] user.isVerified = true
- [X] user.verified = Date.now()
- [X] user.verificationToken = ''
- [X] save use with instance method
- [X] return msg:'email verified'
- File: server/controllers/authController.js
  - Create and export a verifyEmail controller
    - This route should receive the user email and verificationToken in req.body
    - Find the user by their email in the 'users' collection in DB
    - If no such user, throw an error
    - If the user's verificationToken in DB does not match with the provided verificationToken, throw an error
    - If both conditions are met, then set the user instance properties
    - Call user.save() to update the user info in DB
    - Send back a success message 
  ```js
  const verifyEmail = async (req, res) => {
    const { verificationToken, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError.UnauthenticatedError('Verification failed');
    }

    if (user.verificationToken !== verificationToken) {
      throw new CustomError.UnauthenticatedError('Verification failed');
    }

    // if verify email successful, set the user instance
    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = verificationToken;

    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Email verified' });
  };
  ```
- File: server/routes/authRoutes.js
  - Import the verifyEmail controller
  - Setup a post route for the verifyEmail controller. The route path is `/verify-email`
  ```js
  const { verifyEmail } = require('../controllers/authController');

  router.post('/verify-email', verifyEmail);
  ```
- **Setup a verify email route in Postman:**
  - In the Auth folder, create a 'Verify email' route:
    - Verify email - a POST request to: {{URL}}/auth/verify-email
- **Testing verifyEmail controller using Postman:**
  - First, make sure to register a user. Once they're successfully registered, a verificationToken is generated for them
    ```js
    {
      "msg": "Success! Please check your email to verify account",
      "verificationToken": "8f2e051129fce5a590b757587239d496dc75ddeaf9fbabd96baf3aee559cce93e3ad788181224487"
    }
    ```
  - Then make a POST request to the 'Verify email' route: {{URL}}/auth/verify-email
  - Provide the user email and verificationToken values in the Body tab
    ```js
    {
      "email": "david@example.com",
      "verificationToken": "8f2e051129fce5a590b757587239d496dc75ddeaf9fbabd96baf3aee559cce93e3ad788181224487"
    }
    ```
  - If the verifyEmail controller is setup correctly, we should get this message:
    ```js
    {
      "msg": "Email verified"
    }
    ```
  - Now that the email has been verified, try to login this user in the 'Login user' route
    ```js
    {
      "email": "david@example.com",
      "password": "secret"
    }
    ```
  - Because their email has been verified, they should be able to login
    ```js
    {
      "user": {
        "name": "david",
        "userId": "6301c8a41c828a1dbec761d9",
        "role": "user"
      }
    }
    ```

### [06. Setup send email using Ethereal]()
- [X] review project 08-send-email on sending emails
- [X] ethereal credentials (create account/login)
- [X] install nodemailer
- [X] create (nodemailerConfig, sendEmail,
  sendResetPasswordEmail, sendVerificationEmail) files in utils
- **Send emails with Ethereal:**
  - To test out the send email functionality during development, we will send it with Ethereal. It's a fake transporter service used with Nodemailer module during development. We will use a different transport service called SendGrid in production
- **Nodemailer package:**
  - The Nodemailer is a module for Node.js applications that does all the heavy lifting when it comes to email sending
  - Docs: https://nodemailer.com/about/
  - Install: `npm i nodemailer`
- **Ethereal:**
  - Ethereal is a fake SMTP service (transport service) used with Nodemailer during testing and development. Generate a vanity email account from Nodemailer, send an email using that account, and preview the sent message with Ethereal as no emails are actually delivered
  - Docs: https://ethereal.email
  - Click on the "Create Ethereal Account" button to create a new Ethereal test account
    - We get the account credentials: the name, username, and password
    - Can create as many accounts as we want, so we don't need to remember these credentials
    - These credentials can be kept in a .env file when we setup the Nodemailer configuration
- In the utils folder, create the following files: nodemailerConfig.js, sendEmail.js,
  sendResetPasswordEmail.js, sendVerificationEmail.js
- **Setup initial sendEmail functionality:**
  - File: server/utils/sendEmail.js
    - Import the nodemailer module
    - Write and export a sendEmail function that sends emails with Ethereal
    - Setup the nodemailer configuration. The values for the credentials came from when we created the Ethereal test account (when we click on the 'Create Ethereal Account' button). So under the 'Nodemailer configuration' section, copy the entire `const transporter` object and paste it in our sendEmail function. This gives us the `transporter` object
    - Then call transporter.sendMail() method to send email. Pass in an object that contains the from, to, subject, and html body properties
    ```js
    const nodemailer = require('nodemailer');

    const sendEmail = async () => {
      let testAccount = await nodemailer.createTestAccount();

      // this came from ethereal.email webpage
      // when we Create Ethereal Account
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'hayden.gottlieb38@ethereal.email',
          pass: 'FZPMc6ehrP4vu2KeKY'
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"john" <john@example.com>', // sender address
        to: 'nga@example.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Testing email', // plain text body
        html: '<b>Testing email?</b>' // html body
      });
    };

    module.exports = sendEmail;
    ```
  - File: server/controllers/authController.js
    - Import the sendEmail module
    - Right after creating a new user, invoke the sendEmail function to send email. This is an async operation, so add an await keyword in front of it
    ```js
    const sendEmail = require('../utils/sendEmail');

    const register = async (req, res) => {
      const { email, name, password } = req.body;

      const emailAlreadyExists = await User.findOne({ email });
      if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
      }

      // first registered user is an admin
      const isFirstAccount = (await User.countDocuments({})) === 0;
      const role = isFirstAccount ? 'admin' : 'user';

      const verificationToken = crypto.randomBytes(40).toString('hex');

      const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken
      });

      // send email
      await sendEmail();

      // send verification token back only while testing in Postman
      res.status(StatusCodes.CREATED).json({
        msg: 'Success! Please check your email to verify account'
      });
    };
    ```
- **Testing sendEmail functionality using Postman:**
  - Register a new user in the 'Register user' route
    - Notice that when we click on "Send" it takes a little longer before we get a response. That is because behind the scenes, the register controller is sending email and this is an async operation
    ```js
    {
      "name": "john",
      "email": "john@example.com",
      "password": "secret"
    }
    ```
    - If everything works out we should get back a success message to check email to verify account
  - Return to Ethereal's page: https://ethereal.email/create and click on the "Open Mailbox" button to view the email account. In here we should get an email that we sent using Postman
- **Testing sendEmail functionality using front-end:**
  - In the root project directory is a `front-end` folder. It's the front-end app built with create-react-app framework to allow us to test our back-end project. Let's try to register a user here
  - cd into the front-end directory and install the project packages: `npm install`
  - Then start the dev server: `npm start`
  - In the browser, navigate to the project homepage: http://localhost:3000/
  - Register a new user by clicking on the "Register" button. Enter the user information. If everything works out, we should get back a success message to check email to verify account
  - Go back to Ethereal account email page and we should see a new email has been sent

### [07. Send verification link]()
- [X] refactor sendEmail
- [X] setup sendVerificationEmail
- [X] pass arguments from register
- The sendEmail function sends the email using the nodemailer package. It takes in three params: to, subject, and html. This function will be used in the sendVerificationEmail function
- The sendVerificationEmail function contains the verifyEmail link (that takes to the verify-email route), the email message that tells the user to click on the verifyEmail link to verify their email, and lastly, calls the sendEmail() function
- The sendVerificationEmail function is used in the `register` controller. This controller is responsible for creating a new user and then sends the verification email to the user to verify their email
- **Refactor sendEmail function:**
  - Move the transport config object that's in the sendEmail function to a separate file
  - File:  server/utils/nodemailerConfig.js
    - Cut and paste the transport config object from the sendEmail function. Then we just need to export the object
    ```js
    // these values came from ethereal.email webpage
    // when we Create Ethereal Account
    module.exports = {
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'hayden.gottlieb38@ethereal.email',
        pass: 'FZPMc6ehrP4vu2KeKY'
      }
    };
    ```
  - Refactor the sendEmail function
  - File: server/utils/sendEmail.js
    - Import the nodemailerConfig object
    - The sendEmail function takes three args: to, subject, and html
    - Pass in the nodemailerConfig object to the .createTransport() function
    - Next, we will be using this sendEmail function multiple times in this project. Setup the sendEmail function to take three arguments: to, subject, and html. Set these arguments as an object, this way we don't have to worry about the order of the arguments that we pass in when we invoke it
    - In the transporter.sendMail() function, we just set the values that we get from the sendEmail function for the to, subject, and html properties here
    ```js
    const nodemailer = require('nodemailer');
    const nodemailerConfig = require('./nodemailerConfig');

    const sendEmail = async ({ to, subject, html }) => {
      let testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport(nodemailerConfig);

      // since sendEmail is an async funct, it'll return a promise
      // no need to use the await keyword here
      return transporter.sendMail({
        from: '"john" <john@example.com>', // sender address
        to,
        subject,
        html
      });
    };

    module.exports = sendEmail;
    ```
- **Setup sendVerificationEmail function:**
  - File: server/utils/sendVerificationEmail.js
    - Write and export an async sendVerificationEmail function that returns the sendEmail function. This function takes the following args: name, email, verificationToken, and origin. The origin is the URL to the front-end - where the user will navigate to once they click on the link from the verify email
    - Setup the verifyEmail link. The `verifyEmail` variable is a link in the verify email that the user clicks on. It'll take them to the 'verify-email' route and we provide the verificationToken and email information here as query params. The verifyEmail controller is looking for these two pieces of info
    - Setup the verify email message. The message contains the verifyEmail link
    - Return the sendEmail function. Note that the sendEmail function is an async function and it will return a promise. So we don't need to add the await keyword here. Since we're invoking the sendEmail function here, we need to provide the values for the three required arguments
    ```js
    const sendEmail = require('./sendEmail');

    // origin is the URL to the front-end
    const sendVerificationEmail = async ({
      name,
      email,
      verificationToken,
      origin
    }) => {
      const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

      const message = `<p>Please confirm your email by clicking on the following link: <a href="${verifyEmail}">Verify Email</a></p>`;

      // sendEmail function is an async function. It returns a promise
      return sendEmail({
        to: email,
        subject: 'Email Confirmation',
        html: `<h4>Hello, ${name}</h4>
        ${message}
        `
      });
    };

    module.export = sendVerificationEmail;
    ```
  - File: server/utils/index.js
    - Import and export the sendVerificationEmail function
    ```js
    const sendVerificationEmail = require('./sendVerificationEmail');

    module.exports = {
      createJWT,
      isTokenValid,
      attachCookiesToResponse,
      createTokenUser,
      checkPermissions,
      sendVerificationEmail
    };
    ```
- **Using sendVerificationEmail in register controller:**
  - File: server/controllers/authController.js
    - Import the sendVerificationEmail function from utils/index.js file
    - In the register controller:
      - Instead of calling the sendEmail() function here, we're going to call the sendVerificationEmail() function. The sendVerificationEmail function returns the sendEmail function
      - Right after creating a user, call the sendVerificationEmail() function. This is an async function so add the await keyword in front of it
      - Pass in the values for the four arguments: name, email, verificationToken, and origin. Once a new user instance has been created, we have access to the user information
      - Setup the origin link just above the sendVerificationEmail() function. The origin is the URL that the user navigates to when they click on the link in the verify email. While we're in dev mode, the URL is `http://localhost:3000`
    ```js
    const User = require('../models/User');
    const { StatusCodes } = require('http-status-codes');
    const CustomError = require('../errors');
    const { sendVerificationEmail } = require('../utils');
    const crypto = require('crypto');

    const register = async (req, res) => {
      const { email, name, password } = req.body;

      const emailAlreadyExists = await User.findOne({ email });
      if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already exists');
      }

      // first registered user is an admin
      const isFirstAccount = (await User.countDocuments({})) === 0;
      const role = isFirstAccount ? 'admin' : 'user';

      const verificationToken = crypto.randomBytes(40).toString('hex');

      const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken
      });
      const origin = 'http://localhost:3000';

      // send email
      await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
      });

      // send verification token back only while testing in Postman
      res.status(StatusCodes.CREATED).json({
        msg: 'Success! Please check your email to verify account'
      });
    };
    ```
- **Testing sendVerificationEmail on front-end:**
  - In the browser, navigate to: http://localhost:3000/register. Register a new user
  - Go to Ethereal dashboard and click on the "Open Mailbox" button to get to test account email. We should see an email sent for the new user. In the email, there should be a "Verify Email" link that we can click on
  - When we click on this link, it redirects user to the front-end route and specifically to the 'verify-email' route. Here we see that the user token and their email are passed as query params to the 'verify-email' route
    `http://localhost:3000/user/verify-email?token=6cbed2278dc4a0128be4767c286307b604318055ea11aa866d006ca2a9eb02f9c1eea49d7d412b25&email=jane@example.com`
  - The verifyEmail controller verifies the user token and email in the database. If it's successful, it updates the user's verified status to true in the database
  - On the front-end, once the email is verified, the user gets a display message that the account is confirmed; and a Login button to direct them to the login page

### [08. Setup Token model]()
- [X] create Token.js in models
- [X] refreshToken,ip,userAgent - all String and required
- [X] isValid - Boolean, default:true
- [X] ref user
- [X] timestamps true
- File: models/Token.js
  ```js
  const mongoose = require('mongoose');

  const TokenSchema = new mongoose.Schema(
    {
      refreshToken: { type: String, required: true },
      ip: { type: String, required: true },
      userAgent: { type: String, required: true },
      isValid: { type: Boolean, default: true },
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model('Token', TokenSchema);
  ```
















-------------------------------

### PROJECT CHECKLIST

#### Front End App
[Auth Workflow](https://react-node-user-workflow-front-end.netlify.app/)

#### Update User Model

- [] add following three properties
- [] verificationToken - String
- [] isVerified - {type:Boolean, default:false}
- [] verified - Date

#### Update Register Controller

- [] setup fake verificationToken - 'fake token'
- [] remove everything after User.create()
- [] send back success message and token

#### Update Login Controller

- [] right after isPasswordCorrect
- [] check if user.isVerified, if not 401

#### Verify Email Controller

- [] create verifyEmail in authController
- [] get verificationToken and email from req.body
- [] setup a '/verify-email' route in authRoutes
- [] test in a Postman
- [] check for user using email
- [] if no user 401
- [] if token does not match user token 401
- [] if correct set
- [] user.isVerified = true
- [] user.verified = Date.now()
- [] user.verificationToken = ''
- [] save use with instance method
- [] return msg:'email verified'

#### Email Setup

- [] review project 08-send-email
- [] ethereal credentials (create account/login)
- [] install nodemailer
- [] create (nodemailerConfig, sendEmail,
  sendResetPasswordEmail, sendVerificationEmail) files in utils

#### Send Verification Link

- [] refactor sendEmail
- [] setup sendVerificationEmail.js
- [] pass arguments

#### Token Model

- [] create Token.js in models
- [] refreshToken,ip,userAgent - all String and required
- [] isValid - Boolean, default:true
- [] ref user
- [] timestamps true

#### Setup Token in Login Controller

#### Send Multiple Cookies

#### Check for Existing Token

#### Refactor Auth Middleware - Access , Refresh Token

#### Logout

#### Forgot/Reset Password Functionality

- User Model
- passwordToken {type:String}
- passwordTokenExpirationDate {type:Date}
- authController
- forgotPassword and resetPassword
- authRoutes
- post '/forgot-password' '/reset-password'

#### Forgot Password Controller

#### Send Reset Password Email

#### Reset Password Controller

#### Hash Password Token
