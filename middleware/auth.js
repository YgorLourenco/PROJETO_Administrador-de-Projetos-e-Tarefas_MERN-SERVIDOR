const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    // Ler o token do Header
    const token = req.header('x-auth-token')

    // console.log(token)
    // Revisar se não há token
    if(!token) {
        return res.status(401).json({msg: 'Não há token, permissão invalida!'})
    }

    // Validar o Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA)
        req.usuario = cifrado.usuario
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token invalido! '})
    }
}