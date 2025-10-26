const sequelize = require('../database/sequelize');
const Budget = require('../models/Budget');
const Category = require('../models/Category');
const Transaction = require('../models/Trasaction');

class BudgetRepository {

    async create(data) {
        try {
            const budget = await Budget.create({
                id: data.id,
                user_id: data.user_id,
                category_id: data.category_id,
                monthlyLimit: data.monthlyLimit,
                mounth: data.mounth,
                year: data.year
            });
            return budget.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            const budgets = await Budget.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Category,
                        attributes: ['name'],
                        required: true
                    }
                ],
                raw: false
            });

            // Calculate spent amount for each budget
            const budgetsWithSpent = await Promise.all(
                budgets.map(async (budget) => {
                    const budgetData = budget.toJSON();
                    
                    // Get total expenses for this budget's category in the specified month/year
                    const totalSpent = await Transaction.sum('amount', {
                        where: {
                            user_id: userId,
                            category_id: budgetData.category_id,
                            type: 'expense',
                            [sequelize.Sequelize.Op.and]: [
                                sequelize.where(
                                    sequelize.fn('MONTH', sequelize.col('transactionDate')),
                                    budgetData.mounth
                                ),
                                sequelize.where(
                                    sequelize.fn('YEAR', sequelize.col('transactionDate')),
                                    budgetData.year
                                )
                            ]
                        }
                    });

                    return {
                        ...budgetData,
                        category_name: budgetData.Category.name,
                        spent: totalSpent || 0
                    };
                })
            );

            return budgetsWithSpent;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BudgetRepository;