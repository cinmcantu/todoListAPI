const moment  = require('moment')

class Task{
    constructor(id, id_usuario, titulo, descricao, status){
        this.id = id
        this.id_usuario = id_usuario
        this.titulo = titulo
        this.descricao = descricao
        this.status = status
        this.data_criacao = moment(new Date.now()).format('YYY-MM-DD HH:mm:ss')
    }
}

module.exports = Task