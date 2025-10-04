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
                const query = 'SELECT * FROM budgets WHERE user_id = ?';
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