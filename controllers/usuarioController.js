const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.criarUsuario = async (req, res) => {

    // Revisar se existe erros
    const erros = validationResult(req)
    if( !erros.isEmpty() ) {
        return res.status(400).json({erros: erros.array()})
    }

    // Extair email e password
    const {email, password} = req.body
    
    try {
        // Revisar o que o usuario registra ser unico
        //.findOne acha só um valor
        let usuario = await Usuario.findOne({email})

        if(usuario){
            return res.status(400).json({ msg: 'O usuario já existe'})
        }
        
        // Criar o novo usuario
        usuario = new Usuario(req.body)

        // Criptografar o password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt)

        // Guardar usuario
        await usuario.save()

        // Criar e formar o JWT
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

        // // Mensagem de confirmação
        // res.json({ msg: 'Usuario criado corretamente'})
    } catch (error) {
        console.log(error)
        res.status(400).send('Houve um erro!')
    }
}