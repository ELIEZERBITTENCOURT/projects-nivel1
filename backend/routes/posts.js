// routes/post.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authenticateToken = require('../middlewares/authenticateToken');

// Rota para obter todos os posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os posts.' });
  }
});

// Rota para criar um post (autenticada)
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, content } = req.body;

    const newPost = await Post.createPost(userId, title, content);

    res.status(201).json({ message: 'Post criado com sucesso.', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o post.' });
  }
});

// Rota para editar um post existente
router.put('/:postId', authenticateToken, async (req, res) => {
  const postId = req.params.postId;
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const post = await Post.getPostById(postId);
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Usuário não autorizado para editar este post.' });
    }

    const updatedPost = await Post.editPost(postId, title, content);
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao editar o post.' });
  }
});

// Rota para curtir um post
router.put('/:postId/like', authenticateToken, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    await Post.likePost(userId, postId);
    res.json({ message: 'Post curtido com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao curtir o post.' });
  }
});

// Rota para excluir um post existente
router.delete('/:postId', authenticateToken, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.userId;

  try {
    const post = await Post.getPostById(postId);
    if (post.userId !== userId) {
      return res.status(403).json({ error: 'Usuário não autorizado para excluir este post.' });
    }

    await Post.deletePost(postId);
    res.json({ message: 'Post excluído com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o post.' });
  }
});

module.exports = router;
