const { validationResult } = require('express-validator');

module.exports = {
    // Customize this middleware for every route handlers. We want to throw in the template function each time. That's why we're returning a function, because we want to customize the middleware
    // dataCb is an optional argument
    handleErrors(templateFunc, dataCb) {
        // Return a middleware function
        return async (req, res, next) => {
            const errors = validationResult(req);
 
            if (!errors.isEmpty()) {
                // Define the data variable outide of the if statement scope so we have access it
                // data has the product key and value
                // Default the value to an empty object to prevent from spreading 'undefined' values if we don't have a dataCb
                let data = {}; 
                // If dataCb is passed in
                if (dataCb) {
                    // Call it and store the data that is returned to data variable
                    data = await dataCb(req);
                }

                // Invoke templateFunc() that's passed in as an argument
                // Take whatever key/value that is inside the data object and merge it with the existing one
                return res.send(templateFunc({ errors, ...data }));
            }

            // next() is only called if there's no errors
            next();
        }
    },
    // No customization required
    // req = userId property. If not defined, we want to redirect user to signin route
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        }
        // next() function means everything inside our middleware went thru correctly and continue on
        next();
    }
};