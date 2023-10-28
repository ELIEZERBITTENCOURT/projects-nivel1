const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const errorHandler = require('./middlewares/errorHandler');
const initDB = require('./config/initDB'); 

const app = express();
const PORT = 3000;

initDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

// Middleware para tratamento de erros
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});

module.exports = app;
