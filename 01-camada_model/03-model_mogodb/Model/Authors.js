const connection = require('./connection');

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
  const [authorData] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM authors WHERE id = ?',
    [id]
    );

    if (authorData.length === 0) return null;

    const { firstName, middleName, lastName} = serealizer(authorData[0]);

    return createFullName({
      id,
      firstName,
      middleName, 
      lastName
    });
}

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!middleName || typeof middleName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  
  return true;
}

const create = async(firstName, middleName, lastName) => {
  connection.execute('INSERT INTO authors (first_name, middle_name, last_name)' 
  + 'VALUES (?, ?, ?)',
  [firstName, middleName, lastName]
  )
}

module.exports = {
  getAll,
  findById,
  isValid,
  create,
}