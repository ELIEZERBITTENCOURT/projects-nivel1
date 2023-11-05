require('dotenv').config();
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
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login bem-sucedido!', token });
});

module.exports = router;
