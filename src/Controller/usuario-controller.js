const User = require("../Models/UserModel")
const bd = require("../infra/bd")

const rotaUsers = (app) =>{
    app.get('/usuarios', (req, res) => {
        res.json({ 
            "result": bd.users,
            "count": bd.users.length
        })
    })
    app.post('/usuarios', (req, res) =>{
        console.log(req.body)
        res.send(
            'Rota ativada com POST: <strong>Usuarios</strong> ativada com banco de dados'
        )
    })
    app.get('/usuarios/:email', (req, res) =>{
        const emailRecebido = req.params.email
        const usuariosFiltrados = bd.users.filter((user => user.email == emailRecebido))
        res.json({ 
            "result": usuariosFiltrados,
            "count": usuariosFiltrados.length
        })
    })
    app.delete('/usuarios/:email', (req, res) =>{
        const emailRecebido = req.params.email
        bd.users = bd.users.filter((user => user.email !== emailRecebido))

        res.json({ 
            "result": `Usuário(s) de email ${emailRecebido} foi/foram removido(s)`,
            "error": false
        })
    })
    app.post('/usuarios/create', (req, res)=>{
        const {nome, email, senha} = req.body
        const novoUsuario = new User(nome, email, senha)
        bd.users.push(novoUsuario)
        res.json({
            message: "Usuário criado com sucesso",
            error: false
        })
    })

}

module.exports = rotaUsers