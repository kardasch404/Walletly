const db = require('../database/mysql.js');

class TransactionRepository {

    async create(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO transactions 
                    (id, user_id, category_id, amount, description, type, transactionDate) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.id,
                    data.user_id,
                    data.category_id,
                    data.amount,
                    data.description,
                    data.type,
                    data.transactionDate
                ];

                db.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT 
                        transactions.*, 
                        categories.name AS category_name 
                    FROM transactions 
                    LEFT JOIN categories ON transactions.category_id = categories.id 
                    WHERE transactions.user_id = ? 
                    ORDER BY transactions.transactionDate DESC
                `;
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getRecentByUserId(userId, limit = 4) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT 
                        transactions.*, 
                        categories.name AS category_name 
                    FROM transactions 
                    LEFT JOIN categories ON transactions.category_id = categories.id 
                    WHERE transactions.user_id = ? 
                    ORDER BY transactions.transactionDate DESC 
                    LIMIT ?
                `;
                db.query(query, [userId, limit], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getTotalIncomeByUserId(userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT COALESCE(SUM(amount), 0) AS total 
                    FROM transactions 
                    WHERE user_id = ? AND type = 'income'
                `;
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0].total);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getTotalExpenseByUserId(userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT COALESCE(SUM(amount), 0) AS total 
                    FROM transactions 
                    WHERE user_id = ? AND type = 'expense'
                `;
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0].total);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getTotalBalanceByUserId(userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT 
                        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) - 
                        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS balance 
                    FROM transactions 
                    WHERE user_id = ?
                `;
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0].balance);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getMonthlyDataByUserId(userId, year) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT 
                        MONTH(transactionDate) as month,
                        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
                        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
                    FROM transactions 
                    WHERE user_id = ? AND YEAR(transactionDate) = ?
                    GROUP BY MONTH(transactionDate)
                    ORDER BY MONTH(transactionDate)
                `;
                db.query(query, [userId, year], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async searchAndFilter(userId, searchTerm = '', filterType = 'all') {
        try {
            return new Promise((resolve, reject) => {
                let query = `
                    SELECT 
                        transactions.*, 
                        categories.name AS category_name 
                    FROM transactions 
                    LEFT JOIN categories ON transactions.category_id = categories.id 
                    WHERE transactions.user_id = ?
                `;
                const params = [userId];

                // Add filter by type
                if (filterType !== 'all') {
                    query += ` AND transactions.type = ?`;
                    params.push(filterType);
                }

                // Add search term
                if (searchTerm && searchTerm.trim() !== '') {
                    query += ` AND (
                        transactions.description LIKE ? OR 
                        categories.name LIKE ? OR
                        transactions.amount LIKE ?
                    )`;
                    const searchPattern = `%${searchTerm}%`;
                    params.push(searchPattern, searchPattern, searchPattern);
                }

                query += ` ORDER BY transactions.transactionDate DESC`;

                db.query(query, params, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getStatsByFilter(userId, filterType = 'all') {
        try {
            return new Promise((resolve, reject) => {
                let query = `
                    SELECT 
                        COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as totalIncome,
                        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as totalExpense,
                        COUNT(*) as transactionCount
                    FROM transactions 
                    WHERE user_id = ?
                `;
                const params = [userId];

                if (filterType !== 'all') {
                    query += ` AND type = ?`;
                    params.push(filterType);
                }

                db.query(query, params, (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0]);
                });
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TransactionRepository;