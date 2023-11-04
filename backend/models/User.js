const mysqlConnection = require('../config/db');

class User {
    static createUser({ name, email, password }) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            mysqlConnection.query(query, [name, email, password], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: result.insertId, name, email });
                }
            });
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            mysqlConnection.query(query, [email], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }

    static findById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            mysqlConnection.query(query, [userId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    if (rows.length > 0) {
                        resolve(rows[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
}

module.exports = User;
