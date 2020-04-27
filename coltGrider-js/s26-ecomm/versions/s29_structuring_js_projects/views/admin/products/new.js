const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    // layout() is a function that takes content property
    // html form is inside a string
    return layout({
        content: `
            <form method="POST">
                <input placeholder="Title" name="title" />
                <input placeholder="Price" name="price" />
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    })
};