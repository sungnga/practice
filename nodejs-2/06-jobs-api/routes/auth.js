const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

// the base route is '/api/v1/auth' and was setup in app.js file
router.post('/register', register);
router.post('/login', login);

module.exports = router;
