const mongoose = require('mongoose')

const TurnosSchema = new mongoose.Schema({
    dueño: {
        type: String,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    veterinario: {
        type: String,
        required: true 
    },
    mascota: {
        type: String,
        required: true 
    },
    fecha: {
        type: String,
        default: false,
        required: true
    },
    hora: {
        type: String,
        required: true
    }
})

const TurnosModel = mongoose.model('turnos', TurnosSchema)
module.exports = TurnosModel