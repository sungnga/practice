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
  - Right after checking the isPasswordCorrect, write an if statement to check if user.isVerified. If not, throw 401 Unauthorized custom error 
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

- [] re-watch project 08
- [] ethereal credentials (create account/login)
- [] install nodemailer
- [] create (nodemailerConfig, sendEmail,
  sendResetPasswordEmail, sendVerficationEmail) files in utils

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
