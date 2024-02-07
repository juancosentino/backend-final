const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.middlewars()
        this.routes()
    }

    middlewars(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(cors('cors'))
    }

    routes(){
        /* middlewars - use - funciones que validan antes de la ruta
        o entre la ruta y el controlador */
        this.app.use('/api/products', require('../routes/products.routes'))
        this.app.use('/api/users',require('../routes/users.routes'))
        this.app.use('/api/we',require('../routes/we.routes'))
        this.app.use('/api/prof',require('../routes/prof.routes'))
        this.app.use('/api/pacientes',require('../routes/pacientes.routes'))
        this.app.use('/api/turnos',require('../routes/turnos.routes'))
    }

    listen(){
        this.app.listen(3001, () => {
            console.log('servidor ejecutandose en el puerto', 3001)
        })
    }
}

module.exports = Server