// Chamando o express para o servidor
const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')

// Criando o servidor com express
const app = express()

// Conectar a base de dados
conectarDB();

// Habilidade cors
app.use(cors())

// Habilitar express.json
app.use(express.json({extended: true}));


// Porta de como vai abrir o servidor app
// Se não for process.env.PORT, vai ser a porta 4000
const PORT = process.env.PORT || 4000

// Importar rotas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projetos', require('./routes/projetos'))
app.use('/api/tarefas', require('./routes/tarefas'))

// Definir a porta principal
// app.get('/', (req, res) => {
//     res.send('Olá Mundo')
// })

// Começo do servidor app
app.listen(PORT, () => {
    console.log(`O servidor esta funcionando na porta ${PORT}`)
})