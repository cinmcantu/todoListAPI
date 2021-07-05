const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(
      '<h1>Bem vindo a To Do List</h1>'
    )
})

app.get('/usuario', (req, res) => {
    res.send(
        'Rota ativada com GET e recurso <strong>Usuario</strong> valores de <strong>Usuario</strong> devem ser retornados'
    )
})

app.get('/tarefa', (req, res) => {
    res.send(
        'Rota ativada com GET e recurso <strong>Tarefas</strong> valores de <strong>Tarefas</strong> devem ser retornados'
    )
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})