const mongoose = require('mongoose')

const ProjetoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    criador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    criado: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Projeto', ProjetoSchema)