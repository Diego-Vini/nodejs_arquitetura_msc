const connection = require('./connection');
const { ObjectId } = require('mongodb')

// Cria uma string com o nome completo do autor
const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;

  const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

    return {
      id,
      firstName,
      middleName,
      lastName,
      fullName,
    };
};

// Busca todos os autores do banco.

const getAll = async() => {
  return connection()
    .then((db) => db.collection('authors').find().toArray())
    .then((authors) => 
      authors.map(({ _id, firstName, middleName, lastName}) => 
        getNewAuthor({
          id: _id,
          firstName,
          lastName,
          middleName
        })
      )
    );
}

const findById = async(id) => {
  if (!ObjectId.isValid(id)) return null;

    const authorData = await connection()
    .then((db) => db.collection('authors').findOne(new ObjectId(id)))
    
    if(!authorData) return null;

    const { firstName, middleName, lastName } = authorData;

    return getNewAuthor({ firstName, middleName, lastName });

};

const isNonEmptyString = (value) => {
  if (!value) return false;

  return typeof value === 'string';
};

const isValid = (firstName, middleName, lastName) => {
  if (middleName && typeof middleName != 'string') return false;

  return isNonEmptyString(firstName) && isNonEmptyString(lastName);
};

const create = async (firstName, middleName, lastName) => {
  connection()
    .then((db) => db.collection('authors').insetOne({firstName, middleName, lastName}))
    .then((result) => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName}));
}

const findByName = async (firstName, middleName, lastName) => {
  const query = middleName
    ? {firstName, middleName, lastName}
    : {firstName, lastName};

    const author = connection()
      .then((db) => db.collection('authors').findOne(query));

    if (!author) return null;

    return getNewAuthor(author);
}

module.exports = {
    getAll,
    findById,
    isValid,
    create,
    findByName,
}