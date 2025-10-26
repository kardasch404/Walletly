class SavingGoalService {
    #savingGoalRepository;

    constructor(savingGoalRepository) {
        this.#savingGoalRepository = savingGoalRepository;
    }

    async create(data, userId) {
        try {
            const goalData = {
                id: Math.random().toString(36).substring(2, 12),
                user_id: userId,
                title: data.title,
                description: data.description,
                goalAmount: data.goalAmount,
                currentAmount: data.currentAmount || 0,
                targetDate: data.targetDate,
                icon: data.icon || 'fa-bullseye',
                status: 'active'
            };
            
            return await this.#savingGoalRepository.create(goalData);
        } catch (error) {
            throw error;
        }
    }

    async getAllGoalsFromUser(userId) {
        try {
            const goals = await this.#savingGoalRepository.getAllByUserId(userId);
            
            // Add calculated fields
            return goals.map(goal => ({
                ...goal,
                progress: goal.goalAmount > 0 ? Math.min(100, (goal.currentAmount / goal.goalAmount) * 100) : 0,
                remainingAmount: Math.max(0, goal.goalAmount - goal.currentAmount),
                isCompleted: goal.currentAmount >= goal.goalAmount || goal.status === 'completed'
            }));
        } catch (error) {
            throw error;
        }
    }

    async getGoalById(id, userId) {
        try {
            return await this.#savingGoalRepository.getById(id, userId);
        } catch (error) {
            throw error;
        }
    }

    async update(id, userId, data) {
        try {
            return await this.#savingGoalRepository.update(id, userId, data);
        } catch (error) {
            throw error;
        }
    }

    async addFunds(id, userId, amount) {
        try {
            return await this.#savingGoalRepository.updateAmount(id, userId, amount);
        } catch (error) {
            throw error;
        }
    }

    async delete(id, userId) {
        try {
            return await this.#savingGoalRepository.delete(id, userId);
        } catch (error) {
            throw error;
        }
    }

    async getStats(userId) {
        try {
            return await this.#savingGoalRepository.getStats(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SavingGoalService;
