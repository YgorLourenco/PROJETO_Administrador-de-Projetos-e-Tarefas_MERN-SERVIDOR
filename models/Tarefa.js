const mongoose = require('mongoose')

const TarefaSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false,
    },
    criado: {
        type: Date,
        default: Date.now()
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projeto'
    },
})

module.exports = mongoose.model('Tarefa', TarefaSchema)