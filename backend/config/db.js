require('dotenv').config();
const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  charset: 'utf8mb4'
});

mysqlConnection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados MySQL: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL com o ID ' + mysqlConnection.threadId);
});

module.exports = mysqlConnection;

