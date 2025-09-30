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
}

module.exports = UserRepository;