const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// First look in the products repository, find all the products there, render them with the template, then send the results back down to the user
// NOTE: We don't want to invoke requireAuth right away. We want to provide the function to this route handler, and it can call the function at some future point in time with the req, res, next functs
router.get('/admin/products', requireAuth, async (req, res) => {


    // Access to products in repo
    const products = await productsRepo.getAll();
    // Call the template function and send it back to user
    res.send(productsIndexTemplate({ products }));
});

// Route handler to retrieve the form
// Whenever a user make a get request to /admin/products/new, we show the product template
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({}));
});

// Router handler that deals with form submission
// 2nd arg requireAuth: check to make sure the user is signed in before the image uploading process
// 3rd arg is a middleware that is responsible for uploading an image
// IMPORTANT NOTE: run the multer middleware first as 3rd arg before running the validator middleware as 4th arg. This way, the validator has access to title and price and check for errors
// 4th arg is all the validators we want to run
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

    // Redirect the url to products page once a new product is successfully created. The browser will initiate a new GET request and fetch that new endpoint
    res.redirect('/admin/products');
});

// User can access this edit form only if they are signed in
router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    // This will capture whatever is inside the :id of url
    // console.log(req.params.id);

    // Retrieve a product from products repository with a given id
    const product = await productsRepo.getOne(req.params.id);

    // If we didn't not find the product, return early
    if (!product) {
        return res.send('Product not found');
    }

    // Render the template
    res.send(productsEditTemplate({ product }));
})

// Route handler to receive the submission of the edit form
router.post('/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requireTitle, requirePrice],
    // If something goes wrong with validations, we're going to invoke the callback function
    handleErrors(productsEditTemplate, async (req) => {
        const product = await productsRepo.getOne(req.params.id);
        return { product };
    }),
    async (req, res) => {
        // The changes/updates we're getting from edit form
        const changes = req.body;

        // Check to see if the user provides an image file in this request
        if (req.file) {
            // .image is the new image
            // req.file is the file that's uploaded
            // buffer is an array-like with all the raw data
            // toString() take the data and encoded to base-64 string
            changes.image = req.file.buffer.toString('base64');
        }

        // Apply this update to the repository
        // req.params.id is the product id
        // changes is all the changes we want to update
        // Use try/catch to handle the errors for update() function
        try {
            await productsRepo.update(req.params.id, changes);
        } catch (err) {
            return res.send('Could not find item');
        }

        // If product is successfully updated, redirect user to products page
        res.redirect('/admin/products');
    }
);

module.exports = router;