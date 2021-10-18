const modelCep = require('../Model/Cep');

const REGEXCEP = /^\d{5}-*\d{3}/;

const findCepByCode = async(cep) => {
  if (!REGEXCEP.test(cep)) {
    return {
        error: {
          code: "invalidData",
          message: "CEP inválido",
        } 
      }
  }
  

  const dataCep = await modelCep.findCepByCode(cep);

  return dataCep
};

module.exports = {
  findCepByCode,
}