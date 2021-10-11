const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async(firstName, lastName, email, password) => {
  return connection()
    .then((db) => db.collection('users').insertOne(
      {firstName, lastName, email, password}
    ))
    .then((result) => (
        {
          id: result.insertedId,
          firstName,
          lastName,
          email,
        }
    ));    
}

const getAllUsers = async() => {
  return connection()
    .then((db) => db.collection('users').find().toArray())
    .then((users) => users.map((r) => ({
      id: r._id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email
    }) 
  ));
}

const findById = async(id) => {
  const dataId = connection()
    .then((db) => db.collection('users').findOne(ObjectId(id)))
    .then((r) => ({
      id: r._id,
      firstNmae: r.firstName,
      lastName: r.lastName,
      email: r.email,
    }))
    .catch((err) => {
      err.message
    })

    return dataId;
}

module.exports = { 
  createUser,
  getAllUsers,
  findById,
}