class TransactionController {
    #transactionService;

    constructor(transactionService) {
        this.#transactionService = transactionService;
    }

    async createTransaction(req, res) {
        try {
            const data = req.body;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(400).json({ error: 'User not found' });
            }

            const transaction = await this.#transactionService.create(data, userId);
            return res.redirect('/transactions');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllTransactionsFromUser(req, res) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.redirect('/login');
            }

            const transactions = await this.#transactionService.getAllTransactionsFromUser(userId);
            return res.render('transactions', {
                title: 'My Transactions - Walletly',
                transactions: transactions
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async CountAllTransactionsFromUser(req, res)
    {

    }

    async TotalIncome(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).json({ error: 'Unauthorized' });
            
            const total = await this.#transactionService.getTotalIncome(userId);
            return res.json({ total });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async TotalExpense(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).json({ error: 'Unauthorized' });
            
            const total = await this.#transactionService.getTotalExpense(userId);
            return res.json({ total });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async TotalBalance(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).json({ error: 'Unauthorized' });
            
            const balance = await this.#transactionService.getTotalBalance(userId);
            return res.json({ balance });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // async search (req, res)
    // {

    // }

    // async filter (req, res)
    // {

    // }

    async RecentTransactions(req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) return res.status(401).json({ error: 'Unauthorized' });
            
            const transactions = await this.#transactionService.getRecentTransactions(userId);
            return res.json(transactions);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = TransactionController;