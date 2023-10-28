const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comments')

// Rota para obter todos os posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.getAllPosts();
        const postsWithComments = await Promise.all(posts.map(async (post) => {
            const comments = await Comment.getAllComments(post.id);
            return {
                ...post,
                comments: comments
            };
        }));
        res.json(postsWithComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter os posts.' });
    }
});

// Rota para criar um novo post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = await Post.createPost(title, content);
        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o post.' });
    }
});

// Rota para editar um post existente
router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.editPost(postId, title, content);
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao editar o post.' });
    }
});

// Rota para curtir um post
router.put('/:postId/like', async (req, res) => {
    const postId = req.params.postId;
    try {
        await Post.likePost(postId);
        res.json({ message: 'Post curtido com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao curtir o post.' });
    }
});

// Rota para excluir um post existente
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        await Post.deletePost(postId);
        res.json({ message: 'Post excluído com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o post.' });
    }
});

module.exports = router;
