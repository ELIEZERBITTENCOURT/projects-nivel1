const mysqlConnection = require('./db');

function initDB() {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `;

    const createPostsTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            content TEXT,
            likes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    const createCommentsTableQuery = `
        CREATE TABLE IF NOT EXISTS comments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            post_id INT,
            text TEXT,
            likes INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (post_id) REFERENCES posts(id)
        ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `;

    mysqlConnection.query(createUserTableQuery, (err) => {
        if (err) throw err;
        console.log('Tabela de usuários criada com sucesso!');
    });

    mysqlConnection.query(createPostsTableQuery, (err) => {
        if (err) throw err;
        console.log('Tabela de posts criada com sucesso!');
    });

    mysqlConnection.query(createCommentsTableQuery, (err) => {
        if (err) throw err;
        console.log('Tabela de comentários criada com sucesso!');
    });
}

module.exports = initDB;
