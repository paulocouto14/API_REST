const express = require('express')
const router = express.Router()
const User = require('../dbs/usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.get('/', (req, res, next) => {

  res.json({
    msg:'CRIE SUA CONTA'
  })
  
});

router.post('/login', async (req, res, next) => {

  const user = req.body.usuario
  const senha = req.body.senha

  const usuario = await User.findOne({user:user})

  if(!usuario){
      res.redirect('/')
  }else if (usuario){
      const coferesenha = await bcrypt.compare(senha ,usuario.pass)
      // console.log('bateu no usuario')

      if(coferesenha){
          
        const token = jwt.sign({
            id:usuario.usuario,                
        },process.env.SECRET_JWT, { expiresIn: '1h' })

        res.cookie('jwt', token ,{ httpOnly: true}).redirect('/adm/')

        console.log(token)
          
      }else if(!coferesenha){
          res.redirect('/')
      }
  }

});

router.post('/', async (req, res, next) => {

  const usuario = req.body.usuario
  const senha = req.body.senha
  const permicao = req.body.perm

  const salt = await bcrypt.genSalt(12)
  const hashsenha = await bcrypt.hash(senha, salt)
  
  new User({
    user:usuario,
    pass:hashsenha,
    perm:permicao
  }).save().then(() => {
    res.json({
      msg:'USUARIO CRIADO COM SUCESSO!'
    })
  }).catch(() => {
    res.json({
      msg:'ERRO AO CRIA USUARIO!'
    })
  })
  
})



module.exports = router;
