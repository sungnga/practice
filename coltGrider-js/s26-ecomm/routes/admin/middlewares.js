const { validationResult } = require('express-validator');

module.exports = {
    // Customize this middleware for every route handlers. We want to throw in the template function each time. That's why we're returning a function, because we want to customize the middleware
    handleErrors(templateFunc) {
        // Return a middleware function
        return (req, res, next) => {
            const errors = validationResult(req);
 
            if (!errors.isEmpty()) {
                // Invoke templateFunc() that's passed in as an argument
                return res.send(templateFunc({ errors }));
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