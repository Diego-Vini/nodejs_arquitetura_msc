const { Result } = require('express-validator');
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

module.exports = { 
  createUser,
  getAllUsers,
}