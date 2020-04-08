const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth')

// app describes all the things our web server can do
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(cookieSession({
    keys: ['ldkjflksajdfierwjdsalfj']
}));
app.use(authRouter);

app.listen(3000, () => {
    console.log('Listening');
});



// **********************
// PROJECT STRUCTURE
// **********************
// ROUTES
// -> admin/auth.js
// -> admin/products.js
// -> products.js
// -> cart.js

// REPOSITORIES
// -> users.js
// -> products.js

// VIEWS
// -> various