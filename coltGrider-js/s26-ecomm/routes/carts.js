const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');


const router = express.Router();

// Receive a POST request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    // Print out the product id. productId is the value of name attribute in html form element
    //console.log(req.body.productId);

    // Figure out the cart! Do we have a cart or not? Do we need to make one or retrieve one out of cart repo?
    let cart;
    if (!req.session.cartId) {
        // We don't have a cart, we need to create one, and store the cart id on the req.session.cartId property
        cart = await cartsRepo.create({ items: [] });
        // Associate this new cart (the id) with whoever just made this request
        req.session.cartId = cart.id;
    } else {
        // We have a cart! Lets get it from the cart repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    console.log(cart);

    // Either increment quantity for existing product
    // OR add new product to items array
    // Look in the cart items array and iterate thru the items using find() method until the item id matches with the product id. Returns true or false
    const existingItem = cart.items.find(item => item.id === req.body.productId);
    if (existingItem) {
        // increment quanity and save cart
        existingItem.quantity++;
    } else {
        // add new product id to items array
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }

    // Update the cart repo with a cart id and the items array
    await cartsRepo.update(cart.id, {
        items: cart.items
    })

    res.send('Product added to cart');
});

// Receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
    // If there's no cardId tied to this user who visits the route '/cart', redirect user to root route
    if (!req.session.cartId) {
        return res.redirect('/');
    }

    // Fetch the cart in cart repo
    const cart = await cartsRepo.getOne(req.session.cartId);

    // Iterate through the items in the cart
    for (let item of cart.items) {
        // item === {id: , quantity:}
        // Retrieve the product details with the matching item id
        const product = await productsRepo.getOne(item.id)
        // Add product property to item
        item.product = product;
    }
    res.send(cartShowTemplate({ items: cart.items }));
});

// Receive a POST request to delete an item from a cart

module.exports = router;