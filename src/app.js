const express = require('express')
const bd = require('./infra/sqlite-db')
const app = express()
const port = 3000

//Importando Controllers
const index = require('./Controller/index-controllers')
const tarefas = require('./Controller/tarefa-controller')
const usuarios = require('./Controller/usuario-controller')

//Importando Models
const User = require("./Models/UserModel")
const Task = require("./Models/TaskModel")

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use((req, res, next)=>{
  if(req.body){
    next()
  }else{
    res.send('Envie um body')
  }
})

//Rotas
index(app)
tarefas(app)
usuarios(app)

// bd.all("SELECT * FROM TAREFAS", (error, rows)=>{
//   console.log(rows)
// })


//Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
