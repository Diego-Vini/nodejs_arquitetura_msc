const express = require('express');
const Author = require('./Model/Authors')
const app = express();

app.get('/authors', async(req, res) => {
  const dataAuthors = await Author.getAll();

  if (!dataAuthors) return res.status(400).json({ message: 'Falha'});

  res.status(200).json(dataAuthors);

});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`)
});