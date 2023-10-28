const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');

// Rota para criar um novo comentário
router.post('/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    const { text } = req.body;
    try {
        const newComment = await Comment.createComment(postId, text);
        res.json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o comentário.' });
    }
});

// Rota para obter todos os comentários de um post específico
router.get('/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.getAllComments(postId);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os comentários.' });
    }
});

// Rota para curtir um comentário
router.put('/comments/:commentId/like', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        await Comment.likeComment(commentId);
        res.json({ message: 'Comentário curtido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao curtir o comentário.' });
    }
});

// Rota para excluir um comentário
router.delete('/comments/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        await Comment.deleteComment(commentId);
        res.json({ message: 'Comentário excluído com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o comentário.' });
    }
});

// Rota para responder a um comentário
router.post('/comments/:commentId/reply', async (req, res) => {
    const commentId = req.params.commentId;
    const { text } = req.body;
    try {
        const newReply = await Comment.createComment(commentId, text);
        res.json(newReply);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a resposta ao comentário.' });
    }
});

module.exports = router;
