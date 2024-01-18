const express = require('express')
const morgan = require('morgan')

class Server{
    constructor(){
        this.app = express()
        this.middlewars()
        this.routes()
    }

    middlewars(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
    }



    routes(){
        /* middlewars - use - funciones que validan antes de la ruta
        o entre la ruta y el controlador */
        this.app.use('/api/products', require('../routes/products.routes'))
        this.app.use('/api/users',require('../routes/users.routes'))
        this.app.use('/api/we',require('../routes/we.routes'))
    }

    listen(){
        this.app.listen(3001, () => {
            console.log('servidor ejecutandose en el puerto', 3001)
        })
    }
}

module.exports = Server