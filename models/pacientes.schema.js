const mongoose = require('mongoose')

const PacientesSchema = new mongoose.Schema({
    dueño: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true 
    },
    mascota: {
        type: String,
        required: true 
    },
    especie: {
        type: String,
        default: false,
        required: true
    },
    raza: {
        type: String,
        required: true
    }
})

const PacientesModel = mongoose.model('pacientes', PacientesSchema)
module.exports = PacientesModel