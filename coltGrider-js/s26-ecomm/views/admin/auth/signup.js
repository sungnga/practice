const layout = require('../layout');
const { getError } = require('../../helpers');

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