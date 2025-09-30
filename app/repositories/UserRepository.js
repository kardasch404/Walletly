const pool = require('../database/mysql');
const User = require('../models/User');

class UserRepository {
    create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (id, firstname, lastname, email, password, image) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [data.id, data.fname, data.lname, data.email, data.password, data.image];
            
            pool.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    const user = new User(data.id, data.fname, data.lname, data.email, data.password, data.image);
                    resolve(user);
                }
            });
        });
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            
            pool.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);
                } else if (results.length === 0) {
                    resolve(null);
                } else {
                    const userData = results[0];
                    const user = new User(userData.id, userData.firstname, userData.lastname, userData.email, userData.password, userData.image);
                    resolve(user);
                }
            });
        });
    }
}

module.exports = UserRepository;