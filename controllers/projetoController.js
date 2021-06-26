const Projeto = require('../models/Projeto')
const { validationResult } = require('express-validator')

exports.criarProjeto = async (req, res) => {

    // Revisar se existe erros
    const erros = validationResult(req)
    if( !erros.isEmpty() ) {
        return res.status(400).json({erros: erros.array()})
    }


    try {
        // Criar um novo projeto
        const projeto = new Projeto(req.body)

        // Guardar o criador via JWT
        projeto.criador = req.usuario.id

        // Guardando o projeto
        projeto.save()
        res.json(projeto)

    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}
// Obter todos os projetos do usuario atual
exports.obterProjetos = async (req, res) => {
    try {
        // console.log(req.usuario)
        const projetos = await Projeto.find({criador: req.usuario.id}).sort({criado: -1})
        res.json({projetos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}