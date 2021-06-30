const express = require('express')
const router = express.Router();
const tarefaController = require('../controllers/tarefaController')
const auth = require('../middleware/auth') 
const { check } = require('express-validator')

// Criar uma tarefa
// api/tarefas
router.post('/',
    auth,
    [
        check('nome','O nome da tarefa é obrigatório').not().isEmpty(),
        check('projeto','O nome do projeto é obrigatório').not().isEmpty()
    ],
    tarefaController.criarTarefa
)

// Obter as tarefas por projetos
router.get('/',
    auth,
    tarefaController.obterTarefas
)

// Atualizar tarefa
router.put('/:id',
    auth,
    tarefaController.atualizarTarefa
)

// Eliminar tarefa
router.delete('/:id',
    auth,
    tarefaController.eliminarTarefa
)

module.exports = router;