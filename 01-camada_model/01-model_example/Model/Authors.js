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
    const [authors] = await connection.execute(
        'SELECT id, first_name, middle_name, last_name FROM authors'
        );

    return authors.map(serealizer).map(createFullName)
};

module.exports = {
  getAll,
}