const mysqlConnection = require('../config/db');

class Post {
  static getAllPosts() {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM posts`;
        mysqlConnection.query(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

static createPost(title, content) {
  return new Promise((resolve, reject) => {
      const query = 'INSERT INTO posts (title, content) VALUES (?, ?)';
      mysqlConnection.query(query, [title, content], (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve({ id: result.insertId, title, content });
          }
      });
  });
}

static editPost(postId, title, content) {
  return new Promise((resolve, reject) => {
      const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
      mysqlConnection.query(query, [title, content, postId], (err, result) => {
          if (err) {
              reject(err);
          } else {
              if (result.affectedRows > 0) {
                  resolve({ id: postId, title, content });
              } else {
                  reject({ error: 'Post não encontrado.' });
              }
          }
      });
  });
}

static likePost(postId) {
  return new Promise((resolve, reject) => {
      const query = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
      mysqlConnection.query(query, [postId], (err, result) => {
          if (err) {
              reject(err);
          } else {
              if (result.affectedRows > 0) {
                  resolve({ message: 'Post curtido com sucesso!' });
              } else {
                  reject({ error: 'Post não encontrado.' });
              }
          }
      });
  });
}

static deletePost(postId) {
  return new Promise((resolve, reject) => {
      const query = 'DELETE FROM posts WHERE id = ?';
      mysqlConnection.query(query, [postId], (err, result) => {
          if (err) {
              reject(err);
          } else {
              if (result.affectedRows > 0) {
                  resolve({ message: 'Post excluído com sucesso!' });
              } else {
                  reject({ error: 'Post não encontrado.' });
              }
          }
      });
  });
}
}

module.exports = Post;
