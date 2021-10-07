const connection = require('./connection');

//Função que busca informações no banco
async function getAll () {
  const [books] = await connection.execute(
    'SELECT * FROM books'
  );

  return books
};

async function getByAuthorId (id) {
  const [booksId] = await connection.execute(
    'SELECT * FROM books WHERE author_id = ?',
    [id]
  );

  if(booksId.length === 0) return null;

  return booksId;
}

module.exports = {
  getAll,
  getByAuthorId,
};