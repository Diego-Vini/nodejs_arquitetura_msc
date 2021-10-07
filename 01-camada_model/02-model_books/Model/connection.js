const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'root',
  password: 'Dg@813650',
  port: 3307,
  host: 'localhost',
  database: 'model_example' 
});

module.exports = connection;

//Criando conexão com o banco de dados mysql