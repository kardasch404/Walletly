const db = require('../database/mysql.js');

class TransactionRepository {

    async create(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO transactions (id, user_id, category_id, amount, description, type, transactionDate) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
                const query = 'SELECT * FROM transactions WHERE user_id = ? ORDER BY transactionDate DESC';
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

module.exports = TransactionRepository;