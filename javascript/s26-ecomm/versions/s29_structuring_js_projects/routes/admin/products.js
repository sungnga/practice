const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

router.get('/admin/products', (req, res) => {
    
});

// Route handler to retrieve the form
// Whenever a user make a get request to /admin/products/new, we show the product template
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

// Router handler that deals with form submission
// 2nd arg is all the validators we want to run
router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
    // The validationResult() from express-validator takes in a request and give us back error object
    const errors = validationResult(req);
    console.log(errors);
    res.send('submitted');
});

module.exports = router;