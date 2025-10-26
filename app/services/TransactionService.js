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

    async searchAndFilter(userId, searchTerm, filterType) {
        try {
            return await this.#transactionRepository.searchAndFilter(userId, searchTerm, filterType);
        } catch (error) {
            throw error;
        }
    }

    async getStatsByFilter(userId, filterType) {
        try {
            return await this.#transactionRepository.getStatsByFilter(userId, filterType);
        } catch (error) {
            throw error;
        }
    }

    async getAnalyticsData(userId) {
        try {
            const [yearData, categorySpending, lastMonthData, currentMonthData] = await Promise.all([
                this.#transactionRepository.getAnalyticsData(userId),
                this.#transactionRepository.getCategorySpending(userId),
                this.#transactionRepository.getLastMonthData(userId),
                this.#transactionRepository.getCurrentMonthData(userId)
            ]);

            const currentIncome = parseFloat(currentMonthData.totalIncome) || 0;
            const currentExpense = parseFloat(currentMonthData.totalExpense) || 0;
            const lastIncome = parseFloat(lastMonthData.totalIncome) || 0;
            const lastExpense = parseFloat(lastMonthData.totalExpense) || 0;

            // Calculate Net Worth (Total Income - Total Expense for the year)
            const netWorth = parseFloat(yearData.totalIncome) - parseFloat(yearData.totalExpense);
            
            // Calculate Savings Rate (current month)
            const savingsRate = currentIncome > 0 ? ((currentIncome - currentExpense) / currentIncome) * 100 : 0;
            const lastSavingsRate = lastIncome > 0 ? ((lastIncome - lastExpense) / lastIncome) * 100 : 0;
            const savingsRateChange = lastSavingsRate > 0 ? ((savingsRate - lastSavingsRate) / lastSavingsRate) * 100 : 0;

            // Calculate Average Daily Spend (current month)
            const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
            const avgDailySpend = currentExpense / daysInMonth;
            const lastAvgDailySpend = lastExpense / (new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate());
            const avgDailySpendChange = lastAvgDailySpend > 0 ? ((avgDailySpend - lastAvgDailySpend) / lastAvgDailySpend) * 100 : 0;

            // Calculate Financial Score (0-10 based on multiple factors)
            let financialScore = 5; // Start with neutral
            if (savingsRate > 20) financialScore += 2;
            else if (savingsRate > 10) financialScore += 1;
            if (netWorth > 0) financialScore += 2;
            if (currentExpense < currentIncome) financialScore += 1;
            financialScore = Math.min(10, Math.max(0, financialScore));

            const scoreRating = financialScore >= 8 ? 'Excellent' : 
                               financialScore >= 6 ? 'Good' : 
                               financialScore >= 4 ? 'Fair' : 'Needs Improvement';

            return {
                netWorth,
                netWorthChange: 0, // Would need historical data for year comparison
                savingsRate,
                savingsRateChange,
                avgDailySpend,
                avgDailySpendChange,
                financialScore: financialScore.toFixed(1),
                scoreRating,
                categorySpending,
                currentMonthData: {
                    income: currentIncome,
                    expense: currentExpense
                },
                // Emergency fund (assume 6 months expenses as target)
                emergencyFundStatus: {
                    current: netWorth,
                    target: currentExpense * 6,
                    percentage: Math.min(100, (netWorth / (currentExpense * 6)) * 100),
                    rating: netWorth >= currentExpense * 6 ? 'Excellent' : 
                           netWorth >= currentExpense * 3 ? 'Good' : 
                           netWorth >= currentExpense ? 'Fair' : 'Needs Attention'
                },
                // Budget adherence (based on spending vs income)
                budgetAdherence: {
                    percentage: currentIncome > 0 ? Math.min(100, ((currentIncome - currentExpense) / currentIncome) * 100) : 0,
                    rating: currentExpense < currentIncome * 0.8 ? 'Excellent' : 
                           currentExpense < currentIncome ? 'Good' : 'Over Budget'
                }
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionService;