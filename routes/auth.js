// Rotas para autenticar usuarios
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const auth = require('../middleware/auth')
const authController = require('../controllers/authController')

// Iniciar sessão
// api/auth
router.post('/', 
    [
        check('email', 'Colocar um e-mail valido!').isEmail(),
        check('password','A senha deve ter no minimo 6 caracteres').isLength({min: 6})
    ],
    authController.autenticarUsuario
);

// Obter o usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router;