const connection = require('./connection');

const { ObjectId } = require('mongodb')

const createFullName = ({id, firstName, middleName, lastName}) => {
  const fullName = [firstName, middleName, lastName]
  .filter((name) => name).join(" ");

  return newData = {
    id,
    firstName,
    middleName,
    lastName, 
    fullName
  }
}

const serealizer = (dataAuthors) => {
  return newAuthors = {
    id: dataAuthors.id,
    firstName: dataAuthors.first_name,
    middleName: dataAuthors.middle_name,
    lastName: dataAuthors.last_name
  }
}

const getAll = async () => {
    return connection()
      .then((db) => db.collection('authors').find().toArray())
      .then((authors) =>
        authors.map(({_id, firstName, middleName, lastName}) => 
          createFullName({
            id: _id,
            firstName,
            middleName,
            lastName,
          })
        ))
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const authorData = await connection()
  .then((db) => db.collection('authors').findOne(ObjectId(id)));

  if(!authorData) return null;

  const { firstName, middleName, lastName } = authorData;
  
  return createFullName({
    id,
    firstName,
    middleName,
    lastName,
  })

}

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!middleName || typeof middleName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  
  return true;
}

const create = async(firstName, middleName, lastName) => {
  connection()
  .then((db) => db.collection('authors').insertOne({firstName, middleName, lastName}))
  
}

module.exports = {
  getAll,
  findById,
  isValid,
  create,
}