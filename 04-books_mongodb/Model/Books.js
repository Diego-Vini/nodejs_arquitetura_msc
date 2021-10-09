const connection = require('./connection');

//Função que busca informações no banco
async function getAll () {
  const [books] = await connection.execute(
    'SELECT * FROM books'
  );

  return books
};

//Função que busca por livros por id do autor
async function getByAuthorId (id) {
  const [booksId] = await connection.execute(
    'SELECT * FROM books WHERE author_id = ?',
    [id]
  );

  if(booksId.length === 0) return null;

  return booksId;
}

async function findAuthorId (id) {
  const [authorId] = await connection.execute(
    'SELECT * FROM books WHERE id = ?',
    [id]
  );

  if(authorId.length === 0) return null;

  return authorId;
}

const isValidTitle = async (title) => {
  
  if (!title || title.length < 3) {

    return false;
  } 
  return true;
}

const isValidAuthor = async(author_id) => {
  const checkAuthorId = await getByAuthorId(author_id);

  console.log(typeof checkAuthorId)
  
  if (!checkAuthorId) return false;

  return true;
}

const createBooks = (title, author_id) => {
  connection.execute(
    'INSERT INTO books (title, author_id) Values(?, ?)',
    [title, author_id]
    );
}

module.exports = {
  getAll,
  getByAuthorId,
  findAuthorId,
  isValidTitle,
  isValidAuthor,
  createBooks,
};