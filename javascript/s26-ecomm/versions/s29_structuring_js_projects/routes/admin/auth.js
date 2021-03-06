const express = require('express');
// Destructuring the check function from express-validator middleware
const { check, validationResult } = require('express-validator');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');
const { requireEmail, requirePassword, requirePasswordConfirmation, requireEmailExists, requireValidPasswordForUser } = require('./validators');

// It's like an app object that keeps track of all route handlers that we setup. The only difference is with this router, we can link it back up to our app inside index.js file
const router = express.Router();

// ROUTE HANDLER
// Replace app with router
router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
}); 

router.post(
    '/signup',
    [requireEmail, requirePassword, requirePasswordConfirmation], async (req, res) => {
        // req.body contains the object with properties from form element above
        console.log(req.body);
        const errors = validationResult(req); 
        
        // The .isEmpty() is going to be true if nothing went wrong. We want to check the opposite
        // Return early and send back the signupTemplate() and print the errors property
        if (!errors.isEmpty()) {
            return res.send(signupTemplate({ req, errors }));
        }

        const { email, password, passwordConfirmation } = req.body;

        // Create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password });
    
        // Store the id of that user inside the users cookie
        // The additional property that gets added in to the req object is the session property. Added by the cookie session library
        // The session property is an object and any information inside there will be maintained by the cookie session
        req.session.userId = user.id;

        res.send('Account created!!!!');
    }
); 

router.get('/signout', (req, res) => {
    // Clear out all the information stored in the cookie session
    req.session = null;
    res.send('You are logged out')
})

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
})

router.post(
    '/signin',
    [requireEmailExists, requireValidPasswordForUser],
    async (req, res) => {
        // The validationResult() from express-validator takes in a request and give us back error object
        const errors = validationResult(req);

        // If that errors is not empty, send back the same form with that error object
        if (!errors.isEmpty()) {
            return res.send(signinTemplate({ req, errors }));
        }
        // All of the form data is contained inside the req.body property
        // Destructure out the email and password cuz those are the names we use in input elements
        const { email } = req.body;

        // Use getOneBy() when we want to seach by a given criteria
        // Search a user with email provided
        const user = await usersRepo.getOneBy({ email });

        // This here is what makes a user be authenticated with our app
        // Set the session userId to the id of the user we just retrieved from our database
        req.session.userId = user.id;

        res.send('You are signed in!!!')
    }
);

module.exports = router;
