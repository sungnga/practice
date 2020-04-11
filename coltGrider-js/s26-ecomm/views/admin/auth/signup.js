const layout = require('../layout');

// A helper function to handle the errors message
const getError = (errors, prop) => {
    // prop === 'email' || 'password' || 'passwordConfirmation'
    try {
        return errors.mapped()[prop].msg;
        // errors.mapped() === {
        //     email: {
        //         msg: 'Invalid Email'
        //     },
        //     password: {
        //         msg: 'Password too short'
        //     },
        //     passwordConfirmation: {
        //         msg: 'Password must match'
        //     }
        // }
    } catch {
        return '';
    }
}

// Destructure the req object to pass in req properties from
module.exports = ({ req, errors }) => {
    return layout({
        content: `
        <div>
            Your id is: ${req.session.userId}
            <form method="POST">
                <input name="email" placeholder="email" />
                ${getError(errors, 'email')}
                <input name="password" placeholder="password" />
                ${getError(errors, 'password')}
                <input name="passwordConfirmation" placeholder="password confirmation" />
                ${getError(errors, 'passwordConfirmation')}
                <button>Sign Up</button>
            </form>
        </div>
    `
    });
};