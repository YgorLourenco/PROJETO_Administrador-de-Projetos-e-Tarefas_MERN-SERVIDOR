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
        const projetos = await Projeto.find({criador: req.usuario.id}).sort({criado: -1 })
        res.json({projetos})
    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}

// Atualizar um projeto
exports.atualizarProjeto = async (req, res) => {
    // Revisar se existe erros
    const erros = validationResult(req)
    if( !erros.isEmpty() ) {
        return res.status(400).json({erros: erros.array()})
    }

    // Extrair a informação do projeto
    const {nome} = req.body
    const novoProjeto = {}

    if(nome) {
        novoProjeto.nome = nome
    }

    try {
        // Revisar o ID
        // console.log(req.params.id)
        let projeto = await Projeto.findById(req.params.id)

        // Se o projeto existe ou não
        if(!projeto) {
            return res.status(404).json({msg: 'Projeto não encontrado'})
        }

        // Verificar o criador do projeto
        if(projeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }

        // Atualizar
        projeto = await Projeto.findByIdAndUpdate({_id: req.params.id}, {$set: novoProjeto}, {new: true})
        res.json({projeto})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error no servidor')
    }
}

// Eliminar um projeto por sua id
exports.eliminarProjeto = async (req, res) => {
        
    try {
        // Revisar o ID
        // console.log(req.params.id)
        let projeto = await Projeto.findById(req.params.id)

        // Se o projeto existe ou não
        if(!projeto) {
            return res.status(404).json({msg: 'Projeto não encontrado'})
        }

        // Verificar o criador do projeto
        if(projeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }       

        // Eliminar o Projeto
        await Projeto.findOneAndRemove({_id : req.params.id})
        res.json({msg: 'Projeto Eliminado!'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error no servidor')
    }
}