require('dotenv').config();
const authenticateToken = require('../middlewares/authenticateToken');
const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// Rota para criar uma nova conta
router.post('/signup', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já está em uso.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.createUser({
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'Conta criada com sucesso.', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a conta.' });
    }
  });

// Rota para fazer login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  });

// Rota para alterar a senha do usuário
router.post('/change-password', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { newPassword } = req.body;
  
      await User.changePassword(userId, newPassword);
  
      res.json({ message: 'Senha alterada com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao alterar a senha.' });
    }
  });
  
// Rota de usuário autenticado para criar um post
router.post('/create-post', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { title, content } = req.body;
  
      const newPost = await Post.create({
        title,
        content,
        userId,
      });
  
      res.status(201).json({ message: 'Post criado com sucesso.', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o post.' });
    }
  });
  
  // Rota para criar um novo comentário pelo usuário autenticado
  router.post('/create-comment', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { postId, content } = req.body;
  
      const newComment = await Comment.create({
        userId,
        postId,
        content,
      });
  
      res.status(201).json({ message: 'Comentário criado com sucesso.', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o comentário.' });
    }
  });
  

module.exports = router;
