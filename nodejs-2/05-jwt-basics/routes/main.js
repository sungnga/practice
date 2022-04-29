const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');
const authMiddleware = require('../middleware/auth');

// a secured dashboard route
// first goes through authMiddleware then dashboard controller
router.route('/dashboard').get(authMiddleware, dashboard);

// a public route
// client must provide username and password
router.route('/login').post(login);

module.exports = router;
