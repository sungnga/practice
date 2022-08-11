const Order = require('../models/Order');
const Product = require('../models/Product');

const CustomError = require('../errors');
const { checkPermissions } = require('../utils/checkPermissions');
const { StatusCodes } = require('http-status-codes');

// a fake Stripe function that returns these values
const fakeStripeAPI = async ({ amount, currency }) => {
	const client_secret = 'someRandomValue';

	return { client_secret, amount };
};

const createOrder = async (req, res) => {
	const { items: cartItems, tax, shippingFee } = req.body;
	if (!cartItems || cartItems.length < 1) {
		throw new CustomError.BadRequestError('No cart items provided');
	}
	if (!tax || !shippingFee) {
		throw new CustomError.BadRequestError(
			'Please provide tax and shipping fee'
		);
	}

	// iterate over the cartItems array
	// for each item, check if the product exists in the products collection in DB
	let orderItems = [];
	let subtotal = 0;

	// we need to iterate over the products array, but this is an async operation
	// we cannot use await inside a 'for each' or 'map' function
	// but we can use await inside a 'for of' function
	for (const item of cartItems) {
		const dbProduct = await Product.findOne({ _id: item.product });
		if (!dbProduct) {
			throw new CustomError.NotFoundError(
				`No product with id: ${item.product}`
			);
		}

		// if the product exists in DB, destructure these properties
		const { name, price, image, _id } = dbProduct;
		// create single order item object
		// Note: this is creating the SingleOrderItemSchema instance
		const singleOrderItem = {
			amount: item.amount,
			name,
			price,
			image,
			product: _id
		};
		// add singleOrderItem object to orderItems array, using the spread operator
		orderItems = [...orderItems, singleOrderItem];
		// calculate subtotal. This adds on top of existing subtotal
		subtotal += item.amount * price;
	}

	// calculate total
	const total = tax + shippingFee + subtotal;
	// get client_secret from stripe
	const paymentIntent = await fakeStripeAPI({
		amount: total,
		currency: 'usd'
	});

	// only if successfully get back the client_secret, then create the order
	const order = await Order.create({
		orderItems,
		total,
		subtotal,
		tax,
		shippingFee,
		clientSecret: paymentIntent.client_secret,
		user: req.user.userId
	});

	res
		.status(StatusCodes.CREATED)
		.json({ order, clientSecret: order.clientSecret });
};

const getAllOrders = async (req, res) => {
	res.send('get all orders');
};

const getSingleOrder = async (req, res) => {
	res.send('get single order');
};

const getCurrentUserOrders = async (req, res) => {
	res.send('get current user orders');
};

const updateOrder = async (req, res) => {
	res.send('update order');
};

module.exports = {
	getAllOrders,
	getSingleOrder,
	getCurrentUserOrders,
	createOrder,
	updateOrder
};
