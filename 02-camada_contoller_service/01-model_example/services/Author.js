const Author = require('../Models/Author');

const getAll = async () => Author.getAll();

const findById = async (id) => {
  const author = await Author.findById(id);

  if (!author) {
    return {
      error: {
        code: 'not found',
        message: `Não foi possivel encontrar um autor com id${id}`
      },
    };
  }
  
  return author;
};

const create = async (firstName, middleName, lastName) => {
  const existingAuthor = await Author.findByName(firstName, middleName, lastName);

  if(existingAuthor) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Um autor já existe com esse nome completo',
      }
    }
  }
  
  return Author.create(firstName, middleName, lastName);
  
}

module.exports = {
  getAll,
  findById,
  create,
}