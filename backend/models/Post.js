const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

Post.belongsTo(User, { foreignKey: 'userId' });

Post.createPost = async function (userId, title, content) {
  return await Post.create({ userId, title, content });
};

Post.editPost = async function (postId, title, content) {
  return await Post.update({ title, content }, { where: { id: postId } });
};

Post.likePost = async function (userId, postId) {
  try {
    const post = await Post.findByPk(postId);
    post.likes.push(userId);
    await post.save();
  } catch (error) {
    throw error;
  }
};

Post.deletePost = async function (postId) {
  return await Post.destroy({ where: { id: postId } });
};

Post.getAllPosts = async function () {
  return await Post.findAll();
};

Post.getPostById = async function (postId) {
  return await Post.findByPk(postId);
};

module.exports = Post;
