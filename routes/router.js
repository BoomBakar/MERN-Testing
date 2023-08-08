const express =  require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
//const Customer = require('../models/customers');

router.get('/', customerController.home);

router.post('/register', customerController.register);

router.post('/login', customerController.login);

router.get('/customers', customerController.customers);

router.post('/purchase/:email', customerController.purchase);

module.exports = router;