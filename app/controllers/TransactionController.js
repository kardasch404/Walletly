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
}

module.exports = TransactionController;