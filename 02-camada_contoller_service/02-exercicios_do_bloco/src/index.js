const express = require('express');
require('dotenv').config();
const cepController = require('./Controller/Cep')
const errorMiddleware = require('./Middleware/error')

const app = express();

app.get('/cep/:id', cepController.findCepByCode);

app.use(errorMiddleware)

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));