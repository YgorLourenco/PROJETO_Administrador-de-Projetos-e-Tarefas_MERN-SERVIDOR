const mongoose = require('mongoose')

const UsuariosSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Usuarios', UsuariosSchema)