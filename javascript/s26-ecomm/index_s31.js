const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

// app describes all the things our web server can do
const app = express();

app.use(express.static('public'));
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(cookieSession({
    keys: ['ldkjflksajdfierwjdsalfj']
}));
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

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