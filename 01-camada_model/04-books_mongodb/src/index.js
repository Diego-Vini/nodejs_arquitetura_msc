const express = require('express');
const Book = require('../Model/Books');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/books', async(req, res) => {
  const dataBooks = await Book.getAll();

  res.status(200).json(dataBooks);
});

app.get('/books/author', async (req, res) => {
  const { authorId } = req.query;
  const booksAuthor = await Book.getByAuthorId(authorId);

  if (!booksAuthor) return res.status(401).json({message: 'Autor não encontrado'});

  res.status(200).json(booksAuthor)
});

app.get('/books/:id', async (req, res) => {
    const  { id } = req.params;

    const book = await Book.findAuthorId(id);
  
    if (!book) return res.status(400).json({ message: 'Not found' });
  
    res.status(200).json(book);
  });


app.post('/books', async(req, res) => {
  const {title, author_id} = req.body;

  const validateTitle = await Book.isValidTitle(title);
  const ValidateAuthorId = await Book.isValidAuthor(author_id);

  if (!validateTitle) return res.status(404).json(
    {message: "Titulo não pode ser vazio ou menor que 3 letras"}
    );

  if(!ValidateAuthorId) return res.status(401).json(
    {message: "Autor inexistente"}
    );

  await Book.createBooks(title, author_id);
  
  res.status(201).json({message: 'Livro cadastrado com sucesso!'})
})



const PORT = 3302;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});

