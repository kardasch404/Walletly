class BudgetService {
    #budgetRepository;

    constructor(budgetRepository) {
        this.#budgetRepository = budgetRepository;
    }

    async create(data, userId) {
        try {
            const budgetData = {
                id: Math.random().toString(36).substring(2, 38),
                category_id: data.category_id,
                monthlyLimit: data.monthlyLimit,
                mounth: data.mounth,
                year: data.year,
                user_id: userId
            };
            
            return await this.#budgetRepository.create(budgetData);
        } catch (error)
        {
            throw error;
        }
    }

    async getAllBudgetsFromUser(userId) {
        try {
            return await this.#budgetRepository.getAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentMonthBudgetSummary(userId) {
        try {
            return await this.#budgetRepository.getCurrentMonthBudgetSummary(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BudgetService;