const express = require ('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require ('express-validator');

const app = express();

app.use(bodyParser.json());

app.post('/user', [
  body('firstName').
  notEmpty().withMessage('Campo nome não pode estar em branco'),
  body('lastName').notEmpty().
  withMessage('Campo sobrenome não pode estar em branco'),
  body('email').notEmpty().
  withMessage('Campo e-mail não pode estar em branco'),
  body('email').isEmail().
  withMessage('O campo e-mail deve conter o formato "exemplo@exemplo.com"'),
  body('password').notEmpty().
  withMessage('Campo senha não pode estar em branco'),
  body('password').isString().
  withMessage('Campo senha deve conter somente caracteres'),
  body('password').isLength({ min: 6 }).
  withMessage('Campo senha deve conter no minimo 6 caracteres'),
 ],
  async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json( {errors: errors.array() })
    }
    const { firstName, lastName, email, password} = req.body;

    res.status(201).json({ message: 'Sucesso'})
})

const PORT = 3003;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));