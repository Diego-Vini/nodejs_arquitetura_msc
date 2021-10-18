const connection = require('./connection');

const findCepByCode = async (cep) => {
  
  const [dataCep] = await connection.execute(
    'SELECT * FROM ceps WHERE cep = ?',
    [cep]
 )

 return dataCep;
}

module.exports = {
  findCepByCode,
}