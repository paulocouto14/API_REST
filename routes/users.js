const express = require('express')
const router = express.Router()
const User = require('../dbs/usuario')
require('dotenv').config()


router.get('/',async (req, res, next) => {
  await User.find().then((data) => {

    data.forEach((data) => {
      res.json({
        id:data._id,
        usuario:data.user,
        permision:data.perm
      });
    })
    
  })
});


router.put('/:user/:permi',async (req, res, next) => {

  await User.findOneAndUpdate({user:req.params.user},{perm:req.params.permi}).exec().then(() => {
    res.json({
      msg:'PERMISSÕES ALTERADA COM SUCESSO!'
    })
  }).catch(() => {
    res.json({
      msg:'ERRO AO ALTERAR PERMISSÃO DE USUARIO!'
    })
  })

})

router.delete('/:delete', async (req, res, next) => {
  
  await User.findOneAndRemove({user:req.params.delete}).then(() => {
    res.json({
      msg:'USUARIO DELETADO COM SUCESSO!'
    })
  }).catch(() => {
    res.json({
      msg:'ERRO AL DELETAR USUARIO!'
    })
  })

})


module.exports = router;
