const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    // layout() is a function that takes content property
    // html form is inside a string
    // If we don't give a method property to <form>, the default method is GET. The method property is how to share/transmit information to the backend server
    // Default value for enctype="application/x-www-form-urlencoded". A urlencoded means take the data from the form and bundle it into a url-safe string to be transmitted. However the urlencoded doesn't know what to do with the image file
    // with multipart/form-data, the input data is submitted bit by bit
    return layout({
        content: `
            <form method="POST" enctype="multipart/form-data">
                <input placeholder="Title" name="title" />
                ${getError(errors, 'title')}
                <input placeholder="Price" name="price" />
                ${getError(errors, 'price')}
                <input type="file" name="image" />
                <button>Submit</button>
            </form>
        `
    })
};