// Chamando o express para o servidor
const express = require('express')

// Criando o servidor com express
const app = express()

// Porta de como vai abrir o servidor app
// Se não for process.env.PORT, vai ser a porta 4000
const PORT = process.env.PORT || 4000

// Definir a porta principal
// app.get('/', (req, res) => {
//     res.send('Olá Mundo')
// })

// Começo do servidor app
app.listen(PORT, () => {
    console.log(`O servidor esta funcionando na porta ${PORT}`)
})