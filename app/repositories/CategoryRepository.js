const db = require('../database/mysql.js');

class CategoryRepository {

    async create(data) 
    {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO categories (id, name, description, type, user_id) 
                            VALUES (?, ?, ?, ?, ?)`;
                const values = [
                    data.id,
                    data.name,
                    data.description,
                    data.type,
                    data.user_id
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
                const query = 'SELECT * FROM categories WHERE user_id = ?';
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

    async getAllCategoriesFromUser (userId)
    {
        try {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM categories WHERE user_id = ?`;
                const values = [userId];

                db.query(query, values, (err, result) => {
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

module.exports = CategoryRepository;