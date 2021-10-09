const { ObjectId } = require('mongodb');
const connection = require('./connection');

//Função que busca informações no banco
async function getAll () {
  return connection()
  .then((db) => db.collection('books').find().toArray())
  .then((books) => books.map((book) => book ))
};

//Função que busca por livros por id do autor
async function getByAuthorId (id) {
  const booksData = await connection()
  .then((db) => db.collection('books').find({author_id: Number(id)}).toArray());
 
  if(!booksData) return null;

  return booksData;
}

async function findAuthorId (id) {

  console.log(id)
  if(!ObjectId.isValid(id)) return null;

  const authorIdData = await connection()
  .then((db) => db.collection('books').findOne(ObjectId(id)));

  console.log(authorIdData)

  if(!authorIdData) return null;

  const { title, author_id } = authorIdData;

  return { id, title, author_id};
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