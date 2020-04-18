const express = require('express');
const multer = require('multer');

const { handleErrors } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');

const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// First look in the products repository, find all the products there, render them with the template, then send the results back down to the user
router.get('/admin/products', async (req, res) => {
    // Access to products in repo
    const products = await productsRepo.getAll();
    // Call the template function and send it back to user
    res.send(productsIndexTemplate({ products }));
});

// Route handler to retrieve the form
// Whenever a user make a get request to /admin/products/new, we show the product template
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

// Router handler that deals with form submission
// 2nd arg is a middleware that is responsible for uploading an image
// IMPORTANT NOTE: run the multer middleware first as 2nd arg before running the validator middleware as 3rd arg. This way, the validator has access to title and price and check for errors
// 3nd arg is all the validators we want to run
router.post('/admin/products/new', upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async (req, res) => {
    // // Where we get information from our form
    // console.log(req.body);

    // req.file is an object that has all different properties about the file that was uploaded. The raw image data is stored in the .buffer property. Encode this data to a base-64 string using toString() method. It can safely represent an image in a string format. This string is then can be saved inside the products.json file
    // NOTE: this is not recommended for a production application
    const image = req.file.buffer.toString('base64');

    // Get acess to title and price
    const { title, price } = req.body;

    // To create a new product with the properties we want to save to products.json file. create() method takes in attributes
    await productsRepo.create({ title, price, image });

    res.send('submitted');
});

module.exports = router;