const rotaIndex = (app) =>{
    app.get('/', (req, res) => {
        res.send(
            '<h1>Bem vindo a To Do List</h1>'
            )
        }
    )
    app.post("/",(req, res)=>{
        console.log(req.headers)
        console.log(req.body)
        res.send('ola POST')
      }
    )

}



module.exports = rotaIndex