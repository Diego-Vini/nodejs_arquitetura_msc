const express = require ('express');
const bodyParser = require('body-parser');
const User = require('../Model/User')
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
      const messageErrors = errors.array()
      const msgError = (messageErrors.map((r) => {
        return {
          "error": true,
          "message": r.msg,
        }
      }))
      return res.status(400).json(msgError)
    }
    const { firstName, lastName, email, password} = req.body;

   const createUser = await User
     .createUser(firstName, lastName, email, password)

    res.status(201).json(createUser)
});

app.get('/users', async(_req, res) => {
  const getAllUsers = await User.getAllUsers();

  if (!getAllUsers) return res.status(401).json([])

  res.status(200).json(getAllUsers)
})

const PORT = 3003;

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));