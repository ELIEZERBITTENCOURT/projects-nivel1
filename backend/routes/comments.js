const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const Comment = require('../models/Comment');

/// Rota para obter todos os comentários de um post
router.get('/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      const comments = await Comment.getAllComments(postId);
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter os comentários.' });
    }
  });
  
  // Rota para criar um comentário (autenticada)
  router.post('/create', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { postId, content } = req.body;
  
      const newComment = await Comment.createComment(userId, postId, content);
  
      res.status(201).json({ message: 'Comentário criado com sucesso.', comment: newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o comentário.' });
    }
  });

// Rota para editar um comentário existente
router.put('/:commentId', authenticateToken, async (req, res) => {
    const commentId = req.params.commentId;
    const { content } = req.body;
    const userId = req.user.userId;

    try {
        const comment = await Comment.getCommentById(commentId);
        if (comment.userId !== userId) {
            return res.status(403).json({ error: 'Usuário não autorizado para editar este comentário.' });
        }

        const updatedComment = await Comment.editComment(commentId, content);
        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar o comentário.' });
    }
});

// Rota para curtir um comentário
router.put('/:commentId/like', authenticateToken, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;

    try {
        await Comment.likeComment(userId, commentId);
        res.json({ message: 'Comentário curtido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao curtir o comentário.' });
    }
});

// Rota para descurtir um comentário
router.put('/:commentId/unlike', authenticateToken, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;

    try {
        await Comment.unlikeComment(userId, commentId);
        res.json({ message: 'Comentário descurtido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao descurtir o comentário.' });
    }
});

// Rota para excluir um comentário existente
router.delete('/:commentId', authenticateToken, async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user.userId;

    try {
        const comment = await Comment.getCommentById(commentId);
        if (comment.userId !== userId) {
            return res.status(403).json({ error: 'Usuário não autorizado para excluir este comentário.' });
        }

        await Comment.deleteComment(commentId);
        res.json({ message: 'Comentário excluído com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o comentário.' });
    }
});



module.exports = router;
