const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const TransactionService = require('../services/TransactionService');
const TransactionRepository = require('../repositories/TransactionRepository');
const { validateTransactionStore } = require('../http/requests/TransactionStoreRequest');

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

router.get('/', async (req, res) => {
    await transactionController.getAllTransactionsFromUser(req, res);
});

router.get('/api/search', async (req, res) => {
    await transactionController.searchAndFilter(req, res);
});

router.post('/create', async (req, res) => {
    try {
        validateTransactionStore(req.body);
        await transactionController.createTransaction(req, res);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;