const SavingGoal = require('../models/SavingGoal');
const sequelize = require('../database/sequelize');

class SavingGoalRepository {

    async create(data) {
        try {
            const goal = await SavingGoal.create({
                id: data.id,
                title: data.title,
                description: data.description,
                user_id: data.user_id,
                goalAmount: data.goalAmount,
                currentAmount: data.currentAmount || 0,
                targetDate: data.targetDate,
                icon: data.icon || 'fa-bullseye',
                status: data.status || 'active'
            });
            return goal.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            const goals = await SavingGoal.findAll({
                where: { user_id: userId },
                order: [
                    [sequelize.literal("CASE WHEN status = 'active' THEN 1 WHEN status = 'completed' THEN 2 ELSE 3 END"), 'ASC'],
                    ['created_at', 'DESC']
                ]
            });
            return goals.map(goal => goal.toJSON());
        } catch (error) {
            throw error;
        }
    }

    async getById(id, userId) {
        try {
            const goal = await SavingGoal.findOne({
                where: { 
                    id: id,
                    user_id: userId
                }
            });
            return goal ? goal.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async update(id, userId, data) {
        try {
            const [updated] = await SavingGoal.update({
                title: data.title,
                description: data.description,
                goalAmount: data.goalAmount,
                currentAmount: data.currentAmount,
                targetDate: data.targetDate,
                icon: data.icon,
                status: data.status
            }, {
                where: {
                    id: id,
                    user_id: userId
                }
            });
            
            if (updated) {
                return await this.getById(id, userId);
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async updateAmount(id, userId, amount) {
        try {
            const goal = await this.getById(id, userId);
            if (!goal) return null;

            const newAmount = parseFloat(goal.currentAmount) + parseFloat(amount);
            const newStatus = newAmount >= goal.goalAmount ? 'completed' : goal.status;

            await SavingGoal.update({
                currentAmount: newAmount,
                status: newStatus
            }, {
                where: {
                    id: id,
                    user_id: userId
                }
            });

            return await this.getById(id, userId);
        } catch (error) {
            throw error;
        }
    }

    async delete(id, userId) {
        try {
            const deleted = await SavingGoal.destroy({
                where: {
                    id: id,
                    user_id: userId
                }
            });
            return deleted > 0;
        } catch (error) {
            throw error;
        }
    }

    async getStats(userId) {
        try {
            const result = await SavingGoal.findOne({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'active' THEN 1 END")), 'activeGoals'],
                    [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'completed' THEN 1 END")), 'completedGoals'],
                    [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('currentAmount')), 0), 'totalSaved'],
                    [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('goalAmount')), 0), 'totalGoalAmount']
                ],
                where: { user_id: userId },
                raw: true
            });

            return {
                activeGoals: parseInt(result.activeGoals) || 0,
                completedGoals: parseInt(result.completedGoals) || 0,
                totalSaved: parseFloat(result.totalSaved) || 0,
                totalGoalAmount: parseFloat(result.totalGoalAmount) || 0
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SavingGoalRepository;

