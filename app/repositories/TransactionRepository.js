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
                console.log('getAllByUserId called with userId:', userId);
                const query = `SELECT t.id, t.user_id, t.category_id, t.amount, t.description, t.type, t.transactionDate, t.created_at, c.name as category_name 
                              FROM transactions t 
                              LEFT JOIN categories c ON t.category_id = c.id 
                              WHERE t.user_id = ? 
                              ORDER BY t.transactionDate DESC`;
                console.log('Query:', query);
                console.log('Parameters:', [userId]);
                db.query(query, [userId], (err, result) => {
                    if (err) {
                        console.error('Database error:', err);
                        reject(err);
                    } else {
                        console.log('Query result:', result);
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