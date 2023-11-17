const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');

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

User.associate = function (models) {
  User.hasMany(models.Post, { foreignKey: 'userId' });
};

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

User.createUser = async function ({ name, email, password }) {
  return await User.create({ name, email, password });
};

User.changePassword = async function (userId, newPassword) {
  return await User.update({ password: newPassword }, { where: { id: userId } });
};

module.exports = User;
