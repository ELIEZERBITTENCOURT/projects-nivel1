const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');
const Post = require('../models/Post');

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

// Rota para excluir um comentário de um post específico
router.delete('/:postId/comments/:commentId', async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    try {
        await Comment.deleteComment(commentId);
        res.json({ message: 'Comentário excluído com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o comentário.' });
    }
});

// Rota para excluir todos os comentários de um post específico antes de excluir o post
router.delete('/:postId/comments/all', async (req, res) => {
    const postId = req.params.postId;
    try {
        await Comment.deleteAllComments(postId);

        await Post.deletePost(postId);

        res.json({ message: 'Post e seus comentários foram excluídos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o post e seus comentários.' });
    }
});


module.exports = router;
