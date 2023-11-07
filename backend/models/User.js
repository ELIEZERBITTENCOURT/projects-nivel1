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
    
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ?';
            mysqlConnection.query(query, [username], (err, rows) => {
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

    static changePassword(userId, hashedPassword) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET password = ? WHERE id = ?';
            mysqlConnection.query(query, [hashedPassword, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static editProfile(userId, { nome, endereco }) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET name = ?, address = ? WHERE id = ?';
            mysqlConnection.query(query, [nome, endereco, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: 'Informações pessoais atualizadas com sucesso!' });
                }
            });
        });
    }

    static updatePreferences(userId, { emailNotifications, messageNotifications }) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE users SET email_notifications = ?, message_notifications = ? WHERE id = ?';
            mysqlConnection.query(query, [emailNotifications, messageNotifications, userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: 'Preferências de comunicação atualizadas com sucesso!' });
                }
            });
        });
    }
}

module.exports = User;
