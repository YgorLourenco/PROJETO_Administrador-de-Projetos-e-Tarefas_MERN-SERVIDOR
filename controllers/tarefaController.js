const Tarefa = require('../models/Tarefa')
const Projeto = require('../models/Projeto')
const { validationResult } = require('express-validator')

// Criar um nova tarefa
exports.criarTarefa = async (req, res) => {

    // Revisar se existe erros
    const erros = validationResult(req)
    if( !erros.isEmpty() ) {
        return res.status(400).json({erros: erros.array()})
    }

    

    try {

        // Extrair o projeto e comprovar que existe
        const {projeto} = req.body
        
        const existeProjeto = await Projeto.findById(projeto)
        if(!existeProjeto) {
            return res.status(404).json({msg: 'Projeto não encontrado'})
        }
        // Verificar o criador do projeto
        if(existeProjeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }

        // Criar a tarefa
        const tarefa = new Tarefa(req.body)
        await tarefa.save()
        res.json({tarefa})

    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }

}

// Obter as tarefas por projeto
exports.obterTarefas = async (req, res) => {


    try {

        // Extrair o projeto e comprovar que existe
        const {projeto} = req.query
        // console.log(req.query)
            
        const existeProjeto = await Projeto.findById(projeto)
        if(!existeProjeto) {
            return res.status(404).json({msg: 'Projeto não encontrado'})
        }
        // Verificar o criador do projeto
        if(existeProjeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }

        // Obter as tarefas por projeto
        const tarefas = await Tarefa.find({projeto}).sort({criado: -1})
        res.json({tarefas})

    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}

// Atualizar uma tarefa
exports.atualizarTarefa = async (req, res) => {
    try {

        // Extrair o projeto e comprovar que existe
        const {projeto, nome, estado} = req.body
        
        // Se existe tarefa ou não
        let tarefa = await Tarefa.findById(req.params.id)
        if(!tarefa) {
            return res.status(404).json({msg: 'Não existe essa tarefa!'})
        }

        // Extrair projeto
        const existeProjeto = await Projeto.findById(projeto)
        
        // Verificar o criador do projeto
        if(existeProjeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }

        // Criar um objeto com a nova informação
        const novaTarefa = {}
            novaTarefa.nome = nome
            novaTarefa.estado = estado

        // Guardar a tarefa
        tarefa = await Tarefa.findOneAndUpdate({_id : req.params.id}, novaTarefa, {new: true})

        res.json({tarefa})
        
        

    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}

// Elimina uma tarefa
exports.eliminarTarefa = async (req, res) => {
    try {
        // Extrair o projeto e comprovar que existe
        const {projeto} = req.query
        
        // Se existe tarefa ou não
        let tarefa = await Tarefa.findById(req.params.id)
        if(!tarefa) {
            return res.status(404).json({msg: 'Não existe essa tarefa!'})
        }

        // Extrair projeto
        const existeProjeto = await Projeto.findById(projeto)
        
        // Verificar o criador do projeto
        if(existeProjeto.criador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'Não Autorizado!'})
        }

        // Eliminar 
        await Tarefa.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarefa Eliminada'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Houve um erro!')
    }
}