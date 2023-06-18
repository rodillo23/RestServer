const express = require('express')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        //middlewares (funciones que agregan otra funcionalidad)
        this.middlewares()
        //rutas de la app
        
        this.routes()
    }

    middlewares(){
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.get('/api', (req, res) => {
            res.send('Hola Mundo');
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto ', this.port);
        })
    }
}

module.exports = Server