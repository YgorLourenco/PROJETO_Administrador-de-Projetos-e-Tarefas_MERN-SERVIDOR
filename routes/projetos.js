const express = require('express')
const router = express.Router();
const projetoController = require('../controllers/projetoController')
const auth = require('../middleware/auth') 
const { check } = require('express-validator')

// Criar projetos
// api/projetos
router.post('/',
    auth,
    [
        check('nome','O nome do projeto é obrigatório').not().isEmpty()
    ],
    projetoController.criarProjeto
)

// Obter todos os projetos
router.get('/',
    auth,
    projetoController.obterProjetos
)

// Atualizar projetos via ID
router.put('/:id',
    auth,
    [
        check('nome','O nome do projeto é obrigatório').not().isEmpty()
    ],
    projetoController.atualizarProjeto
)

// Eliminar 
router.delete('/:id',
    auth,
    projetoController.eliminarProjeto
)

module.exports = router;