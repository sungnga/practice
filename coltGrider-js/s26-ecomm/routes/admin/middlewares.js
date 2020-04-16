const { validationResult } = require('express-validator');

module.exports = {
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
    }
}