const express = require('express');
const Author = require('./Model/Authors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/authors', async(req, res) => {
  const dataAuthors = await Author.getAll();

  if (!dataAuthors) return res.status(400).json({ message: 'Falha'});

  res.status(200).json(dataAuthors);

});

app.get('/authors/:id', async(req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Not Found'});

  res.status(200).json(author);
})

app.post('/authors', async(req, res) => {
  const { first_name, middle_name, last_name} = req.body;

  if (!Author.isValid(first_name, middle_name, last_name)) {
    return res.status(400).json({ message: 'Dados Inválidos'})
  };

  await Author.create(first_name, middle_name, last_name);

  res.status(201).json('Autor criado com sucesso!')

})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`)
});