const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {
    const erros = validationResult(req)
    if( !erros.isEmpty() ) {
        return res.status(400).json({erros: erros.array()})
    }

    // Extrair o email e password
    const { email, password} = req.body

    try {
        // Revisar que há um usuario registrado
        let usuario = await Usuario.findOne({email})
        if(!usuario) {
            return res.status(400).json({msg: 'O Usuario não existe'})
        }
        // Revisar o password
        const passCorreto = await bcryptjs.compare(password, usuario.password)
        if(!passCorreto) {
            return res.status(400).json({msg: 'Password Incorreto'})
        }
        
        // Se estiver todo correto // Criar e formar o JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // Formar o JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensagem de confirmação
            res.json({token})
        })
    } catch (error) {
        console.log(error)
    }

}

// Obter autenticação para o usuario
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Houve um erro'})
    }
}