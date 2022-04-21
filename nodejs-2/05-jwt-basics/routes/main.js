const express = require('express');
const router = express.Router();

const { login, dashboard } = require('../controllers/main');

router.route('/dashboard').get(dashboard);
// client must provide username and password
router.route('/login').post(login);

module.exports = router;
