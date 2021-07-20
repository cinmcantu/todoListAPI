const Task = require("../Models/TaskModel")
const bd = require("../infra/sqlite-db")

const rotaTarefa = (app) =>{
    app.get('/tarefas', (req, res) =>{
        const tarefas = bd.all("SELECT * FROM TAREFAS", (error, rows)=>{
            if(error){
                res.json({ 
                    "message": error,
                    "error": true
                })
            }
            res.json({ 
                "result": rows,
                "count": rows.length
            })
        })
    })
    app.post('/tarefas', (req, res) =>{
        console.log(req.body)
        res.send(
            'Rota ativada com POST: <strong>Tarefas</strong> ativada com banco de dados'
        )}
    )
    app.post('/tarefas/create', (req, res)=>{
        const {id_usuario, titulo, descricao, status, data_criacao} = req.body
        const novaTarefa = new Task(id_usuario, titulo, descricao, status, data_criacao)
        bd.tasks.push(novaTarefa)
        res.json({
            message: "Tarefa criada com sucesso",
            error: false
        })
    })
    app.get('/tarefas/:ttulo', (req, res) =>{
        const tituloRecebido = req.params.titulo
        const tarefasFiltradas = bd.tasks.filter((task => task.titulo == tituloRecebido))
        res.json({ 
            "result": tarefasFiltradas,
            "count": tarefasFiltradas.length
        })
    })
    app.delete('/tarefas/:titulo', (req, res) =>{
        const tituloRecebido = req.params.titulo
        bd.tasks = bd.tasks.filter((task => task.email !== tituloRecebido))

        res.json({ 
            "result": `Tarefa de título ${tituloRecebido} foi removida`,
            "error": false
        })
    })
}


module.exports = rotaTarefa