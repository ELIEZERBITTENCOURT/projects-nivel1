// models/Comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Comment.getAllComments = async function (postId) {
  try {
    const comments = await Comment.findAll({
      where: { postId },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

Comment.createComment = async function (userId, postId, content) {
  try {
    const newComment = await Comment.create({
      userId,
      postId,
      content,
    });
    return newComment;
  } catch (error) {
    throw error;
  }
};

Comment.editComment = async function (commentId, content) {
  try {
    const updatedComment = await Comment.update(
      { content },
      { where: { id: commentId }, returning: true }
    );
    return updatedComment[1][0]; 
  } catch (error) {
    throw error;
  }
};

Comment.likeComment = async function (userId, commentId) {
  try {
    const comment = await Comment.findByPk(commentId);
    comment.likes.push(userId);
    await comment.save();
  } catch (error) {
    throw error;
  }
};

Comment.unlikeComment = async function (userId, commentId) {
  try {
    const comment = await Comment.findByPk(commentId);
    comment.likes = comment.likes.filter((id) => id !== userId);
    await comment.save();
  } catch (error) {
    throw error;
  }
};

Comment.deleteComment = async function (commentId) {
  try {
    await Comment.destroy({ where: { id: commentId } });
  } catch (error) {
    throw error;
  }
};

Comment.getCommentById = async function (commentId) {
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new Error('Comentário não encontrado.');
    }
    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = Comment;
