const db = require('../database/mysql.js');

class BudgetRepository {

    async create(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO budgets (id, user_id, category_id, monthlyLimit, mounth, year) 
                            VALUES (?, ?, ?, ?, ?, ?)`;
                const values = [
                    data.id,
                    data.user_id,
                    data.category_id,
                    data.monthlyLimit,
                    data.mounth,
                    data.year
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
                const query = `SELECT 
                    b.*, 
                    c.name as category_name,
                    COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) as spent
                FROM budgets b 
                JOIN categories c ON b.category_id = c.id 
                LEFT JOIN transactions t ON b.category_id = t.category_id 
                    AND t.user_id = b.user_id 
                    AND MONTH(t.transactionDate) = b.mounth 
                    AND YEAR(t.transactionDate) = b.year
                WHERE b.user_id = ?
                GROUP BY b.id, c.name`;
                db.query(query, [userId], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BudgetRepository;