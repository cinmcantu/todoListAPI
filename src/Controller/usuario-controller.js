const User = require("../Models/UserModel")
const db = require("../infra/sqlite-db")
const UserDAO = require("../DAO/UserDAO")

const rotaUsers = (app) =>{
    const userBanco = new UserDAO(db)

    app.get('/usuarios', (req, res) => {
        userBanco.getAllUsers()
        .then((rows)=>{
            res.json({
                "result": rows,
                "rows": rows.length
            })
        })
        .catch((error)=>{
            res.json({
                "message": error.message,
                "error" : true
            })
        })

    })
    app.get('/usuarios/:email', (req, res) =>{
        const emailRecebido = req.params.email
        const usuariosFiltrados = bd.users.filter((user => user.email == emailRecebido))
        res.json({ 
            "result": usuariosFiltrados,
            "count": usuariosFiltrados.length
        })
    })
    app.post('/usuarios/create', (req, res)=>{
        const {id, nome, email, senha} = req.body
        const novoUsuario = new User(id, nome, email, senha)
        try{
            bd.run(`INSERT INTO USUARIOS (nome, email, senha) VALUES (?,?,?)`,
            novoUsuario.nome, novoUsuario.email, novoUsuario.senha,
            (err)=>{
                if(err)
                    throw new Error(`Erro ao inserir: ${err.message}`)
            })
            res.json({ 
                "message": `Usuário ${novoUsuario.nome} inserido`,
                "error": false
            })
        }catch{(e)=>{
            res.json({ 
                "message": e.message,
                "error": true
            })
        }}
    })
    app.delete('/usuarios/:email', (req, res) =>{
        const emailRecebido = req.params.email
        bd.users = bd.users.filter((user => user.email !== emailRecebido))

        res.json({ 
            "result": `Usuário(s) de email ${emailRecebido} foi/foram removido(s)`,
            "error": false
        })
    })
    app.put("/usuarios/:email", (req, res)=>{
        const emailRecebido = req.params.email
        const updateUser = req.body
        let contAtualizacao = 0
        bd.users = bd.users.map((user)=>{
            if(user.email === emailRecebido){
                contAtualizacao++
                return updateUser
            }
            return user
        })
        if(contAtualizacao > 0){
            res.json({
                "message": `${contAtualizacao} usuário(s) de email ${emailRecebido} foi/foram atualizado(s)`,
                "error": false
            })
        }else{
            res.json({
                "message": `Não existem usuário(s) com email ${emailRecebido}`,
                "error": true
            })
        }
    })

}

module.exports = rotaUsers