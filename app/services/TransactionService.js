class TransactionService {
    #transactionRepository;

    constructor(transactionRepository) {
        this.#transactionRepository = transactionRepository;
    }

    async create(data, userId) {
        try {
            const transactionData = {
                id: Math.random().toString(36).substring(2, 38),
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
}

module.exports = TransactionService;