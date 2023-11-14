const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    console.log('Token recebido:', token);
    if (!token) return res.status(401).json({ error: 'Acesso não autorizado.' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token inválido.' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
