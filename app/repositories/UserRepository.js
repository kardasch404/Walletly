const db = require('../database/mysql');
const User = require('../models/User');

class UserRepository {
    create(data) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (id, fname, lname, email, currency, password, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [
                data.id, 
                data.fname, 
                data.lname, 
                data.email,
                data.currency, 
                data.password, 
                data.image
            ];

            db.query(query, values, (err, result) => {
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
            const values = [email];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        const user = new User(result[0].id, result[0].fname, result[0].lname, result[0].email, result[0].password, result[0].image);
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            });
        })
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            const values = [id];
            db.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        const user = new User(result[0].id, result[0].fname, result[0].lname, result[0].email, result[0].password, result[0].image);
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                }
            });
        })
    }

    async update (userData)
    {
        try{
            return new Promise((resolve, reject) => {
                const query = 'UPDATE users SET fname = ?, lname = ?, email = ? WHERE id = ?';
                const values = [
                    userData.fname,
                    userData.lname,
                    userData.email,
                    userData.id
                ];
                db.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

        }catch(error){
            throw error;
        }
    }

    async updateImage (userData)
    {
        try{
            return new Promise((resolve, reject) => {
                const query = 'UPDATE users SET image = ? WHERE id = ?';
                const values = [
                    userData.image,
                    userData.id
                ];
                db.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

        }catch(error){
            throw error;
        }
    }
}

module.exports = UserRepository;