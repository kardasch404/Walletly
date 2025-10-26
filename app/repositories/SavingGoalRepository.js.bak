const db = require('../database/mysql.js');

class SavingGoalRepository {

    async create(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO savingsGoals 
                    (id, title, description, user_id, goalAmount, currentAmount, targetDate, icon, status) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [
                    data.id,
                    data.title,
                    data.description,
                    data.user_id,
                    data.goalAmount,
                    data.currentAmount || 0,
                    data.targetDate,
                    data.icon || 'fa-bullseye',
                    data.status || 'active'
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
                    SELECT * FROM savingsGoals 
                    WHERE user_id = ? 
                    ORDER BY 
                        CASE 
                            WHEN status = 'active' THEN 1
                            WHEN status = 'completed' THEN 2
                            ELSE 3
                        END,
                        created_at DESC
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

    async getById(id, userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT * FROM savingsGoals 
                    WHERE id = ? AND user_id = ?
                `;
                db.query(query, [id, userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0]);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async update(id, userId, data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    UPDATE savingsGoals 
                    SET title = ?, description = ?, goalAmount = ?, currentAmount = ?, 
                        targetDate = ?, icon = ?, status = ?
                    WHERE id = ? AND user_id = ?
                `;
                const values = [
                    data.title,
                    data.description,
                    data.goalAmount,
                    data.currentAmount,
                    data.targetDate,
                    data.icon,
                    data.status,
                    id,
                    userId
                ];

                db.query(query, values, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async updateAmount(id, userId, amount) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    UPDATE savingsGoals 
                    SET currentAmount = currentAmount + ?,
                        status = CASE 
                            WHEN (currentAmount + ?) >= goalAmount THEN 'completed'
                            ELSE status
                        END
                    WHERE id = ? AND user_id = ?
                `;
                db.query(query, [amount, amount, id, userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id, userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    DELETE FROM savingsGoals 
                    WHERE id = ? AND user_id = ?
                `;
                db.query(query, [id, userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        } catch (error) {
            throw error;
        }
    }

    async getStats(userId) {
        try {
            return new Promise((resolve, reject) => {
                const query = `
                    SELECT 
                        COUNT(CASE WHEN status = 'active' THEN 1 END) as activeGoals,
                        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completedGoals,
                        COALESCE(SUM(currentAmount), 0) as totalSaved,
                        COALESCE(SUM(goalAmount), 0) as totalGoalAmount
                    FROM savingsGoals 
                    WHERE user_id = ?
                `;
                db.query(query, [userId], (err, result) => {
                    if (err) reject(err);
                    else resolve(result[0]);
                });
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SavingGoalRepository;
