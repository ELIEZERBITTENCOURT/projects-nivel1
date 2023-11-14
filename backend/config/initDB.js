const sequelize = require('./db');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexão bem-sucedida.');

    // Sincronizar os modelos com o banco de dados
    await User.sync({ force: false });
    await Post.sync({ force: false });
    await Comment.sync({ force: false });

    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  }
}

module.exports = initDB;
