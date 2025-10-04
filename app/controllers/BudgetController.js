class BudgetController {
    #budgetService;

    constructor(budgetService) {
        this.#budgetService = budgetService;
    }

    async createBudget(req, res) {
        try {
            const data = req.body;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(400).json({ error: 'User not found' });
            }

            const budget = await this.#budgetService.create(data, userId);
            return res.redirect('/budgets');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllBudgetsFromUser(req, res) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.redirect('/login');
            }

            const budgets = await this.#budgetService.getAllBudgetsFromUser(userId);
            return res.render('budgets', {
                title: 'My Budgets - Walletly',
                budgets: budgets
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = BudgetController;