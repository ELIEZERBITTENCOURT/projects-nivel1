require('dotenv').config();
const authenticateToken = require('../middlewares/authenticateToken');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Rota para criar uma nova conta
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ error: 'E-mail já está em uso.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.createUser({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Conta criada com sucesso!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar a conta.' });
    }
});


// Rota para fazer login
router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    if (!usernameOrEmail) {
        return res.status(400).json({ error: 'Nome de usuário ou email é obrigatório.' });
    }

    let user;
    if (usernameOrEmail.includes('@')) {
        user = await User.findByEmail(usernameOrEmail);
    } else {
        user = await User.findByUsername(usernameOrEmail);
    }

    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token, userName: user.name, userEmail: user.email  });
});

// Rota para alterar a senha do usuário
router.put('/change-password', authenticateToken, async (req, res) => {
    const userId = req.user.userId;
    const { newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.changePassword(userId, hashedPassword);
        res.json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao alterar a senha.' });
    }
});

// Rota para editar o perfil do usuário
router.put('/edit-profile', async (req, res) => {
    const userId = req.user.userId;
    const { nome, sobrenome } = req.body;

    try {
        await User.editProfile(userId, { nome, sobrenome });
        res.json({ message: 'Informações pessoais atualizadas com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar as informações pessoais.' });
    }
});

// Rota para atualizar as preferências de comunicação do usuário
router.put('/update-preferences', async (req, res) => {
    const userId = req.user.userId;
    const { emailNotifications, messageNotifications } = req.body;

    try {
        await User.updatePreferences(userId, { emailNotifications, messageNotifications });
        res.json({ message: 'Preferências de comunicação atualizadas com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar as preferências de comunicação.' });
    }
});

module.exports = router;
