class TransactionService {
    #transactionRepository;

    constructor(transactionRepository) {
        this.#transactionRepository = transactionRepository;
    }

    async create(data, userId) {
        try {
            const transactionData = {
                id: Math.random().toString(36).substring(2, 12),
                user_id: userId,
                category_id: data.category_id,
                amount: data.amount,
                description: data.description,
                type: data.type,
                transactionDate: data.transactionDate
            };
            
            return await this.#transactionRepository.create(transactionData);
        } catch (error) {
            throw error;
        }
    }

    async getAllTransactionsFromUser(userId) {
        try {
            return await this.#transactionRepository.getAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getRecentTransactions(userId, limit = 4) {
        try {
            return await this.#transactionRepository.getRecentByUserId(userId, limit);
        } catch (error) {
            throw error;
        }
    }

    async getTotalIncome(userId) {
        try {
            return await this.#transactionRepository.getTotalIncomeByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getTotalExpense(userId) {
        try {
            return await this.#transactionRepository.getTotalExpenseByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getTotalBalance(userId) {
        try {
            return await this.#transactionRepository.getTotalBalanceByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getMonthlyData(userId, year = new Date().getFullYear()) {
        try {
            const monthlyData = await this.#transactionRepository.getMonthlyDataByUserId(userId, year);
            
            // Initialize all 12 months with zero values
            const months = Array.from({ length: 12 }, (_, i) => ({
                month: i + 1,
                income: 0,
                expense: 0
            }));
            
            // Fill in actual data
            monthlyData.forEach(data => {
                months[data.month - 1] = {
                    month: data.month,
                    income: parseFloat(data.income) || 0,
                    expense: parseFloat(data.expense) || 0
                };
            });
            
            return months;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService;