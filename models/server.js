const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        //conectar Base de Datos
        this.conectarDb()

        //middlewares (funciones que agregan otra funcionalidad)
        this.middlewares()
        
        //rutas de la app
        this.routes()
    }

    async conectarDb(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())

        //Lectura y parseo del JSON
        this.app.use(express.json())

        //Directorio Público
        this.app.use(express.static('public'))
    }

    routes(){

        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto ', this.port);
        })
    }
}

module.exports = Server