const cepService = require('../Service/Cep');

require('dotenv').config();
const findCepByCode = async(req, res, next) => {
  const { id } = req.params;

  const dataCep = await cepService.findCepByCode(id);

  if(dataCep.error) return next(dataCep.error);

  res.status(200).json({message: 'cep ok'})
};

module.exports = {
  findCepByCode,
}