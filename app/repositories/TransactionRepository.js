const sequelize = require('../database/sequelize');
const Transaction = require('../models/Trasaction');
const Category = require('../models/Category');
const { Op } = require('sequelize');

class TransactionRepository {

    async create(data) {
        try {
            const transaction = await Transaction.create({
                id: data.id,
                user_id: data.user_id,
                category_id: data.category_id,
                amount: data.amount,
                description: data.description,
                type: data.type,
                transactionDate: data.transactionDate
            });
            return transaction.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            const transactions = await Transaction.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Category,
                        attributes: ['name'],
                        required: false
                    }
                ],
                order: [['transactionDate', 'DESC']],
                raw: false
            });

            return transactions.map(t => {
                const data = t.toJSON();
                return {
                    ...data,
                    category_name: data.Category ? data.Category.name : null
                };
            });
        } catch (error) {
            throw error;
        }
    }

    async getRecentByUserId(userId, limit = 4) {
        try {
            const transactions = await Transaction.findAll({
                where: { user_id: userId },
                include: [
                    {
                        model: Category,
                        attributes: ['name'],
                        required: false
                    }
                ],
                order: [['transactionDate', 'DESC']],
                limit: limit,
                raw: false
            });

            return transactions.map(t => {
                const data = t.toJSON();
                return {
                    ...data,
                    category_name: data.Category ? data.Category.name : null
                };
            });
        } catch (error) {
            throw error;
        }
    }

    async getTotalIncomeByUserId(userId) {
        try {
            const result = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'income'
                }
            });
            return result || 0;
        } catch (error) {
            throw error;
        }
    }

    async getTotalExpenseByUserId(userId) {
        try {
            const result = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'expense'
                }
            });
            return result || 0;
        } catch (error) {
            throw error;
        }
    }

    async getTotalBalanceByUserId(userId) {
        try {
            const income = await this.getTotalIncomeByUserId(userId);
            const expense = await this.getTotalExpenseByUserId(userId);
            return income - expense;
        } catch (error) {
            throw error;
        }
    }

    async getMonthlyDataByUserId(userId, year) {
        try {
            // Get all transactions for the year
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59);

            const transactions = await Transaction.findAll({
                where: {
                    user_id: userId,
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                raw: true
            });

            // Group by month
            const monthlyData = {};
            transactions.forEach(t => {
                const month = new Date(t.transactionDate).getMonth() + 1;
                if (!monthlyData[month]) {
                    monthlyData[month] = { month, income: 0, expense: 0 };
                }
                if (t.type === 'income') {
                    monthlyData[month].income += parseFloat(t.amount);
                } else if (t.type === 'expense') {
                    monthlyData[month].expense += parseFloat(t.amount);
                }
            });

            return Object.values(monthlyData).sort((a, b) => a.month - b.month);
        } catch (error) {
            throw error;
        }
    }

    async searchAndFilter(userId, searchTerm = '', filterType = 'all') {
        try {
            const whereConditions = { user_id: userId };

            // Add filter by type
            if (filterType !== 'all') {
                whereConditions.type = filterType;
            }

            // Add search conditions
            if (searchTerm && searchTerm.trim() !== '') {
                whereConditions[Op.or] = [
                    { description: { [Op.like]: `%${searchTerm}%` } },
                    { amount: { [Op.like]: `%${searchTerm}%` } }
                ];
            }

            const transactions = await Transaction.findAll({
                where: whereConditions,
                include: [
                    {
                        model: Category,
                        attributes: ['name'],
                        required: false,
                        where: searchTerm && searchTerm.trim() !== '' ? {
                            name: { [Op.like]: `%${searchTerm}%` }
                        } : undefined
                    }
                ],
                order: [['transactionDate', 'DESC']],
                raw: false
            });

            return transactions.map(t => {
                const data = t.toJSON();
                return {
                    ...data,
                    category_name: data.Category ? data.Category.name : null
                };
            });
        } catch (error) {
            throw error;
        }
    }

    async getStatsByFilter(userId, filterType = 'all') {
        try {
            const whereConditions = { user_id: userId };

            if (filterType !== 'all') {
                whereConditions.type = filterType;
            }

            // Get income and expense separately
            const incomeTotal = await Transaction.sum('amount', {
                where: { ...whereConditions, type: 'income' }
            }) || 0;

            const expenseTotal = await Transaction.sum('amount', {
                where: { ...whereConditions, type: 'expense' }
            }) || 0;

            const transactionCount = await Transaction.count({
                where: whereConditions
            });

            return {
                totalIncome: incomeTotal,
                totalExpense: expenseTotal,
                transactionCount: transactionCount
            };
        } catch (error) {
            throw error;
        }
    }

    async getAnalyticsData(userId) {
        try {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear, 0, 1);
            const endDate = new Date(currentYear, 11, 31, 23, 59, 59);

            // Get income total
            const totalIncome = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'income',
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            }) || 0;

            // Get expense total
            const totalExpense = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'expense',
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            }) || 0;

            // Get total transactions count
            const totalTransactions = await Transaction.count({
                where: {
                    user_id: userId,
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });

            // Get average expense
            const expenses = await Transaction.findAll({
                attributes: ['amount'],
                where: {
                    user_id: userId,
                    type: 'expense',
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                raw: true
            });

            const avgExpense = expenses.length > 0
                ? expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0) / expenses.length
                : 0;

            return {
                totalIncome,
                totalExpense,
                totalTransactions,
                avgExpense
            };
        } catch (error) {
            throw error;
        }
    }

    async getCategorySpending(userId) {
        try {
            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear, 0, 1);
            const endDate = new Date(currentYear, 11, 31, 23, 59, 59);

            const transactions = await Transaction.findAll({
                attributes: ['category_id', 'amount'],
                where: {
                    user_id: userId,
                    type: 'expense',
                    transactionDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [
                    {
                        model: Category,
                        attributes: ['name'],
                        required: false
                    }
                ],
                raw: false
            });

            // Group by category
            const categoryMap = {};
            transactions.forEach(t => {
                const data = t.toJSON();
                const categoryName = data.Category ? data.Category.name : 'Uncategorized';
                if (!categoryMap[categoryName]) {
                    categoryMap[categoryName] = 0;
                }
                categoryMap[categoryName] += parseFloat(data.amount);
            });

            // Convert to array and sort
            const results = Object.entries(categoryMap)
                .map(([category, total]) => ({ category, total }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 10);

            return results;
        } catch (error) {
            throw error;
        }
    }

    async getLastMonthData(userId) {
        try {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

            // Get income
            const totalIncome = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'income',
                    transactionDate: {
                        [Op.between]: [lastMonth, lastMonthEnd]
                    }
                }
            }) || 0;

            // Get expense
            const totalExpense = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'expense',
                    transactionDate: {
                        [Op.between]: [lastMonth, lastMonthEnd]
                    }
                }
            }) || 0;

            // Get count
            const totalTransactions = await Transaction.count({
                where: {
                    user_id: userId,
                    transactionDate: {
                        [Op.between]: [lastMonth, lastMonthEnd]
                    }
                }
            });

            return {
                totalIncome,
                totalExpense,
                totalTransactions
            };
        } catch (error) {
            throw error;
        }
    }

    async getCurrentMonthData(userId) {
        try {
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

            // Get income
            const totalIncome = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'income',
                    transactionDate: {
                        [Op.between]: [currentMonthStart, currentMonthEnd]
                    }
                }
            }) || 0;

            // Get expense
            const totalExpense = await Transaction.sum('amount', {
                where: {
                    user_id: userId,
                    type: 'expense',
                    transactionDate: {
                        [Op.between]: [currentMonthStart, currentMonthEnd]
                    }
                }
            }) || 0;

            // Get count
            const totalTransactions = await Transaction.count({
                where: {
                    user_id: userId,
                    transactionDate: {
                        [Op.between]: [currentMonthStart, currentMonthEnd]
                    }
                }
            });

            // Get unique transaction dates
            const transactions = await Transaction.findAll({
                attributes: ['transactionDate'],
                where: {
                    user_id: userId,
                    transactionDate: {
                        [Op.between]: [currentMonthStart, currentMonthEnd]
                    }
                },
                raw: true
            });

            const uniqueDates = new Set();
            transactions.forEach(t => {
                const date = new Date(t.transactionDate).toDateString();
                uniqueDates.add(date);
            });

            return {
                totalIncome,
                totalExpense,
                totalTransactions,
                daysWithTransactions: uniqueDates.size
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionRepository;

module.exports = TransactionRepository;