const express = require('express');
const router = express.Router();
const BudgetController = require('../controllers/BudgetController');
const BudgetService = require('../services/BudgetService');
const BudgetRepository = require('../repositories/BudgetRepository');
const { validateBudgetStore } = require('../http/requests/BudgetStoreRequest');

const budgetRepository = new BudgetRepository();
const budgetService = new BudgetService(budgetRepository);
const budgetController = new BudgetController(budgetService);

router.get('/', async (req, res) => {
    await budgetController.getAllBudgetsFromUser(req, res);
});

router.post('/create', async (req, res) => {
    try {
        validateBudgetStore(req.body);
        await budgetController.createBudget(req, res);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;