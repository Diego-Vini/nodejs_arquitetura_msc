const express = require('express');
const bodyParser = require('body-parser');

const Author = require('./Controllers/Author');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

app.get('/authors', Author.getAll);

app.get('/authors/:id', Author.findById);

app.post('/authors', Author.create);

app.use(errorMiddleware);

const PORT = 3301;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))