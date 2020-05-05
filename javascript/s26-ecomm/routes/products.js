const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');

const router = express.Router();

// GET request to root route
router.get('/', async (req, res) => {
    // Get all products from repo, an array of products
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({products}));
});

module.exports = router;