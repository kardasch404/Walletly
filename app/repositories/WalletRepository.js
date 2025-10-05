const db = require('../database/mysql.js');

class WalletRepository {

    async create(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO wallets (id, user_id, cardNumber, amount, mounth, year) 
                            VALUES (?, ?, ?, ?, ?, ?)`;
                const values = [
                    data.id,
                    data.user_id,
                    data.cardNumber,
                    data.amount,
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
                const query = 'SELECT * FROM wallets WHERE user_id = ?';
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

module.exports = WalletRepository;