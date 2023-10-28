const mysqlConnection = require('../config/db');

class Comment {
  static createComment(postId, text) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO comments (post_id, text) VALUES (?, ?)';
      mysqlConnection.query(query, [postId, text], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, postId, text });
        }
      });
    });
  }

  static getAllComments(postId) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM comments WHERE post_id = ?';
      mysqlConnection.query(query, [postId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static likeComment(commentId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE comments SET likes = likes + 1 WHERE id = ?';
      mysqlConnection.query(query, [commentId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve({ message: 'Comentário curtido com sucesso!' });
          } else {
            reject({ error: 'Comentário não encontrado.' });
          }
        }
      });
    });
  }

  static createReply(commentId, text) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO comments (parent_comment_id, text) VALUES (?, ?)';
      mysqlConnection.query(query, [commentId, text], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: result.insertId, parentCommentId: commentId, text });
        }
      });
    });
  }

  static deleteComment(commentId) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM comments WHERE id = ?';
      mysqlConnection.query(query, [commentId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.affectedRows > 0) {
            resolve({ message: 'Comentário excluído com sucesso!' });
          } else {
            reject({ error: 'Comentário não encontrado.' });
          }
        }
      });
    });
  }
}

module.exports = Comment;
