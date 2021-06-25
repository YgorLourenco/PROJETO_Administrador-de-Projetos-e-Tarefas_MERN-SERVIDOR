// Rotas para criar usuários
const express = require('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator')

// Criar um usuários
// api/usuarios
router.post('/', 
    [
        // check() e feito para verificar de maneira obrigatória uma informação do campo
        check('nome', 'O nome é obrigatório!').not().isEmpty(),
        check('email', 'Colocar um e-mail valido!').isEmail(),
        check('password','A senha deve ter no minimo 6 caracteres').isLength({min: 6})
    ],
    usuarioController.criarUsuario
);
module.exports = router;