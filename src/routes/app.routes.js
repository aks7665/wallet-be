const express = require('express');
const router = express.Router();

const transactionController = require('../controllers/transaction.controller');

// Transaction Routes
router.post('/transactions', transactionController.add_transaction);
router.get('/transactions', transactionController.fetch_all_transactions);

module.exports = router;
