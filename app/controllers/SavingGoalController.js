class SavingGoalController {
    #savingGoalService;

    constructor(savingGoalService) {
        this.#savingGoalService = savingGoalService;
    }

    async createGoal(req, res) {
        try {
            const data = req.body;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(400).json({ error: 'User not found' });
            }

            const goal = await this.#savingGoalService.create(data, userId);
            return res.json({ success: true, goal });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllGoals(req, res) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const goals = await this.#savingGoalService.getAllGoalsFromUser(userId);
            return res.json({ success: true, goals });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getGoalById(req, res) {
        try {
            const userId = req.session.userId;
            const goalId = req.params.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const goal = await this.#savingGoalService.getGoalById(goalId, userId);
            return res.json({ success: true, goal });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateGoal(req, res) {
        try {
            const userId = req.session.userId;
            const goalId = req.params.id;
            const data = req.body;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await this.#savingGoalService.update(goalId, userId, data);
            return res.json({ success: true, message: 'Goal updated successfully' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async addFunds(req, res) {
        try {
            const userId = req.session.userId;
            const goalId = req.params.id;
            const { amount } = req.body;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await this.#savingGoalService.addFunds(goalId, userId, amount);
            return res.json({ success: true, message: 'Funds added successfully' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async deleteGoal(req, res) {
        try {
            const userId = req.session.userId;
            const goalId = req.params.id;

            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            await this.#savingGoalService.delete(goalId, userId);
            return res.json({ success: true, message: 'Goal deleted successfully' });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SavingGoalController;
