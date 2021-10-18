const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool({
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  port: process.env.PORT_SQL,
  host: process.env.HOST,
  database: process.env.DATABASE,
});

module.exports = connection
