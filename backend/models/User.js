const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Função para criar um novo usuário
User.createUser = async function ({ name, email, password }) {
  return await User.create({ name, email, password });
};

// Função para encontrar usuário por e-mail
User.findByEmail = async function (email) {
  if (!email) {
    throw new Error('Email is undefined');
  }

  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// Função para alterar a senha do usuário
User.changePassword = async function (userId, newPassword) {
  return await User.update({ password: newPassword }, { where: { id: userId } });
};

module.exports = User;
