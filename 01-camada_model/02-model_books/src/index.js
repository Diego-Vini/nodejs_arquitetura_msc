const express = require('express');
const Book = require('../Model/Books')

const app = express();

app.get('/books', async(req, res) => {
  const dataBooks = await Book.getAll();

  res.status(200).json(dataBooks);
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;

  const booksAuthor = await Book.getByAuthorId(id);

  if (!booksAuthor) return res.status(401).json({message: 'Autor não encontrado'});

  res.status(200).json(booksAuthor)
})

const PORT = 3302;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});

